import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";
import { getStars } from "../../utils/helpers";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const { testimonials } = doctorData;

  return (
    <section id="testimonials" className="section-padding bg-white overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container-max mx-auto">
        <SectionTitle
          tag="Patient Stories"
          title={testimonials.heading}
          subtitle={testimonials.subtitle}
          centered
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {testimonials.list.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="card p-6 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  {/* Quote icon */}
                  <div className="text-primary-200 mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {getStars(t.rating).map((filled, i) => (
                      <svg key={i} className={`w-4 h-4 ${filled ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">
                    "{t.text}"
                  </p>

                  {/* Procedure badge */}
                  <span className="inline-block mt-4 text-xs bg-primary-50 text-primary-600 font-semibold px-3 py-1 rounded-full">
                    {t.procedure}
                  </span>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.age} yrs · {t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
