import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-16 px-6 max-w-2xl mx-auto">
      {/* Divider */}
      <div
        className="w-full h-px mb-12"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)' }}
      />

      <div className="flex flex-col items-center gap-8">
        {/* Logo mark */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-1"
        >
          <span
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            SofarContent
          </span>
          <span
            className="text-[9px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.2)' }}
          >
            by @sofar.cam
          </span>
        </motion.div>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/sofar.cam"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300"
            style={{ color: 'rgba(244,244,245,0.2)' }}
            aria-label="Personal Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://instagram.com/shotbyseven777"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300"
            style={{ color: 'rgba(244,244,245,0.2)' }}
            aria-label="Shot by Seven Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://youtube.com/sofarcam"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300"
            style={{ color: 'rgba(244,244,245,0.2)' }}
            aria-label="YouTube"
          >
            <FaYoutube size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.15)' }}
          >
            Charlotte, NC · {year}
          </p>
          <p
            className="text-[10px]"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.1)' }}
          >
            Built by{' '}
            <a
              href="https://shotbyseven.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(167,139,250,0.3)' }}
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
