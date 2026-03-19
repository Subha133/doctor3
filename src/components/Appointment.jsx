import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Phone, Clock, MessageCircle, CheckCircle2, User } from 'lucide-react'

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM',
  '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
  '4:30 PM', '5:00 PM', '5:30 PM',
]

export default function Appointment({ appointment }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{8,15}$/.test(form.phone)) e.phone = 'Valid phone number required'
    if (!form.date) e.date = 'Please select a date'
    if (!form.time) e.time = 'Please select a time'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})

    const msgText = `Hello Dr. Deepti Arora,\n\nI would like to book a consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nMessage: ${form.message || 'No additional message'}\n\nClinic: ${appointment.clinicName}\nAddress: ${appointment.clinicAddress}`

    const waUrl = `https://wa.me/${appointment.whatsappNumber}?text=${encodeURIComponent(msgText)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const InputField = ({ name, label, icon: Icon, type = 'text', placeholder, required }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor={name}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        <input
          id={name}
          type={type}
          value={form[name]}
          min={name === 'date' ? today : undefined}
          onChange={e => {
            setForm(f => ({ ...f, [name]: e.target.value }))
            if (errors[name]) setErrors(errs => ({ ...errs, [name]: undefined }))
          }}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-slate-700 text-sm placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all
            ${errors[name] ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-white hover:border-teal-300'}`}
        />
      </div>
      {errors[name] && <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">⚠ {errors[name]}</p>}
    </div>
  )

  return (
    <section id="appointment" className="py-16 sm:py-24 bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left – info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-white"
          >
            <span className="badge bg-teal-700/60 text-teal-200 text-xs uppercase tracking-wider mb-4 inline-block">
              ✦ Schedule a Visit
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {appointment.heading}
            </h2>
            <p className="text-teal-200 text-base sm:text-lg mb-8">{appointment.subtitle}</p>

            {/* Info blocks */}
            <div className="space-y-4">
              {[
                { icon: '📍', label: 'Location', value: appointment.clinicAddress },
                { icon: '📞', label: 'Phone', value: '+91 70442 32016' },
                { icon: '⏰', label: 'Working Hours', value: 'Mon–Fri: 9AM–6PM | Sat: 10AM–3PM' },
                { icon: '💬', label: 'Response Time', value: 'Within 2 hours during working hours' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs text-teal-300 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-white/90 text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl"
                >
                  <h3 className="font-display font-bold text-xl text-slate-800 mb-6">Book Your Consultation</h3>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <InputField name="name" label="Full Name" icon={User} placeholder="Your full name" required />
                    <InputField name="phone" label="Phone Number" icon={Phone} type="tel" placeholder="+91 98765 43210" required />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField name="date" label="Preferred Date" icon={Calendar} type="date" required />
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="time">
                          Preferred Time <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Clock size={16} />
                          </div>
                          <select
                            id="time"
                            value={form.time}
                            onChange={e => {
                              setForm(f => ({ ...f, time: e.target.value }))
                              if (errors.time) setErrors(errs => ({ ...errs, time: undefined }))
                            }}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-slate-700 text-sm appearance-none
                              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all
                              ${errors.time ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-white hover:border-teal-300'}`}
                          >
                            <option value="">Select time</option>
                            {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        {errors.time && <p className="text-rose-500 text-xs mt-1.5">⚠ {errors.time}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="message">
                        Message <span className="text-slate-400">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-3.5 text-slate-400">
                          <MessageCircle size={16} />
                        </div>
                        <textarea
                          id="message"
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          rows={3}
                          placeholder="Describe your concern or symptoms..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm placeholder-slate-400 resize-none
                            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all hover:border-teal-300"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2"
                    >
                      <span>📱</span> Send via WhatsApp
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      By booking, you agree to our privacy policy. No spam, ever.
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={36} className="text-teal-600" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-800 mb-3">Booking Sent!</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{appointment.confirmationMessage}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', time: '', message: '' }) }}
                    className="btn-secondary text-sm px-6 py-2.5"
                  >
                    Book Another Appointment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
