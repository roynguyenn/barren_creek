import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, MessageSquare, ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { AGREEMENTS, SILENCE_PROMPT, TOUR_STOPS } from '../data/tourStops';

export default function TourScript() {
  const [activeStop, setActiveStop] = useState(1);
  const [agreed, setAgreed] = useState([]);
  const [agreementsOpen, setAgreementsOpen] = useState(true);
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeStop]);

  function toggleAgreement(i) {
    setAgreed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  function goTo(n) {
    setActiveStop(Math.max(1, Math.min(TOUR_STOPS.length, n)));
  }

  return (
    <div className="tour-wrapper">
      <div className="tour-scroll">

        {/* Community Agreements */}
        <div className="tour-agreements">
          <button
            className="agreements-toggle"
            onClick={() => setAgreementsOpen(o => !o)}
          >
            <span className="agreements-toggle-title">🤝 Community Agreements</span>
            <span className="agreements-badge">{agreed.length}/{AGREEMENTS.length} agreed</span>
            {agreementsOpen ? <ChevronUp size={14} strokeWidth={2} /> : <ChevronDown size={14} strokeWidth={2} />}
          </button>

          <AnimatePresence initial={false}>
            {agreementsOpen && (
              <motion.div
                key="agreements"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <ul className="agreements-list">
                  {AGREEMENTS.map((a, i) => (
                    <li
                      key={i}
                      className={`agreement-item${agreed.includes(i) ? ' agreement-item--checked' : ''}`}
                      onClick={() => toggleAgreement(i)}
                    >
                      {agreed.includes(i)
                        ? <CheckSquare size={15} strokeWidth={2} className="agree-icon agree-icon--checked" />
                        : <Square size={15} strokeWidth={1.5} className="agree-icon" />}
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                <p className="agreements-prompt">"{SILENCE_PROMPT}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tour Stops */}
        <div className="tour-stops-list">
          {TOUR_STOPS.map(stop => (
            <StopCard
              key={stop.id}
              stop={stop}
              isActive={stop.id === activeStop}
              ref={stop.id === activeStop ? activeRef : null}
              onActivate={() => setActiveStop(stop.id)}
            />
          ))}
        </div>
      </div>

      {/* Sticky nav bar */}
      <div className="tour-nav">
        <button
          className="tour-nav-btn"
          onClick={() => goTo(activeStop - 1)}
          disabled={activeStop === 1}
        >
          <ArrowLeft size={15} strokeWidth={2.5} /> Prev
        </button>
        <span className="tour-nav-label">
          Stop {activeStop} <span className="tour-nav-of">of {TOUR_STOPS.length}</span>
        </span>
        <button
          className="tour-nav-btn"
          onClick={() => goTo(activeStop + 1)}
          disabled={activeStop === TOUR_STOPS.length}
        >
          Next <ArrowRight size={15} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

import { forwardRef } from 'react';

const StopCard = forwardRef(function StopCard({ stop, isActive, onActivate }, ref) {
  return (
    <motion.div
      ref={ref}
      className={`stop-card${isActive ? ' stop-card--active' : ''}`}
      layout="position"
      onClick={() => !isActive && onActivate()}
    >
      <div className="stop-card-header">
        <span className="stop-icon">{stop.icon}</span>
        <div className="stop-meta">
          <span className="stop-num">Stop {stop.id}</span>
          <span className="stop-title">{stop.title}</span>
          <span className="stop-location">
            <MapPin size={10} strokeWidth={2} /> {stop.location}
          </span>
        </div>
        <span className="stop-chevron">
          {isActive ? <ChevronUp size={15} strokeWidth={2} /> : <ChevronDown size={15} strokeWidth={2} />}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="stop-body">
              {stop.body.map((para, i) => (
                <p key={i} className="stop-para">{para}</p>
              ))}

              {stop.prompts.length > 0 && (
                <div className="stop-prompts">
                  <div className="stop-prompts-header">
                    <MessageSquare size={12} strokeWidth={2} />
                    Guide prompts
                  </div>
                  <ul className="stop-prompts-list">
                    {stop.prompts.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
