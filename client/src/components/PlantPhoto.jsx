import { useState, useEffect } from 'react';
import { Flower2 } from 'lucide-react';

const REAL_PHOTOS = {
  'thornless blackberry':     '/illustrations/real_examples/thornless_blackberry.jpg',
  'thornless boysenberry':    '/illustrations/real_examples/boysenberry.jpg',
  'mar de bois strawberry':   '/illustrations/real_examples/de_mais_strawberry.jpg',
  'golden goji berry':        '/illustrations/real_examples/golden_goji_berry.jpg',
  'comfrey':                  '/illustrations/real_examples/comfrey.jpg',
  'gotu kola':                '/illustrations/real_examples/gotu_kola.png',
  'australian mint bush':     '/illustrations/real_examples/australian_mint_bush.jpg',
  'mixed hedgerow plantings': '/illustrations/real_examples/mixed_hedge.jpg',
  'baja wolfberry':           '/illustrations/real_examples/baja_wolf_berry.jpg',
  'bouillion bush':           '/illustrations/real_examples/boullion_bush.jpg',
  'chaya tree spinach':       '/illustrations/real_examples/chaya_spinach_tree.jpg',
  'oranges':                  '/illustrations/real_examples/oranges.jpg',
  'lemons':                   '/illustrations/real_examples/lemon_tree.jpg',
  'citrus blossoms':          '/illustrations/real_examples/citrus_blossom.jpg',
  'perennial purple kale':    '/illustrations/real_examples/perennial.jpg',
  'tree collards':            '/illustrations/real_examples/tree_collards.jpg',
  'sweet potato':             '/illustrations/real_examples/sweet_potato.jpg',
  'african spinach':          '/illustrations/real_examples/african_spinach.jpg',
  'caper bush':               '/illustrations/real_examples/caper_bush.jpg',
  'dittany of crete':         '/illustrations/real_examples/ditanny_of_creek.jpg',
  'hummingbird sage':         '/illustrations/real_examples/hummind_bird_sage.jpg',
  'emerald cascade sage':     '/illustrations/real_examples/emerald_cascade_sage.jpg',
  'san miguel savory':        '/illustrations/real_examples/san_miguel_savory.jpg',
  "za'atar":                  "/illustrations/real_examples/za'atar.jpg",
  'moroccan mint':            '/illustrations/real_examples/moroccan_mint.jpg',
  'french thyme':             '/illustrations/real_examples/french_thyme.jpg',
  'greek oregano':            '/illustrations/real_examples/greek_oregano.jpg',
  'various cactus species':   '/illustrations/real_examples/cactus.jpg',
  'the chickens themselves!': '/illustrations/real_examples/chicken.jpg',
};

export default function PlantPhoto({ name }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const realPhoto = REAL_PHOTOS[name.toLowerCase()];

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
    <figure
      className={`plant-photo${realPhoto ? ' plant-photo--flippable' : ''}`}
      onClick={() => realPhoto && setFlipped(f => !f)}
    >
      <div className={`plant-photo-flipper${flipped ? ' flipped' : ''}`}>
        <div className="plant-photo-front">
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
        </div>
        {realPhoto && (
          <div className="plant-photo-back">
            <img src={realPhoto} alt={name} loading="lazy" />
            <figcaption>{name}</figcaption>
          </div>
        )}
      </div>
    </figure>
  );
}
