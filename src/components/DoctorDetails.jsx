import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, User, Building2, CreditCard, GraduationCap } from 'lucide-react'

const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
}

function DetailRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={16} className="text-teal-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-slate-700 font-medium mt-0.5 text-sm sm:text-base break-words">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <a href={href} className="block hover:bg-slate-50 rounded-xl -mx-2 px-2 transition-colors">{content}</a>
  }
  return <div>{content}</div>
}

export default function DoctorDetails({ doctor }) {
  return (
    <section id="details" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge bg-teal-100 text-teal-700 text-xs uppercase tracking-wider mb-3 inline-block">
            ✦ Contact & Details
          </span>
          <h2 className="section-heading">
            {doctor.prefix} <span className="text-gradient">{doctor.name}</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">{doctor.degree}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Professional Info Card */}
          <motion.div
            custom={0} variants={inView} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-teal-600" /> Professional Info
            </h3>
            <DetailRow icon={User} label="Full Name" value={`${doctor.prefix} ${doctor.name}`} />
            <DetailRow icon={GraduationCap} label="Qualification" value={doctor.degree} />
            <DetailRow icon={Building2} label="Specialization" value={doctor.specialization} />
            <DetailRow icon={CreditCard} label="Registration No." value={doctor.registrationNumber} />
            <div className="flex items-start gap-4 py-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-base">🏆</span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Experience</p>
                <p className="text-slate-700 font-medium mt-0.5">
                  <span className="text-2xl font-display font-bold text-teal-600">{doctor.experience}+</span>{' '}
                  <span className="text-sm">{doctor.experienceLabel}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            custom={1} variants={inView} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Phone size={18} className="text-teal-600" /> Contact Information
            </h3>
            <DetailRow icon={Phone} label="Phone" value={doctor.phone} href={`tel:${doctor.phone}`} />
            <DetailRow icon={Mail} label="Email" value={doctor.email} href={`mailto:${doctor.email}`} />
            <DetailRow icon={Building2} label="Clinic" value={doctor.clinicName} />
            <DetailRow icon={MapPin} label="Address" value={doctor.address} />
          </motion.div>

          {/* Working Hours Card */}
          <motion.div
            custom={2} variants={inView} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="card p-6 md:col-span-2 xl:col-span-1"
          >
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-teal-600" /> Working Hours
            </h3>
            <div className="space-y-2">
              {doctor.workingHours.map((wh, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium text-sm">{wh.day}</span>
                  <span className={`badge text-xs font-medium ${wh.time === 'Emergency Only' ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-700'}`}>
                    {wh.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100">
              <p className="text-xs text-teal-700 font-medium">
                📍 {doctor.address}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
