import { useEffect, useRef } from 'react';
import PlantPhoto from './PlantPhoto';

function TaskText({ text }) {
  return (
    <p className="task-text" style={{ whiteSpace: 'pre-line' }}>
      {text}
    </p>
  );
}

export default function ZonePanel({ zone, isCompleted, onComplete, onClose }) {
  const panelRef = useRef(null);

  // Trap focus inside the panel while open
  useEffect(() => {
    panelRef.current?.focus();
  }, [zone.id]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="panel-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="panel" ref={panelRef} tabIndex={-1}>
        {/* drag handle */}
        <div className="panel-handle" />

        <button className="panel-close-btn" onClick={onClose} aria-label="Close panel">
          ✕
        </button>

        {/* Header */}
        <div className="panel-header">
          <div className="zone-badge">Zone {zone.id} of 11</div>
          <h2 className="zone-name">{zone.name}</h2>
          <p className="zone-subtitle">"{zone.subtitle}"</p>
        </div>

        <div className="panel-scroll">
          {/* Plants */}
          <section className="panel-section">
            <h3 className="section-title">🌿 Plants Here</h3>
            <ul className="plant-list">
              {zone.plants.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="plant-photos">
              {zone.plants.map((p) => (
                <PlantPhoto key={p} name={p} />
              ))}
            </div>
          </section>

          {/* Task */}
          <section className="panel-section">
            <h3 className="section-title">📋 Your Task</h3>
            <TaskText text={zone.task} />
          </section>

          {/* Pass requirement */}
          <section className="panel-section">
            <h3 className="section-title">✅ To Pass This Zone</h3>
            <p className="pass-text">{zone.passRequirement}</p>
          </section>

          {/* Clue */}
          <section className={`panel-section clue-section ${isCompleted ? 'clue-revealed' : 'clue-hidden'}`}>
            <h3 className="section-title">🗺 Clue to Next Zone</h3>
            {isCompleted ? (
              <p className="clue-text">{zone.clue}</p>
            ) : (
              <p className="clue-locked-text">Mark this zone complete to reveal the clue.</p>
            )}
          </section>
        </div>

        {/* Footer action */}
        <div className="panel-footer">
          {zone.isFinal && isCompleted ? (
            <button className="btn-celebrate" onClick={onClose}>
              🎉 Celebrate!
            </button>
          ) : isCompleted ? (
            <button className="btn-continue" onClick={onClose}>
              Continue →
            </button>
          ) : (
            <button className="btn-complete" onClick={onComplete}>
              ✓ Mark Zone Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
