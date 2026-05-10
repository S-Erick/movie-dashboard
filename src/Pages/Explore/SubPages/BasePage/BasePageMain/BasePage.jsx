import { useState, useEffect } from "react";
import { VideoCard } from "./VideoCard.jsx";
import { Modal } from "./Modal.jsx";

export function BasePage({ title, fetchFn }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchFn()
      .then(setItems)
      .catch((error) => console.error("Error cargando contenido:", error));
  }, [fetchFn]);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {items.map((item) => (
          <VideoCard key={item.id} video={item} onSelect={setSelected} />
        ))}
      </div>
      {selected && <Modal video={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
