import { useState, useEffect } from "react";
import { VideoCard } from "./BasePage/BasePageMain/VideoCard.jsx";
import { Modal } from "./BasePage/BasePageMain/Modal.jsx";

export function Likes() {
  const [liked, setLiked] = useState([]);
  const [selected, setSelected] = useState(null);

  const syncFromStorage = () => {
    try {
      setLiked(JSON.parse(localStorage.getItem("liked_videos") || "[]"));
    } catch {
      setLiked([]);
    }
  };

  useEffect(() => {
    syncFromStorage();
  }, []);

  const handleClose = () => {
    setSelected(null);
    syncFromStorage();
  };

  if (liked.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh]">
        <p className="text-[var(--text-2)]">
          No tienes contenido guardado aún.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Guardados:</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {liked.map((item) => (
          <VideoCard key={item.id} video={item} onSelect={setSelected} />
        ))}
      </div>
      {selected && <Modal video={selected} onClose={handleClose} />}
    </div>
  );
}
