import { useState, useEffect } from 'react';
import { Flower2 } from 'lucide-react';

export default function PlantPhoto({ name }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImgUrl(null);
    setLoaded(false);

    const query = name.split('(')[0].split('+')[0].trim();

    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrlimit: '1',
      prop: 'pageimages',
      piprop: 'thumbnail',
      pithumbsize: '200',
      format: 'json',
      origin: '*',
    });

    fetch(`https://en.wikipedia.org/w/api.php?${params}`)
      .then((r) => r.json())
      .then((data) => {
        const pages = data?.query?.pages;
        if (pages) {
          const page = Object.values(pages)[0];
          if (page?.thumbnail?.source) {
            setImgUrl(page.thumbnail.source);
          }
        }
      })
      .catch(() => {});
  }, [name]);

  return (
    <figure className="plant-photo">
      {loaded && imgUrl ? (
        <img src={imgUrl} alt={name} loading="lazy" />
      ) : (
        <div className="plant-photo-icon">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              style={{ display: 'none' }}
            />
          ) : null}
          <Flower2 size={30} strokeWidth={1.25} color="var(--grey-green)" />
        </div>
      )}
      <figcaption>{name}</figcaption>
    </figure>
  );
}
