import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, AlertTriangle } from 'lucide-react'

export default function Footer({ footer, doctor }) {
  return (
    <footer className="bg-slate-900 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🫀</span>
              <span className="font-display font-bold text-lg leading-none">
                Apollo<br /><span className="text-xs font-sans font-normal tracking-widest text-teal-400 uppercase">Heart Clinic</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{footer.tagline}</p>
            <p className="text-xs font-mono text-slate-500 bg-slate-800 px-3 py-2 rounded-lg inline-block">
              MCI Reg: {doctor.registrationNumber}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2.5">
              {footer.quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2"
                    onClick={e => {
                      e.preventDefault()
                      const id = link.href.replace('#', '')
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span className="text-teal-500">→</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-base">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${doctor.phone}`} className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  <Phone size={14} className="shrink-0 mt-0.5 text-teal-500" />
                  {doctor.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${doctor.email}`} className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors text-sm break-all">
                  <Mail size={14} className="shrink-0 mt-0.5 text-teal-500" />
                  {doctor.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5 text-teal-500" />
                {doctor.address}
              </li>
            </ul>
          </div>

          {/* Hours + Emergency */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-base">Working Hours</h4>
            <ul className="space-y-2 mb-5">
              {doctor.workingHours.map((wh, i) => (
                <li key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{wh.day}</span>
                  <span className={`text-xs font-medium ${wh.time === 'Emergency Only' ? 'text-rose-400' : 'text-teal-400'}`}>
                    {wh.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="bg-rose-900/40 border border-rose-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={13} className="text-rose-400" />
                <p className="text-rose-300 text-xs font-semibold uppercase tracking-wide">Emergency</p>
              </div>
              <a href={`tel:${footer.emergencyNumber}`} className="text-white font-display font-bold text-base hover:text-rose-300 transition-colors">
                {footer.emergencyNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center sm:text-left">{footer.copyright}</p>
          <p className="text-slate-600 text-xs">Designed with ❤️ for better cardiac care</p>
        </div>
      </div>
    </footer>
  )
}
