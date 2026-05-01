import { useState, useEffect } from "react";
import { fetchPopularShows } from "../../../api/tmdb.js";
import { Modal } from "./Modal.jsx";
import { VideoCard } from "./VideoCard.jsx";

const tabs = [
  "For You",
  "Following",
  "Popular",
  "Featured",
  "Live",
  "Continue Watching",
  "Watch Later",
];

export function Shows() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchPopularShows()
      .then(setShows)
      .catch((error) => console.error("Error cargando series:", error));
  }, []);

  return (
    <div className="px-[10%] flex flex-col text-white select-none font-sans">
      <div className="flex w-full">
        <div className="grid grid-cols-4 gap-4 w-full">
          {shows.map((v) => (
            <VideoCard key={v.id} video={v} onSelect={setSelectedVideo} />
          ))}
        </div>
      </div>

      {selectedVideo && (
        <Modal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
