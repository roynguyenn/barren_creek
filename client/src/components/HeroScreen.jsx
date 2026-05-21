import { motion } from 'framer-motion';

export default function HeroScreen({ onEnter }) {
  return (
    <motion.div
      className="hero-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <video
        className="hero-video"
        src="/barren_creek_hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">The Farm Trials</h1>
        <p className="hero-subtitle">Barren Creek Farm · 11-Zone Scavenger Hunt</p>
        <motion.button
          className="hero-btn"
          onClick={onEnter}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        >
          Begin the Hunt →
        </motion.button>
      </div>
    </motion.div>
  );
}
