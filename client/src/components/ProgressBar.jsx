import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressBar({ completed, total, onReset }) {
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-header">
        <span className="progress-label">
          <span className="progress-label-inner">
            <Compass size={13} strokeWidth={2} color="var(--earth-green)" />
            {completed === total
              ? 'All zones complete!'
              : `Zone ${completed + 1} of ${total}`}
          </span>
        </span>
        <span className="progress-bar-right">
          <span className="progress-fraction">{completed}/{total}</span>
          {completed > 0 && (
            <button className="reset-btn" onClick={onReset}>reset</button>
          )}
        </span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
