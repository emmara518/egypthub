# EgyptHub Phase 16 — Staging Deployment Guide

## Prerequisites

- Docker & Docker Compose v2+
- Domain: `staging.egypthub.com` (DNS pointing to VPS)
- VPS with Ubuntu 22.04+, 2GB RAM, 2 vCPUs

## Step 1 — Server Setup

```bash
ssh root@staging.egypthub.com

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt-get update
sudo apt-get install -y docker-compose-plugin
```

## Step 2 — Clone & Configure

```bash
git clone https://github.com/your-org/egypthub.git /opt/egypthub
cd /opt/egypthub/apps/web

# Create production env
cat > .env.production << 'EOF'
DATABASE_URL="postgresql://egypthub:STRONG_PASSWORD@postgres:5432/egypthub?schema=public"
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PROD_PRIVATE_KEY\n-----END PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nYOUR_PROD_PUBLIC_KEY\n-----END PUBLIC KEY-----"
JWT_ISSUER="egypthub"
JWT_AUDIENCE="egypthub-api"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://staging.egypthub.com
NEXT_PUBLIC_APP_URL=https://staging.egypthub.com
EOF
```

## Step 3 — Generate JWT Keys

```bash
# Generate RS256 key pair
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# Copy into .env.production (replace newlines with \n)
echo "JWT_PRIVATE_KEY=\"$(awk '{printf "%s\\n", $0}' private.pem)\""
echo "JWT_PUBLIC_KEY=\"$(awk '{printf "%s\\n", $0}' public.pem)\""
```

## Step 4 — Deploy with Docker Compose

```bash
cp .env.production .env
docker compose up -d --build

# Verify
docker compose ps
docker compose logs web
```

## Step 5 — HTTPS with Caddy (Reverse Proxy)

```bash
# Install Caddy
sudo apt-get install -y debian-keyring debian-archive-keyring
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update
sudo apt-get install caddy

# Configure
cat > /etc/caddy/Caddyfile << 'EOF'
staging.egypthub.com {
    reverse_proxy localhost:3000
}
EOF

sudo systemctl reload caddy
```

## Step 6 — Verify

- Visit `https://staging.egypthub.com`
- Test register: `POST /api/auth/register`
- Test login: `POST /api/auth/login`
- Test authenticated: `GET /api/auth/me`

## Environment Variables Reference

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_PRIVATE_KEY` | RS256 private key for signing | Required |
| `JWT_PUBLIC_KEY` | RS256 public key for verification | Required |
| `JWT_ISSUER` | JWT issuer claim | `egypthub` |
| `JWT_AUDIENCE` | JWT audience claim | `egypthub-api` |
| `JWT_EXPIRES_IN` | Access token TTL | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL | `7d` |
| `NEXT_PUBLIC_API_URL` | Public API base URL | Required |

## Rollback

```bash
docker compose down
git checkout <previous-tag>
docker compose up -d --build
```
