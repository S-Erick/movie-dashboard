const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`,
  );
  if (!response.ok) throw new Error(`Error ${response.status}`);
  const data = await response.json();
  return data.results;
}

export async function fetchPopularShows() {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`,
  );
  if (!response.ok) throw new Error(`Error ${response.status}`);
  const data = await response.json();
  return data.results;
}
