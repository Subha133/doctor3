import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function VideoCarousel() {
  const { videos } = doctorData;
  const swiperRef = useRef(null);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden" aria-label="Clinic gallery">
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
          ref={swiperRef}
          modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            stopOnLastSlide: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".swiper-btn-prev",
            nextEl: ".swiper-btn-next",
          }}
          loop
          className="!pb-12 !pt-4"
          style={{ paddingLeft: "0", paddingRight: "0" }}
        >
          {videos.items.map((item) => (
            <SwiperSlide key={item.id} style={{ width: "340px", maxWidth: "90vw" }}>
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
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                  </div>
                )}

                {/* Card info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                    <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">Apollo Heart Clinic</p>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-tight">{item.title}</h3>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <button className="swiper-btn-prev absolute left-4 lg:left-12 top-1/2 -translate-y-8 z-10
          w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
          rounded-full flex items-center justify-center text-white transition-all duration-200
          hover:scale-110">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-btn-next absolute right-4 lg:right-12 top-1/2 -translate-y-8 z-10
          w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
          rounded-full flex items-center justify-center text-white transition-all duration-200
          hover:scale-110">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
