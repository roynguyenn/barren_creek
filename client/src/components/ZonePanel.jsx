import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Compass, CheckCircle, MapPin, Lock, Sparkles } from 'lucide-react';
import PlantPhoto from './PlantPhoto';

function TaskText({ text }) {
  return <p className="task-text">{text}</p>;
}

export default function ZonePanel({ zone, isCompleted, onComplete, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, [zone.id]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <motion.div
      className="panel-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="panel"
        ref={panelRef}
        tabIndex={-1}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 36 }}
      >
        {/* Floating handle + close — absolute so they never scroll away */}
        <div className="panel-topbar">
          <div className="panel-handle" />
          <button className="panel-close-btn" onClick={onClose} aria-label="Close panel">✕</button>
        </div>

        {/* Scrollable area — illustration first, then title, then content */}
        <div className="panel-scroll">

          {/* Illustration hero — full width, warm bg, breathing animation */}
          {zone.illustration && (
            <motion.div
              className="illus-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            >
              <motion.img
                className="illus-hero-img"
                src={zone.illustration}
                alt=""
                aria-hidden="true"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
              />
              <div className="illus-hero-fade" />
            </motion.div>
          )}

          {/* Zone title block */}
          <div className="panel-title-block">
            <div className="zone-badge">
              <MapPin size={10} strokeWidth={2.5} />
              Zone {zone.id} of 11
            </div>
            <h2 className="zone-name">{zone.name}</h2>
            <p className="zone-subtitle">"{zone.subtitle}"</p>
          </div>

          {/* Organic wave separator */}
          <svg className="panel-wave" viewBox="0 0 390 36" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,0 L0,28 Q32,10 65,24 Q98,38 130,22 Q162,6 195,22 Q228,38 260,22 Q292,6 325,22 Q358,38 390,20 L390,0 Z" fill="#2f6b3f" />
          </svg>

          {/* Plants */}
          <section className="panel-section">
            <h3 className="section-title">
              <Leaf size={13} strokeWidth={2} />
              Plants Here
            </h3>
            <ul className="plant-list">
              {zone.plants.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="plant-photos">
              {zone.plants.map((p) => <PlantPhoto key={p} name={p} />)}
            </div>
          </section>

          {/* Task */}
          <section className="panel-section">
            <h3 className="section-title">
              <Compass size={13} strokeWidth={2} />
              Your Task
            </h3>
            <TaskText text={zone.task} />
          </section>

          {/* Pass requirement */}
          <section className="panel-section">
            <h3 className="section-title">
              <CheckCircle size={13} strokeWidth={2} />
              To Pass This Zone
            </h3>
            <p className="pass-text">{zone.passRequirement}</p>
          </section>

          {/* Clue */}
          <section className={`panel-section clue-section ${isCompleted ? 'clue-revealed' : 'clue-hidden'}`}>
            <h3 className="section-title">
              <MapPin size={13} strokeWidth={2} />
              Clue to Next Zone
            </h3>
            {isCompleted ? (
              <p className="clue-text">{zone.clue}</p>
            ) : (
              <p className="clue-locked-text">
                <Lock size={13} strokeWidth={2} />
                Mark this zone complete to reveal the clue.
              </p>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="panel-footer">
          {zone.isFinal && isCompleted ? (
            <motion.button className="btn-celebrate" onClick={onClose} whileTap={{ scale: 0.95 }}>
              <Sparkles size={16} strokeWidth={2} /> Celebrate!
            </motion.button>
          ) : isCompleted ? (
            <motion.button className="btn-continue" onClick={onClose} whileTap={{ scale: 0.95 }}>
              Continue →
            </motion.button>
          ) : (
            <motion.button className="btn-complete" onClick={onComplete} whileTap={{ scale: 0.95 }}>
              <Leaf size={16} strokeWidth={2.5} /> Mark Zone Complete
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
