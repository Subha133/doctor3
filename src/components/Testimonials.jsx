import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />
      ))}
    </div>
  )
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = [
  'bg-teal-100 text-teal-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
]

export default function Testimonials({ testimonials }) {
  const [current, setCurrent] = useState(0)
  const list = testimonials.list

  const prev = () => setCurrent((c) => (c - 1 + list.length) % list.length)
  const next = () => setCurrent((c) => (c + 1) % list.length)

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge bg-teal-100 text-teal-700 text-xs uppercase tracking-wider mb-3 inline-block">
            ✦ Patient Stories
          </span>
          <h2 className="section-heading">{testimonials.heading}</h2>
          <p className="section-subtitle mx-auto text-center">{testimonials.subtitle}</p>
        </motion.div>

        {/* Desktop: all cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                  {getInitials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 text-sm leading-tight truncate">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.age} yrs · {t.location}</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <span className="badge bg-teal-50 text-teal-700 text-xs mt-3 self-start">{t.procedure}</span>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed flex-1">"{t.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${avatarColors[current % avatarColors.length]}`}>
                    {getInitials(list[current].name)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{list[current].name}</p>
                    <p className="text-xs text-slate-400">{list[current].age} yrs · {list[current].location}</p>
                  </div>
                </div>
                <StarRating rating={list[current].rating} />
                <span className="badge bg-teal-50 text-teal-700 text-xs mt-3 inline-block">{list[current].procedure}</span>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">"{list[current].text}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-teal-500' : 'w-2 h-2 bg-slate-200'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
