import { useState, useEffect } from "react";
import { fetchPopularShows } from "../../api/tmdb.js";
import { BasePage } from "./Components/BasePage/BasePage.jsx";
import { VideoCard } from "./Components/BasePage/VideoCard.jsx";
import { Modal } from "./Components/BasePage/Modal.jsx";

export function Shows() {
  const [shows, setShows] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchPopularShows()
      .then(setShows)
      .catch((error) => console.error("Error cargando series:", error));
  }, []);

  return (
    <BasePage
      title="Series populares:"
      items={shows}
      renderItem={(show) => (
        <VideoCard key={show.id} video={show} onSelect={setSelectedVideo} />
      )}
      modal={
        selectedVideo && (
          <Modal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )
      }
    />
  );
}
