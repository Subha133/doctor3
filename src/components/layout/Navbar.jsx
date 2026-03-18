import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "../../utils/helpers";
import doctorData from "../../data/doctorData.json";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "Videos", id: "videos" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "appointment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { doctor, clinic } = doctorData;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"}`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg
              ${scrolled ? "bg-primary-600 text-white" : "bg-white/20 text-white backdrop-blur-sm border border-white/30"}`}>
              {doctor.prefix}
            </div>
            <div className="text-left">
              <div className={`font-display font-bold text-sm leading-tight
                ${scrolled ? "text-slate-900" : "text-white"}`}>
                {doctor.firstName} {doctor.lastName}
              </div>
              <div className={`text-xs font-medium leading-tight
                ${scrolled ? "text-primary-600" : "text-white/70"}`}>
                {clinic.name}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${scrolled
                    ? "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${doctor.phone}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors
                ${scrolled ? "text-slate-500 hover:text-primary-600" : "text-white/70 hover:text-white"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
              </svg>
              {doctor.phone}
            </a>
            <button
              onClick={() => handleNav("appointment")}
              className={`btn-primary text-sm py-2.5 px-5
                ${!scrolled ? "!bg-white !text-primary-700 hover:!bg-white/90" : ""}`}
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors
              ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-white shadow-xl border-t border-slate-100 md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="text-left px-4 py-3 rounded-lg text-slate-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleNav("appointment")}
                  className="w-full btn-primary justify-center"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
