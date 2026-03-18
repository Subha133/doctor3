import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/helpers";
import { openWhatsAppChat } from "../../utils/whatsapp";
import doctorData from "../../data/doctorData.json";

export default function Footer() {
  const { doctor, clinic, footer } = doctorData;

  return (
    <footer className="bg-primary-950 text-white" aria-label="Site footer">
      {/* Top CTA Strip */}
      <div className="bg-gradient-to-r from-primary-700 to-teal-600">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Ready to take care of your heart?
            </h2>
            <p className="text-white/70 text-sm mt-1">Book a consultation today. Same-day slots available.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection("appointment")}
              className="btn-secondary !bg-white !text-primary-700 !border-white hover:!bg-white/90 whitespace-nowrap"
            >
              Book Appointment
            </button>
            <button
              onClick={() => openWhatsAppChat(doctor.whatsapp)}
              className="btn-secondary whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center font-display font-bold text-lg text-white">
                {doctor.prefix}
              </div>
              <div>
                <div className="font-display font-bold text-white">{doctor.name}</div>
                <div className="text-primary-400 text-xs font-medium">{clinic.name}</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              {footer.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-white/60">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{clinic.address}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4 flex-shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
                <a href={`tel:${doctor.phone}`} className="hover:text-white transition-colors">{doctor.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4 flex-shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${doctor.email}`} className="hover:text-white transition-colors">{doctor.email}</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Working Hours</h3>
            <ul className="space-y-3">
              {clinic.workingHours.map((h, i) => (
                <li key={i} className="flex flex-col gap-0.5">
                  <span className="text-white/40 text-xs font-medium">{h.day}</span>
                  <span className={`text-sm font-semibold ${h.time === "Emergency Only" ? "text-red-400" : "text-white/80"}`}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-xs text-red-300 font-medium">🚨 Emergency</p>
              <a href={`tel:${clinic.emergencyNumber}`} className="text-white font-bold text-sm hover:text-red-300 transition-colors">
                {clinic.emergencyNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">{footer.copyright}</p>
          <p className="text-white/20 text-xs">
            Designed with ❤️ for better cardiac health
          </p>
        </div>
      </div>
    </footer>
  );
}
