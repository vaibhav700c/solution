'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  change?: number;
  isNegative?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function StatCard({
  title,
  value,
  unit = '',
  change,
  isNegative = false,
  icon,
  variant = 'default',
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const increment = value / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  const variantStyles = {
    default: 'from-cyan-500/20 to-amber-500/20 border-cyan-500/30',
    success: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30',
    warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    danger: 'from-red-500/20 to-pink-500/20 border-red-500/30',
  };

  const trendColor = isNegative
    ? change && change > 0
      ? 'text-red-400'
      : 'text-emerald-400'
    : change && change > 0
      ? 'text-emerald-400'
      : 'text-red-400';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`glass-effect-strong border p-6 rounded-lg bg-gradient-to-br ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <motion.p
              key={value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-foreground"
            >
              {displayValue.toLocaleString()}
            </motion.p>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>

          {change !== undefined && (
            <motion.div className={`mt-3 flex items-center gap-1 ${trendColor} text-sm font-medium`}>
              {isNegative ? change < 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" /> : change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(change)}% from last month</span>
            </motion.div>
          )}
        </div>

        {icon && (
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-lg bg-gradient-to-br from-cyan-400/20 to-amber-400/20"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
