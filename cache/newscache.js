const newsCache = {
  data: [],
  lastUpdated: null,
  ttl: 1000 * 60 * 10 
};


export const getCachedNews = async () => {
  const now = Date.now();
  if (newsCache.data.length > 0 && (now - newsCache.lastUpdated < newsCache.ttl)) {
    return newsCache.data; 
  }
  return null;
};


export const setCachedNews = async (articles) => {
   // console.log("adding"+articles.length+"Articles")
  newsCache.data = articles;
  newsCache.lastUpdated = Date.now();
};