import { useState, useEffect } from 'react';

export default function PlantPhoto({ name }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setImgUrl(null);
    setLoaded(false);
    setMissing(false);

    // strip parentheticals and extra notes for cleaner search
    const query = name.split('(')[0].split('+')[0].trim().replace(/\s+/g, '_');

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.thumbnail?.source) {
          setImgUrl(data.thumbnail.source);
        } else {
          setMissing(true);
        }
      })
      .catch(() => setMissing(true));
  }, [name]);

  if (missing) return null;

  return (
    <figure className="plant-photo">
      {!loaded && <div className="plant-photo-skeleton" />}
      {imgUrl && (
        <img
          src={imgUrl}
          alt={name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      )}
      <figcaption>{name}</figcaption>
    </figure>
  );
}
