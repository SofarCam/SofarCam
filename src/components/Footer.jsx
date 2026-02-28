import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-16 px-6 max-w-2xl mx-auto">
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cream/8 to-transparent mb-12" />

      <div className="flex flex-col items-center gap-8">
        {/* Logo mark */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-1"
        >
          <span
            className="text-gold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            Cam.
          </span>
          <span
            className="text-cream/20 text-[9px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            @sofar.cam
          </span>
        </motion.div>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/sofar.cam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/20 hover:text-gold transition-colors duration-300"
            aria-label="Personal Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://instagram.com/shotbyseven777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/20 hover:text-gold transition-colors duration-300"
            aria-label="Shot by Seven Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://youtube.com/sofarcam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/20 hover:text-gold transition-colors duration-300"
            aria-label="YouTube"
          >
            <FaYoutube size={18} />
          </a>
        </div>

        {/* Copyright + link */}
        <div className="text-center space-y-2">
          <p
            className="text-cream/15 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Charlotte, NC · {year}
          </p>
          <p
            className="text-cream/10 text-[10px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Built by{' '}
            <a
              href="https://shotbyseven.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold/40 transition-colors duration-200"
            >
              Cam
            </a>{' '}
            &amp; SofarSeven
          </p>
        </div>
      </div>
    </footer>
  )
}
