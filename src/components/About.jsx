import React from 'react'
import { motion } from 'framer-motion'

export default function About({ about }) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge bg-teal-100 text-teal-700 text-xs uppercase tracking-wider mb-3 inline-block">
            ✦ Our Story
          </span>
          <h2 className="section-heading">{about.heading}</h2>
        </motion.div>

        {/* Paragraphs */}
        <div className="max-w-3xl mx-auto mb-14 space-y-4">
          {about.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed text-center"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {about.highlights.map((hl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{hl.icon}</div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-3">{hl.title}</h3>
              <ul className="space-y-2">
                {hl.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-teal-500 mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
