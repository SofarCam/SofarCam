import GreaseMark from './ui/GreaseMark'
import { openTool } from '../lib/openTool'

const FRAMES = [
  { src: '/work/frame-01.webp', alt: 'Portrait in red gloves and a black leather jacket' },
  { src: '/work/frame-02.webp', alt: 'Black and white portrait, hand raised to lips' },
  { src: '/work/frame-03.webp', alt: 'Boots covered in flowers on a red stool against yellow' },
  { src: '/work/frame-04.webp', alt: 'Black and white portrait of a man adjusting his cap' },
  { src: '/work/frame-05.webp', alt: 'Black and white portrait of a woman holding a camera' },
  { src: '/work/frame-06.webp', alt: 'Smiling portrait in a green and white jersey against yellow' },
  { src: '/work/frame-07.webp', alt: 'Black and white portrait of a man pointing at the camera' },
  { src: '/work/frame-08.webp', alt: 'Portrait holding a bouquet of red roses' },
  { src: '/work/frame-09.webp', alt: 'Man lining up a shot on a blue pool table' },
  { src: '/work/frame-10.webp', alt: 'Portrait in a fur coat in a wood-paneled room' },
  { src: '/work/frame-11.webp', alt: 'Graduate in a blue suit and cap' },
  { src: '/work/frame-12.webp', alt: 'Close-up of teal running shoes on brick' },
]

const KEEPER = 4

function ContactSheet() {
  const strips = [FRAMES.slice(0, 4), FRAMES.slice(4, 8), FRAMES.slice(8, 12)]
  return (
    <figure className="contact-sheet">
      <div className="contact-paper">
        {strips.map((strip, s) => (
          <div key={s} className="film-strip">
            {strip.map((frame, f) => {
              const n = s * 4 + f
              return (
                <div key={frame.src} className="film-frame">
                  <div className={n === KEEPER ? 'relative z-10' : 'relative'}>
                    <img
                      src={frame.src}
                      alt={frame.alt}
                      width="560"
                      height="700"
                      loading={n < 8 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    {n === KEEPER && <GreaseMark seed={5} />}
                  </div>
                  <span className="film-number type-frame">{n + 1}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-[14px] text-graphite">
        Selects from recent{' '}
        <a href="https://shotbyseven.com" className="link-quiet text-silver" target="_blank" rel="noopener noreferrer">
          Shot by Seven
        </a>{' '}
        portrait sessions.
      </figcaption>
    </figure>
  )
}

export default function Hero() {
  return (
    <section className="container-page grid gap-12 pt-10 pb-24 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-32">
      <div className="lg:col-span-5 lg:pt-4">
        <h1 className="type-display text-[clamp(60px,9vw,128px)] text-silver">
          <span className="block text-balance">Get ten hooks.</span>
          <span className="block text-balance">Keep the best one.</span>
        </h1>
        <p className="mt-8 max-w-[34ch] text-[19px] leading-[1.5] text-[#c9c9c4]">
          Free tools that write hooks, captions, and post ideas for you to pick from.
          Made by Cam Currence, a portrait photographer in Charlotte.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#hooks"
            className="btn-gold"
            onClick={(e) => { e.preventDefault(); openTool('hooks') }}
          >
            Write my hooks
          </a>
          <a href="#tools" className="link-quiet text-[16px]">See all five tools</a>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ContactSheet />
      </div>
    </section>
  )
}
