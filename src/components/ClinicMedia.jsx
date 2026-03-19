import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

export default function ClinicMedia({ clinicMedia }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="clinic" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge bg-teal-100 text-teal-700 text-xs uppercase tracking-wider mb-3 inline-block">
            ✦ Our Facilities
          </span>
          <h2 className="section-heading">{clinicMedia.heading}</h2>
          <p className="section-subtitle mx-auto text-center">{clinicMedia.subtitle}</p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicMedia.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-slate-100 ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              onClick={() => setLightbox(item)}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: i === 0 ? '60%' : '70%' }}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-display font-semibold text-lg leading-tight">{item.title}</p>
                  <p className="text-white/80 text-sm mt-1">{item.description}</p>
                </div>
                {/* Always visible title on mobile */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent p-4 sm:hidden">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <ZoomIn size={16} className="text-slate-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.thumbnail}
                alt={lightbox.title}
                className="w-full rounded-2xl object-cover max-h-[75vh]"
              />
              <div className="mt-4 text-center">
                <p className="text-white font-display font-semibold text-xl">{lightbox.title}</p>
                <p className="text-white/70 text-sm mt-1">{lightbox.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
