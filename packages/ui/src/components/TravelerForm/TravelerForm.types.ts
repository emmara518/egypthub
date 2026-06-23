export interface TravelerInfo { firstName: string; lastName: string; email?: string; phone?: string; passport?: string; }

export interface TravelerFormProps {
  index: number; type: string; value?: TravelerInfo; onChange: (info: TravelerInfo) => void; className?: string;
}
