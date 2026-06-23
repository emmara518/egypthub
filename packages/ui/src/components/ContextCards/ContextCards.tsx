'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ContextCardsProps, ContextCard } from './ContextCards.types';

const typeStyles: Record<string, { border: string; bg: string; icon: string }> = {
  info: { border: 'border-info/30', bg: 'bg-info/5', icon: 'i' },
  tip: { border: 'border-gold-border', bg: 'bg-gold-subtle/5', icon: '!' },
  alert: { border: 'border-warning/30', bg: 'bg-warning/5', icon: '⚠' },
  success: { border: 'border-success/30', bg: 'bg-success/5', icon: '✓' },
};

function Card({ card, onClick }: { card: ContextCard; onClick?: () => void }) {
  const styles = typeStyles[card.type || 'info'];

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        'w-full text-start p-4 rounded-xl border transition-all duration-200',
        styles.border, styles.bg,
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold/30'
      )}
    >
      <div className="flex items-start gap-3">
        {card.icon ? (
          <span className="flex-shrink-0 text-lg">{card.icon}</span>
        ) : (
          <div className={cn(
            'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-caption font-bold',
            card.type === 'tip' ? 'bg-gold text-text-inverse' : 'bg-border text-text-muted'
          )}>
            {styles.icon}
          </div>
        )}
        <div className="min-w-0">
          <h4 className="text-body-sm font-semibold text-text-primary">{card.title}</h4>
          <p className="text-caption text-text-secondary mt-1">{card.summary}</p>
        </div>
      </div>
    </motion.button>
  );
}

export function ContextCards({ cards, onCardClick, className }: ContextCardsProps) {
  return (
    <div className={cn('space-y-2', className)} role="list" aria-label="بطاقات السياق">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick ? () => onCardClick(card.id) : undefined}
        />
      ))}
    </div>
  );
}
