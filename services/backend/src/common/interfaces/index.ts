export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
  mfaEnabled: boolean;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HealthCheckResult {
  status: 'ok' | 'error' | 'shutting_down';
  info: Record<string, { status: string; latencyMs?: number }>;
  details: Record<string, unknown>;
}
