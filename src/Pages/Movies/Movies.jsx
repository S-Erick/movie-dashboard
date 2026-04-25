import { useState } from "react";
import { useEffect } from "react";

export function Movies() {
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error cargando películas:", error);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  return (
    <div className="p-8 xl:px-30">
      <h1>Populares:</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <div key={movie.id} className="text-center border">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full"
            />
            <p className="py-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
