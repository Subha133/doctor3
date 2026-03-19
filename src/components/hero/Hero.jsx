import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/helpers";
import doctorData from "../../data/doctorData.json";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  const { doctor, hero, clinic } = doctorData;

  return (
    <section
      id="hero"
      className="relative min-h-screen max-h-fit flex items-center overflow-hidden bg-hero-gradient"
      aria-label="Hero section"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] lg:min-h-0 lg:py-20">

          {/* Left Content */}
          <div className="relative z-10">
            {/* Clinic badge */}
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest mb-4 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-slow" />
                <span className="max-w-[200px] sm:max-w-none truncate sm:inline">{clinic.name} · {clinic.tagline}</span>
              </span>
            </motion.div>

            {/* Doctor Name */}
            <motion.div {...fadeUp(0.2)}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {doctor.name.split(" ").map((word, i) => (
                  <span key={i} className={i === 0 ? "block text-white/60 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl" : "block"}>
                    {word}{" "}
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Degree & specialization */}
            <motion.div {...fadeUp(0.3)} className="mt-2 sm:mt-3 mb-4 sm:mb-5">
              <p className="text-teal-300 font-mono text-xs sm:text-sm font-medium">{doctor.degree}</p>
              <p className="text-white/80 font-semibold text-base sm:text-lg mt-0.5 sm:mt-1">{doctor.specialization}</p>
            </motion.div>

            {/* Tagline */}
            <motion.h2 {...fadeUp(0.4)} className="text-xl sm:text-2xl font-display font-semibold text-white/90 italic mb-3 sm:mb-4">
              "{hero.tagline}"
            </motion.h2>

            <motion.p {...fadeUp(0.45)} className="text-white/65 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg">
              {hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={() => scrollToSection("appointment")}
                className="btn-secondary !bg-white !text-primary-700 !border-white hover:!bg-white/90 shadow-hero text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-5"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {hero.ctaPrimary}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="btn-secondary text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-5"
              >
                {hero.ctaSecondary}
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>

            {/* Stats badges */}
            <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-2 sm:gap-3">
              {hero.badges.map((badge, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-center"
                >
                  <div className="font-display text-lg sm:text-2xl font-bold text-white">{badge.value}</div>
                  <div className="text-white/60 text-[10px] sm:text-xs font-medium mt-0.5">{badge.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Doctor Photo */}
          <motion.div {...fadeRight(0.3)} className="relative flex justify-center lg:justify-end">
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-white/10 animate-pulse-slow" />
              <div className="absolute w-56 h-56 sm:w-[28rem] sm:h-[28rem] rounded-full border border-white/5" />
            </div>

            <div className="relative z-10">
              {/* Photo container */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden
                  border-4 border-white/20 shadow-hero bg-gradient-to-br from-primary-400/30 to-teal-500/30
                  backdrop-blur-sm flex items-center justify-center">
                  <img
                    src={doctor.photo}
                    alt={doctor.photoAlt}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback avatar */}
                  <div className="hidden w-full h-full items-center justify-center">
                    <div className="text-center text-white/60">
                      <svg className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-2 sm:mb-4 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <p className="text-xs sm:text-sm font-medium">Dr. {doctor.lastName}</p>
                    </div>
                  </div>
                </div>

                {/* Experience badge floating */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 bg-white rounded-xl sm:rounded-2xl shadow-card-hover px-3 sm:px-4 py-2 sm:py-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg sm:text-2xl text-primary-700 leading-none">{doctor.experience}</div>
                      <div className="text-slate-500 text-[10px] sm:text-xs font-medium">{doctor.experienceLabel}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Available badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-teal-500 rounded-xl sm:rounded-2xl shadow-card px-3 sm:px-4 py-1.5 sm:py-2.5"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-[10px] sm:text-xs font-semibold">Accepting Patients</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 text-white/40"
      >
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-6 sm:w-5 sm:h-8 border border-white/20 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
