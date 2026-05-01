import { useState, useEffect } from "react";
import { fetchPopularMovies, IMAGE_BASE_URL } from "../../../api/tmdb.js";

export function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies()
      .then(setMovies)
      .catch((error) => console.error("Error cargando películas:", error));
  }, []);

  return (
    <div className="p-8 xl:px-30">
      <h1>Populares:</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="text-center border border-[var(--border-1)] "
          >
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
