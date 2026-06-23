export interface PartnerLogo {
  id: string;
  name: string;
  src: string;
}

export interface PartnerLogosProps {
  partners: PartnerLogo[];
  className?: string;
}
