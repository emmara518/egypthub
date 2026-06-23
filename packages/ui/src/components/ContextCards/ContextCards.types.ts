export interface ContextCard {
  id: string;
  title: string;
  summary: string;
  icon?: string;
  type?: 'info' | 'tip' | 'alert' | 'success';
}

export interface ContextCardsProps {
  cards: ContextCard[];
  onCardClick?: (cardId: string) => void;
  className?: string;
}
