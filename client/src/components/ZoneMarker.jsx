import { motion } from 'framer-motion';
import { Check, Lock, Leaf } from 'lucide-react';

export default function ZoneMarker({ zone, status, onClick, index }) {
  const isLocked = status === 'locked';

  return (
    <motion.button
      className={`zone-marker zone-marker--${status}`}
      style={{ left: zone.position.left, top: zone.position.top }}
      onClick={() => !isLocked && onClick(zone.id)}
      aria-label={`Zone ${zone.id}: ${zone.name} — ${status}`}
      disabled={isLocked}
      initial={{ scale: 0, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.18 + index * 0.055 }}
      whileTap={!isLocked ? { scale: 0.82 } : {}}
    >
      <div className="marker-pin">
        <div className="marker-pin-inner">
          {status === 'completed' ? (
            <Check size={13} strokeWidth={3} />
          ) : status === 'locked' ? (
            <Lock size={10} strokeWidth={2.5} />
          ) : (
            <Leaf size={13} strokeWidth={2} />
          )}
        </div>
        <span className="marker-num">{zone.id}</span>
      </div>
      {status !== 'locked' && (
        <span className="marker-label">{zone.name}</span>
      )}
    </motion.button>
  );
}
