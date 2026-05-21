export default function ZoneMarker({ zone, status, onClick }) {
  // status: 'locked' | 'available' | 'completed'
  const isLocked = status === 'locked';

  return (
    <button
      className={`zone-marker zone-marker--${status}`}
      style={{ left: zone.position.left, top: zone.position.top }}
      onClick={() => !isLocked && onClick(zone.id)}
      aria-label={`Zone ${zone.id}: ${zone.name} — ${status}`}
      disabled={isLocked}
    >
      <span className="marker-number">
        {status === 'completed' ? '✓' : zone.id}
      </span>
      {status !== 'locked' && (
        <span className="marker-label">{zone.name}</span>
      )}
    </button>
  );
}
