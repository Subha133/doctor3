import React from 'react'
import { motion } from 'framer-motion'

const tagColors = {
  'Interventional': 'bg-rose-50 text-rose-600',
  'Diagnostic': 'bg-blue-50 text-blue-600',
  'Imaging': 'bg-purple-50 text-purple-600',
  'Preventive': 'bg-green-50 text-green-600',
  'Management': 'bg-orange-50 text-orange-600',
}

export default function Services({ services }) {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge bg-teal-100 text-teal-700 text-xs uppercase tracking-wider mb-3 inline-block">
            ✦ What We Offer
          </span>
          <h2 className="section-heading">{services.heading}</h2>
          <p className="section-subtitle mx-auto text-center">{services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.list.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group card p-6 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-3xl group-hover:bg-teal-100 transition-colors">
                  {service.emoji}
                </div>
                <span className={`badge text-xs font-medium ${tagColors[service.tag] || 'bg-slate-100 text-slate-600'}`}>
                  {service.tag}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors flex items-center gap-1"
                >
                  Book Consultation <span className="ml-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
