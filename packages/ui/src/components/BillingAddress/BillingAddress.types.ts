export interface BillingAddressProps {
  country?: string; address?: string; city?: string; state?: string; zip?: string; onChange: (field: string, value: string) => void; className?: string;
}
