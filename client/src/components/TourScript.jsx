import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { MapPin, MessageSquare, CheckSquare, Square } from 'lucide-react';
import { AGREEMENTS, SILENCE_PROMPT, TOUR_STOPS } from '../data/tourStops';

export default function TourScript() {
  const [agreed, setAgreed] = useState([]);
  const pageRef = useRef(null);

  // Track scroll progress within the tour page container
  const { scrollYProgress } = useScroll({ container: pageRef });

  // Background shifts from cool forest green → warm earthy gold as you scroll
  const hue   = useTransform(scrollYProgress, [0, 1], [115, 38]);
  const sat   = useTransform(scrollYProgress, [0, 1], [18,  22]);
  const light = useTransform(scrollYProgress, [0, 1], [96,  93]);
  const bgColor = useMotionTemplate`hsl(${hue}, ${sat}%, ${light}%)`;

  function toggleAgreement(i) {
    setAgreed(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  }

  return (
    <motion.div
      ref={pageRef}
      className="tour-page"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <motion.div
        className="tour-hero"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="tour-hero-eyebrow">Barren Creek Farm</span>
        <h2 className="tour-hero-title">Farm Tour Guide</h2>
        <p className="tour-hero-sub">
          A guided walk through the land, its stories, and its harvests.
        </p>
        <motion.div
          className="tour-scroll-hint"
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
        >
          ↓ Scroll to begin
        </motion.div>
      </motion.div>

      {/* ── Community Agreements ─────────────────────────── */}
      <FadeSection className="tour-agreements-section">
        <p className="tour-section-eyebrow">🤝 Before we begin</p>
        <h3 className="tour-section-heading">Community Agreements</h3>
        <ul className="tour-agreements-ul">
          {AGREEMENTS.map((a, i) => (
            <FadeItem key={i} delay={0.06 + i * 0.08}>
              <li
                className={`tour-agree-li${agreed.includes(i) ? ' tour-agree-li--on' : ''}`}
                onClick={() => toggleAgreement(i)}
              >
                <span className="tour-agree-check">
                  {agreed.includes(i)
                    ? <CheckSquare size={16} strokeWidth={2} />
                    : <Square size={16} strokeWidth={1.5} />}
                </span>
                <span>{a}</span>
              </li>
            </FadeItem>
          ))}
        </ul>
        <motion.blockquote
          className="tour-quote"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          "{SILENCE_PROMPT}"
        </motion.blockquote>
      </FadeSection>

      <div className="tour-strand" />

      {/* ── Tour Stops ───────────────────────────────────── */}
      {TOUR_STOPS.map(stop => (
        <StopSection key={stop.id} stop={stop} />
      ))}

      {/* ── End ──────────────────────────────────────────── */}
      <motion.div
        className="tour-end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
      >
        <span className="tour-end-leaf">🌿</span>
        <p>End of Tour — Thank you for walking with us.</p>
      </motion.div>
    </motion.div>
  );
}

/* ── Section wrapper: fades in from below when scrolled to ── */
function FadeSection({ children, className }) {
  return (
    <motion.section
      className={`tour-fade-section ${className ?? ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

/* ── Individual stagger child ────────────────────────────── */
function FadeItem({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── One stop ────────────────────────────────────────────── */
function StopSection({ stop }) {
  const sectionRef = useRef(null);

  // Track this section's scroll position for parallax on the deco number
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const decoY = useTransform(scrollYProgress, [0, 1], ['-28px', '28px']);

  return (
    <section ref={sectionRef} className="tour-stop-outer">
      {/* Big decorative stop number — moves at a different speed (parallax) */}
      <motion.div className="stop-deco-num" style={{ y: decoY }} aria-hidden>
        {String(stop.id).padStart(2, '0')}
      </motion.div>

      {/* Card fades in from below */}
      <motion.div
        className="tour-stop-card"
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="stop-card-head">
          <span className="stop-card-icon">{stop.icon}</span>
          <div className="stop-card-meta">
            <span className="stop-card-badge">Stop {stop.id}</span>
            <h3 className="stop-card-title">{stop.title}</h3>
            <span className="stop-card-loc">
              <MapPin size={10} strokeWidth={2} /> {stop.location}
            </span>
          </div>
        </div>

        {/* Body paragraphs — each fades in with slight stagger */}
        <div className="stop-card-body">
          {stop.body.map((para, i) => (
            <motion.p
              key={i}
              className="stop-card-para"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: 0.08 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Guide prompts callout */}
        {stop.prompts.length > 0 && (
          <motion.div
            className="stop-card-prompts"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="stop-prompts-hd">
              <MessageSquare size={12} strokeWidth={2} /> Guide prompts
            </span>
            <ul className="stop-prompts-ul">
              {stop.prompts.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
