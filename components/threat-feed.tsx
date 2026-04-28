'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Eye, MoreVertical } from 'lucide-react';
import { ThreatEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ThreatFeedProps {
  threats: ThreatEvent[];
}

const severityColors = {
  critical: 'bg-red-500/20 border-red-500/50 text-red-400',
  high: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
  medium: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
  low: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
};

const severityIcons = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: AlertCircle,
  low: AlertCircle,
};

export function ThreatFeed({ threats }: ThreatFeedProps) {
  const [displayThreats, setDisplayThreats] = useState<ThreatEvent[]>([]);

  useEffect(() => {
    setDisplayThreats(threats);
  }, [threats]);

  const handleResolve = (threatId: string) => {
    setDisplayThreats((prev) =>
      prev.map((t) =>
        t.id === threatId ? { ...t, status: 'resolved' as const } : t
      )
    );
    toast.success('Threat marked as resolved');
  };

  const handleAction = (threatId: string, action: string) => {
    toast.success(`${action} initiated for threat ${threatId}`);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {displayThreats
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .map((threat, idx) => {
            const SeverityIcon = severityIcons[threat.severity];
            const colors = severityColors[threat.severity];

            return (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-effect border rounded-lg p-4 ${colors}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <SeverityIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">
                          {threat.type.replace(/_/g, ' ').toUpperCase()}
                        </p>
                        <span className="text-xs px-2 py-1 rounded-full bg-current/20">
                          {threat.status}
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-foreground/70">
                        {threat.assetName}
                      </p>
                      {threat.evidence && (
                        <p className="text-xs mt-1 text-foreground/60">{threat.evidence}</p>
                      )}
                      <p className="text-xs mt-2 text-foreground/50">
                        {threat.location} •{' '}
                        {threat.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    {threat.status === 'active' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => handleAction(threat.id, 'Investigate')}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-emerald-500/30 hover:bg-emerald-500/40 border-emerald-500/50"
                          onClick={() => handleResolve(threat.id)}
                        >
                          Resolve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
