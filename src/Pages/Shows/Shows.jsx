import { useState } from "react";
import { videos } from "./DataShows";
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

  return (
    <div className="px-[10%] flex flex-col text-white select-none font-sans">
      {/* Tabs */}
      <div className="sticky z-50 top-0 left-0 right-0 bg-[var(--bg-base)] py-6 flex items-center justify-between ">
        <div className="flex items-center px-6 gap-6 border-b border-[var(--border-1)] shrink-0 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`pb-3 text-sm whitespace-nowrap transition-colors font-medium ${activeTab === i ? "text-[var(--text-base)] border-b-2 border-[var(--text-base)]" : "text-[var(--text-2)] hover:text-gray-300"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-[var(--border-2)] text-[var(--text-base)] text-sm px-4 py-1.5 w-100 outline-none border border-[var(--border-1)] placeholder-[var(--text-2)] focus:border-[var(--border-3)]"
        />
      </div>

      {/* Content */}
      <div className="flex w-full">
        <div className="grid grid-cols-4 gap-4 w-full">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} onSelect={setSelectedVideo} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <Modal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
