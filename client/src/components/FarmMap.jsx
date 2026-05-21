import { useState } from 'react';
import ZoneMarker from './ZoneMarker';

export default function FarmMap({ zones, completed, nextZoneId, onMarkerClick }) {
  const [imgError, setImgError] = useState(false);

  function getStatus(zone) {
    if (completed.includes(zone.id)) return 'completed';
    if (zone.id === nextZoneId) return 'available';
    return 'locked';
  }

  return (
    <div className="map-wrapper">
      <div className="map-inner">
        {imgError ? (
          <div className="map-placeholder">
            <p>📍 Place the aerial farm photo at</p>
            <code>client/public/farm-map.jpg</code>
            <p>to see the map here.</p>
          </div>
        ) : (
          <img
            src="/farm-map.png"
            alt="Barren Creek Farm aerial map"
            className="map-image"
            onError={() => setImgError(true)}
            draggable={false}
          />
        )}
        {zones.map((zone) => (
          <ZoneMarker
            key={zone.id}
            zone={zone}
            status={getStatus(zone)}
            onClick={onMarkerClick}
          />
        ))}
      </div>
    </div>
  );
}
