export interface CheckoutField { name: string; label: string; type?: 'text' | 'email' | 'tel' | 'select'; placeholder?: string; options?: { value: string; label: string }[]; required?: boolean; }

export interface CheckoutFormProps {
  fields: CheckoutField[]; onSubmit: (values: Record<string, string>) => void; submitLabel?: string; isLoading?: boolean; className?: string;
}
