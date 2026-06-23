'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Avatar } from '../Avatar';
import type { AIWelcomeProps } from './AIWelcome.types';

export function AIWelcome({ userName, greeting = 'مرحباً', message = 'كيف يمكنني مساعدتك في التخطيط لرحلتك إلى مصر؟', avatar, className }: AIWelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col items-center text-center px-6 py-8', className)}
    >
      {avatar && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          <Avatar src={avatar} alt={userName || 'المساعد'} size="lg" />
        </motion.div>
      )}
      <h2 className="text-heading-md font-semibold text-text-primary">
        {greeting}{userName ? `، ${userName}` : ''} 👋
      </h2>
      <p className="text-body-md text-text-secondary mt-2 max-w-sm">{message}</p>
    </motion.div>
  );
}
