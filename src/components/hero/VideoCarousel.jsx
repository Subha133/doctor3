import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function VideoCarousel() {
  const { videos, clinic } = doctorData;

  // FIX 4 — use refs so Swiper can reliably bind nav buttons in React
  // (class-name selectors like ".swiper-btn-prev" are unreliable post-mount)
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // FIX 5 — duplicate slides so loop mode always has enough clones to fill
  // the viewport without blank gaps (needs at least slidesPerView × 2 slides)
  const loopedItems = [...videos.items, ...videos.items];

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden"
      aria-label="Clinic gallery"
    >
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Our Facility"
          title={videos.heading}
          subtitle={videos.subtitle}
          centered
          light
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-4"
      >
        <Swiper
          // FIX 3 — swiperRef removed; it was declared but never actually used
          modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          // FIX 8 — rotate: 12 instead of 30; aggressive tilt looked broken
          coverflowEffect={{
            rotate: 12,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          // FIX 7 — explicit speed for a smooth premium transition
          speed={700}
          autoplay={{
            delay: 3500,             // FIX 1 — was 1000ms; too fast to read/settle
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // FIX 2 — was false; users couldn't hover to read
            stopOnLastSlide: false,
          }}
          pagination={{ clickable: true }}
          // FIX 4 — wire nav via onBeforeInit so refs are ready before Swiper mounts
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          loop
          className="!pb-12 !pt-4"
        >
          {/* FIX 5 — loopedItems prevents blank gaps in loop mode with few slides */}
          {loopedItems.map((item, idx) => (
            <SwiperSlide
              key={`${item.id}-${idx}`}
              style={{ width: "340px", maxWidth: "90vw" }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] group cursor-pointer">
                {item.type === "video" && item.url ? (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="relative w-full h-64 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                    {/* FIX — hardcoded "Apollo Heart Clinic" replaced with data */}
                    <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">
                      {clinic.name}
                    </p>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-tight">{item.title}</h3>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* FIX 4 — nav buttons wired via refs, not fragile ".swiper-btn-*" selectors */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="absolute left-4 lg:left-12 top-1/2 -translate-y-8 z-10
            w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
            rounded-full flex items-center justify-center text-white transition-all duration-200
            hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          ref={nextRef}
          aria-label="Next slide"
          className="absolute right-4 lg:right-12 top-1/2 -translate-y-8 z-10
            w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
            rounded-full flex items-center justify-center text-white transition-all duration-200
            hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}