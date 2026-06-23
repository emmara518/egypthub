export interface ShareBookingProps {
  url: string; message?: string; platforms?: ('whatsapp' | 'email' | 'copy')[]; onShare?: (platform: string) => void; className?: string;
}
