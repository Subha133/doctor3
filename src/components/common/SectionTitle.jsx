import { motion } from "framer-motion";

export default function SectionTitle({ tag, title, subtitle, centered = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      {tag && (
        <span className={`section-tag ${light ? "bg-white/10 text-white" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {tag}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight
          ${light ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}
            ${light ? "text-white/70" : "text-slate-500"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
