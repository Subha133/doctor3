import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";

/* ─── Lightbox – 9:16 portrait player ───────────────────────────────────── */
function VideoModal({ video, onClose }) {
  return (
    <AnimatePresence>
      {video && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden relative">
              {/* 9:16 player - YouTube or direct video */}
              <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                {video.videoUrl ? (
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-14">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20 flex-shrink-0">
                    {doctorData.doctor.firstName[0]}
                  </div>
                  <span className="text-white text-sm font-semibold">{doctorData.doctor.name}</span>
                </div>
                <p className="text-white font-bold text-sm leading-snug">{video.title}</p>
                <p className="text-white/60 text-xs mt-1 line-clamp-2">{video.description}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Reel Card ──────────────────────────────────────────────────────────── */
function ReelCard({ video, index, onClick }) {
  // Use custom thumbnail if available, otherwise try YouTube
  const thumb    = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const fallback = video.thumbnail ? null : `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex items-end gap-3"
    >
      {/* ── Portrait card ── */}
      <div
        onClick={() => onClick(video)}
        className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0"
        style={{ width: "min(180px, 45vw)", aspectRatio: "9/16" }}
      >
        {video.videoUrl ? (
          <>
            <img
              src={thumb}
              alt={video.title}
              onError={(e) => { e.target.src = fallback; }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <video
              src={video.videoUrl}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
            />
          </>
        ) : (
          <img
            src={thumb}
            alt={video.title}
            onError={(e) => { e.target.src = fallback; }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <span className="bg-black/50 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full leading-4 border border-white/10 truncate max-w-[70px] sm:max-w-[80px]">
            {video.category}
          </span>
          <span className="bg-black/50 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-mono font-semibold px-1.5 sm:px-2 py-0.5 rounded-full leading-4 border border-white/10 flex-shrink-0">
            {video.duration}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm border-2 border-white/50
              flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-white/35 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white text-[7px] sm:text-[8px] font-bold ring-1 ring-white/30 flex-shrink-0">
              {doctorData.doctor.firstName[0]}
            </div>
            <span className="text-white text-[9px] sm:text-[10px] font-semibold drop-shadow truncate">
              {doctorData.doctor.firstName} {doctorData.doctor.lastName}
            </span>
          </div>
          <p className="text-white font-bold text-[10px] sm:text-[11px] leading-tight line-clamp-2 drop-shadow">
            {video.title}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-white/50 text-[8px] sm:text-[9px] font-medium">{video.views}</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function VideoSection() {
  const { videoSection }          = doctorData;
  const [activeVideo, setActiveVideo]       = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const allCategories = ["All", ...new Set(videoSection.items.map((v) => v.category))];
  const filtered = activeCategory === "All"
    ? videoSection.items
    : videoSection.items.filter((v) => v.category === activeCategory);

  return (
    <>
      <section id="videos" className="section-padding bg-white overflow-hidden" aria-labelledby="videos-heading">
        <div className="container-max mx-auto">

          {/* Header row */}
          <div className="mb-8">
            <SectionTitle
              tag="Reels"
              title={videoSection.heading}
              subtitle={videoSection.subtitle}
            />
          </div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-slate-900 text-white scale-105 shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Reel cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mobile: horizontal snap scroll - optimized for smaller screens */}
              <div
                className="flex gap-3 overflow-x-auto pb-6 sm:hidden -mx-4 px-4"
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
              >
                {filtered.map((video, i) => (
                  <div key={video.id} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
                    <ReelCard video={video} index={i} onClick={setActiveVideo} />
                  </div>
                ))}
              </div>

              {/* Tablet: 2 columns */}
              <div className="hidden sm:flex md:hidden flex-wrap gap-4 justify-start">
                {filtered.map((video, i) => (
                  <ReelCard key={video.id} video={video} index={i} onClick={setActiveVideo} />
                ))}
              </div>

              {/* Desktop: wrapped grid with more columns */}
              <div className="hidden md:flex flex-wrap gap-6 justify-start">
                {filtered.map((video, i) => (
                  <ReelCard key={video.id} video={video} index={i} onClick={setActiveVideo} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
