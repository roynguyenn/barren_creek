import { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import FarmMap from './components/FarmMap';
import ZonePanel from './components/ZonePanel';
import { ZONES } from './data/zones';
import './App.css';

const STORAGE_KEY = 'barren-creek-completed-zones';

function App() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeZoneId, setActiveZoneId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const nextZoneId = completed.length + 1;
  const activeZone = ZONES.find((z) => z.id === activeZoneId) ?? null;
  const allDone = completed.length === ZONES.length;

  function handleMarkerClick(zoneId) {
    if (zoneId > nextZoneId) return;
    setActiveZoneId(zoneId);
  }

  function handleComplete(zoneId) {
    if (!completed.includes(zoneId)) {
      setCompleted((prev) => [...prev, zoneId]);
    }
  }

  function handleClose() {
    setActiveZoneId(null);
  }

  function handleReset() {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      setCompleted([]);
      setActiveZoneId(null);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">The Farm Trials</h1>
        <p className="app-subtitle">Barren Creek Farm · 11-Zone Scavenger Hunt</p>
      </header>

      <ProgressBar completed={completed.length} total={ZONES.length} onReset={handleReset} />

      <FarmMap
        zones={ZONES}
        completed={completed}
        nextZoneId={nextZoneId}
        onMarkerClick={handleMarkerClick}
      />

      {allDone && (
        <div className="completion-banner">
          🎉 You completed all 11 zones! The Farm Trials are done.
        </div>
      )}

      {activeZone && (
        <ZonePanel
          zone={activeZone}
          isCompleted={completed.includes(activeZone.id)}
          onComplete={() => handleComplete(activeZone.id)}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;

