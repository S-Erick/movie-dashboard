import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../api/tmdb.js";
import { BasePage } from "./Components/BasePage/BasePage.jsx";
import { VideoCard } from "./Components/BasePage/VideoCard.jsx";
import { Modal } from "./Components/BasePage/Modal.jsx";

export function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchPopularMovies()
      .then(setMovies)
      .catch((error) => console.error("Error cargando películas:", error));
  }, []);

  return (
    <BasePage
      title="Películas populares:"
      items={movies}
      renderItem={(movie) => (
        <VideoCard key={movie.id} video={movie} onSelect={setSelectedMovie} />
      )}
      modal={
        selectedMovie && (
          <Modal video={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )
      }
    />
  );
}
