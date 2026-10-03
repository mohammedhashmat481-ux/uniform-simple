import NodeCache from 'node-cache';

// 5 minutes stdTTL (300 seconds)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export const getCache = (key) => {
  return cache.get(key);
};

export const setCache = (key, data, ttl = 300) => {
  return cache.set(key, data, ttl);
};

export const clearCache = (keyPrefix = null) => {
  if (!keyPrefix) {
    cache.flushAll();
    console.log('🧹 In-memory cache flushed completely.');
  } else {
    const keys = cache.keys();
    keys.forEach(k => {
      if (k.startsWith(keyPrefix)) {
        cache.del(k);
      }
    });
    console.log(`🧹 In-memory cache cleared for prefix: ${keyPrefix}`);
  }
};
