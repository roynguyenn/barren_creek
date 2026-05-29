import { useState, useRef, useEffect, useCallback } from 'react';
import ZoneMarker from './ZoneMarker';

export default function FarmMap({ zones, completed, nextZoneId, onMarkerClick }) {
  const [imgError, setImgError] = useState(false);
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const imgRef = useRef(null);

  const fitMap = useCallback(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    const img = imgRef.current;
    if (!wrapper || !inner || !img || !img.naturalWidth) return;
    const wrapW = wrapper.clientWidth;
    const wrapH = wrapper.clientHeight;
    const ratio = img.naturalWidth / img.naturalHeight;
    const constrainByHeight = wrapW / wrapH > ratio;
    const w = constrainByHeight ? wrapH * ratio : wrapW;
    const h = constrainByHeight ? wrapH : wrapW / ratio;
    inner.style.width = `${w}px`;
    inner.style.height = `${h}px`;
  }, []);

  useEffect(() => {
    window.addEventListener('resize', fitMap);
    return () => window.removeEventListener('resize', fitMap);
  }, [fitMap]);

  function getStatus(zone) {
    if (completed.includes(zone.id)) return 'completed';
    if (zone.id === nextZoneId) return 'available';
    return 'locked';
  }

  return (
    <div className="map-wrapper" ref={wrapperRef}>
      <div className="map-inner" ref={innerRef}>
        {imgError ? (
          <div className="map-placeholder">
            <p>Place the aerial farm photo at</p>
            <code>client/public/farm-map.png</code>
            <p>to see the map here.</p>
          </div>
        ) : (
          <img
            ref={imgRef}
            src="/illustrations/stupidcars.png"
            alt="Barren Creek Farm aerial map"
            className="map-image"
            onLoad={fitMap}
            onError={() => setImgError(true)}
            draggable={false}
          />
        )}
        {zones.map((zone, idx) => (
          <ZoneMarker
            key={zone.id}
            zone={zone}
            status={getStatus(zone)}
            onClick={onMarkerClick}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
