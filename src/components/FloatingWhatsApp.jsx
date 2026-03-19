import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp({ whatsappNumber }) {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    const tipTimer = setTimeout(() => setTooltip(false), 6000)
    return () => { clearTimeout(timer); clearTimeout(tipTimer) }
  }, [])

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 max-w-[200px]"
              >
                <button
                  onClick={() => setTooltip(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close tooltip"
                >
                  <X size={10} className="text-slate-600" />
                </button>
                <p className="text-slate-700 text-xs font-medium leading-snug">
                  💬 Chat with Dr. Arora's team on WhatsApp
                </p>
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleClick}
            className="whatsapp-ring w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center shrink-0 relative"
            style={{ backgroundColor: '#25D366' }}
            aria-label="Chat on WhatsApp"
          >
            {/* WhatsApp SVG icon */}
            <svg
              viewBox="0 0 32 32"
              fill="white"
              className="w-7 h-7 sm:w-8 sm:h-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.854 6.64L2.667 29.333l6.88-1.8A13.23 13.23 0 0016.004 29.333c7.36 0 13.329-5.973 13.329-13.333S23.364 2.667 16.004 2.667zm0 24c-2.08 0-4.12-.56-5.893-1.613l-.427-.254-4.08 1.067 1.094-3.96-.28-.44A10.612 10.612 0 015.334 16c0-5.88 4.787-10.667 10.67-10.667S26.671 10.12 26.671 16 21.884 26.667 16.004 26.667zm5.84-7.987c-.32-.16-1.893-.933-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.347.24-.667.08-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.547-.72-.56h-.613c-.213 0-.56.08-.853.4s-1.12 1.093-1.12 2.667 1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.763.333 1.36.533 1.827.68.76.24 1.453.213 2 .133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
