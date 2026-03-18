import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";

export default function About() {
  const { doctor, about } = doctorData;

  return (
    <section id="about" className="section-padding bg-white" aria-labelledby="about-heading">
      <div className="container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image & credentials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative inline-block w-full max-w-md mx-auto lg:mx-0">
              {/* Main image frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-hero bg-gradient-to-br from-primary-100 to-teal-50 aspect-[4/5] flex items-center justify-center">
                <img
                  src={doctor.photo}
                  alt={doctor.photoAlt}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback */}
                <div className="hidden w-full h-full items-center justify-center flex-col gap-4 text-primary-300">
                  <svg className="w-40 h-40 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="font-display text-xl font-bold text-primary-400">{doctor.name}</span>
                </div>
              </div>

              {/* Registration badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-2xl shadow-card px-6 py-3 flex items-center gap-3 whitespace-nowrap">
                <div className="w-9 h-9 bg-teal-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Medical Registration</p>
                  <p className="text-sm font-bold text-slate-800">{doctor.registrationNo}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-2xl -z-10" />
              <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-teal-100 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <SectionTitle
              tag="About the Doctor"
              title={about.heading}
            />

            <div className="space-y-4 mb-8">
              {about.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="text-slate-600 leading-relaxed text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {about.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-primary-50 transition-colors group"
                >
                  <span className="text-2xl mt-0.5 flex-shrink-0">{h.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-primary-700 transition-colors">{h.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
