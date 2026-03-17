export const fetchArticles = async () => {
  // Uses relative path, works perfectly on the client
  // If we need SSR, we would use an absolute URL or directly query the DB.
  const res = await fetch("/api/articles");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
