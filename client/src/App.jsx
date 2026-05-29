import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TreePine, Map, BookOpen } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import FarmMap from './components/FarmMap';
import ZonePanel from './components/ZonePanel';
import HeroScreen from './components/HeroScreen';
import TourScript from './components/TourScript';
import { ZONES } from './data/zones';
import './App.css';

const STORAGE_KEY = 'barren-creek-completed-zones';

function App() {
  const [showHero, setShowHero] = useState(true);

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeZoneId, setActiveZoneId] = useState(null);
  const [activeTab, setActiveTab] = useState('map');

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
    <>
      <AnimatePresence>
        {showHero && (
          <HeroScreen key="hero" onEnter={() => setShowHero(false)} />
        )}
      </AnimatePresence>

      <div className="app">
      <header className="app-header">
        <div className="header-icon">
          <TreePine size={20} strokeWidth={1.5} />
        </div>
        <h1 className="app-title">The Farm Trials</h1>
        <p className="app-subtitle">Barren Creek Farm · 11-Zone Scavenger Hunt</p>
      </header>

      {/* Tab Bar */}
      <div className="tab-bar">
        <button
          className={`tab-btn${activeTab === 'map' ? ' tab-btn--active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={14} strokeWidth={2} /> The Hunt
        </button>
        <button
          className={`tab-btn${activeTab === 'tour' ? ' tab-btn--active' : ''}`}
          onClick={() => setActiveTab('tour')}
        >
          <BookOpen size={14} strokeWidth={2} /> Tour Guide
        </button>
      </div>

      {activeTab === 'map' ? (
        <>
          <ProgressBar completed={completed.length} total={ZONES.length} onReset={handleReset} />

          <FarmMap
            zones={ZONES}
            completed={completed}
            nextZoneId={nextZoneId}
            onMarkerClick={handleMarkerClick}
          />

          <AnimatePresence>
            {allDone && (
              <motion.div
                className="completion-banner"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                🎉 You completed all 11 zones! The Farm Trials are done.
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {activeZone && (
              <ZonePanel
                zone={activeZone}
                isCompleted={completed.includes(activeZone.id)}
                onComplete={() => handleComplete(activeZone.id)}
                onClose={handleClose}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <TourScript />
      )}
      </div>
    </>
  );
}

export default App;

