import fs from 'fs';
import path from 'path';
import https from 'https';

const dirs = [
  'public/images',
  'public/images/hero',
  'public/images/who-we-serve',
  'public/images/products',
  'public/images/about'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Curated high quality Unsplash photos with direct reliable IDs
const images = [
  { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop', path: 'public/images/hero/hero-bg.webp' },
  { url: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop', path: 'public/images/about/factory.webp' },
  { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop', path: 'public/images/about/craft.webp' },
  
  // Categories
  { url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/school.webp' },
  { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/corporate.webp' },
  { url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/healthcare.webp' },
  { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/hospitality.webp' },
  { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/industrial.webp' },
  { url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/sports.webp' },
  { url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop', path: 'public/images/who-we-serve/security.webp' },

  // Products
  { url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/school-blazer.webp' },
  { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/school-polo.webp' },
  { url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/corporate-suit.webp' },
  { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/executive-shirt.webp' },
  { url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/lab-coat.webp' },
  { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/scrubs-set.webp' },
  { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/chef-jacket.webp' },
  { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/apron-set.webp' },
  { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/industrial-coverall.webp' },
  { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/highvis-jacket.webp' },
  { url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/security-shirt.webp' },
  { url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/sports-jersey.webp' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/tracksuit-set.webp' },
  { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop', path: 'public/images/products/fabric-sample.webp' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Failed ${dest}`, err.message);
      reject(err);
    });
  });
};

async function run() {
  for (const img of images) {
    try {
      await download(img.url, img.path);
    } catch (e) {
      console.log(`Skipped ${img.path}`);
    }
  }
}

run();
