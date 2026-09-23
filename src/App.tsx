import { ArrowDown, ArrowRight, ArrowUpRight, Mail, Menu, MessageCircle, Search, Settings, ShoppingBag, UserRound, X } from 'lucide-react'
import { FiInstagram } from 'react-icons/fi'
import { AnimatePresence, motion } from 'motion/react'
import { type FormEvent, type ReactNode, useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { collectionTiles, homeEditorial, navItems, products, type Product } from './data/site'

function BrandImage({ src, mobileSrc, alt, label = 'SYBEL / IMAGE', eager = false, className = '' }: {
  src: string
  mobileSrc?: string
  alt: string
  label?: string
  eager?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={'brand-image ' + className}>
      {!failed ? (
        <picture>
          {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            sizes="100vw"
            onError={() => setFailed(true)}
          />
        </picture>
      ) : (
        <div className="brand-image__placeholder" aria-label={alt + ' placeholder'}>
          <span className="brand-image__placeholder-kicker">{label}</span>
          <span className="brand-image__placeholder-title">Place SYBEL imagery here</span>
          <span className="brand-image__placeholder-path">{mobileSrc ? src + ' / ' + mobileSrc : src}</span>
        </div>
      )}
    </div>
  )
}

function BrandLogo({ variant = 'header', light = false }: { variant?: 'header' | 'footer'; light?: boolean }) {
  const [failed, setFailed] = useState(false)

  if (variant === 'footer') {
    return (
      <img
        className="footer-logo"
        src="/assets/brand/logo-light.png"
        alt="SYBEL"
        onError={() => setFailed(true)}
      />
    )
  }

  if (failed) {
    return (
      <span className="brand-lockup brand-lockup--fallback">
        <span className="brand-lockup__word">SYBEL</span>
        <span className="brand-lockup__descriptor">Design</span>
      </span>
    )
  }

  return (
    <span className={'brand-lockup' + (light ? ' brand-lockup--light' : '')}>
      <img
        className="brand-lockup__mark"
        src="/assets/brand/mark.png"
        alt=""
        aria-hidden="true"
        onError={() => setFailed(true)}
      />
      <span className="brand-lockup__type">
        <span className="brand-lockup__word">SYBEL</span>
        <span className="brand-lockup__descriptor">Design</span>
      </span>
    </span>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const homeNavItems = [
  { label: 'COLLECTIONS', href: '/collection' },
  { label: 'WOMAN', href: '/collection#pieces' },
  { label: 'MAN', href: '/collection#pieces' },
  { label: 'STORY', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className={'site-header' + (isHome ? ' site-header--home' : '')}>
      <div className="site-header__inner shell">
        <Link className="brand-logo-link" to="/" aria-label="SYBEL home">
          <span className="home-logo-capsule">
            <BrandLogo light={isHome} />
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {(isHome ? homeNavItems : navItems).map((item) => (
            <NavLink
              key={item.href + item.label}
              to={item.href}
              className={({ isActive }) => 'nav-link' + (isActive && item.label !== 'NEW' ? ' nav-link--active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions" aria-label="Quick actions">
          <span className="home-utility-capsule">
            <button className="icon-button" type="button" aria-label="Search">
              <Search aria-hidden="true" size={17} strokeWidth={1.15} />
            </button>
            <button className="icon-button" type="button" aria-label="Account">
              <UserRound aria-hidden="true" size={17} strokeWidth={1.15} />
            </button>
            <button className="icon-button" type="button" aria-label="Shopping bag">
              <ShoppingBag aria-hidden="true" size={17} strokeWidth={1.15} />
            </button>
            {!isHome ? (
              <button className="icon-button" type="button" aria-label="Settings">
                <Settings aria-hidden="true" size={17} strokeWidth={1.15} />
              </button>
            ) : null}
            <span className="home-utility-divider" aria-hidden="true" />
            <button
              className="icon-button site-header__menu"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" size={18} strokeWidth={1.15} /> : <Menu aria-hidden="true" size={18} strokeWidth={1.15} />}
            </button>
          </span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell mobile-menu__inner">
              {(isHome ? homeNavItems : navItems).map((item, index) => (
                <Link key={item.href + item.label} to={item.href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>{item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Link to="/collection" className="product-card__media">
        <BrandImage src={product.image} alt={product.name} label={product.eyebrow} />
        <span className="product-card__arrow"><ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.35} /></span>
      </Link>
      <div className="product-card__meta">
        <div>
          <span className="eyebrow">{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <span className="product-card__price">{product.price}</span>
      </div>
    </motion.article>
  )
}

function Home() {
  return (
    <div className="home-page">
      <section className="hero hero--luxury" aria-labelledby="hero-title">
        <BrandImage
          src={homeEditorial.hero}
          alt="SYBEL editorial campaign featuring a Habesha garment"
          eager
          label="SYBEL / CAMPAIGN IMAGE"
          className="hero__media"
        />

        <div className="hero__atmosphere" aria-hidden="true" />

        <div className="hero__content shell">
          <motion.span
            className="hero__kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            ETHIOPIAN HERITAGE / MODERN LIVING
          </motion.span>

          <motion.h1
            id="hero-title"
            className="hero__manifesto"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__manifesto-line hero__manifesto-line--lead">SYBEL carries the beauty</span>
            <span className="hero__manifesto-line">of Ethiopian cultural clothing into</span>
            <span className="hero__manifesto-line">the present, preserving its identity</span>
            <span className="hero__manifesto-line">while reshaping it for the way we live,</span>
            <span className="hero__manifesto-line">move, and express ourselves today.</span>
          </motion.h1>

          <motion.div
            className="hero__rule"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.84, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link className="button button--luxury-primary" to="/collection">
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.15} />
            </Link>
            <Link className="button button--luxury-secondary" to="/about">
              <span className="play-orb" aria-hidden="true">
                <span />
              </span>
              <span>WATCH THE STORY</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__principles"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.02, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__principle">
            <span className="hero__principle-glyph" aria-hidden="true">◇</span>
            <span className="hero__principle-copy"><strong>AUTHENTIC</strong><em>HERITAGE</em></span>
          </div>
          <div className="hero__principle-divider" aria-hidden="true" />
          <div className="hero__principle">
            <span className="hero__principle-glyph" aria-hidden="true">✦</span>
            <span className="hero__principle-copy"><strong>TIMELESS</strong><em>QUALITY</em></span>
          </div>
          <div className="hero__principle-divider" aria-hidden="true" />
          <div className="hero__principle">
            <span className="hero__principle-glyph" aria-hidden="true">△</span>
            <span className="hero__principle-copy"><strong>MODERN</strong><em>EXPRESSION</em></span>
          </div>
        </motion.div>

        <motion.div
          className="hero__metadata"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.12 }}
        >
          <span>01 — 04</span>
          <i aria-hidden="true" />
          <span>ETHIOPIAN HERITAGE / MODERN LIVING</span>
        </motion.div>

        <div className="hero__section-nav" aria-label="Hero progression">
          <span className="hero__section-number hero__section-number--active">01</span>
          <span className="hero__section-line" aria-hidden="true" />
          <span className="hero__section-dot hero__section-dot--active" aria-hidden="true" />
          <span className="hero__section-line" aria-hidden="true" />
          <span className="hero__section-dot" aria-hidden="true" />
          <span className="hero__section-line" aria-hidden="true" />
          <span className="hero__section-dot" aria-hidden="true" />
          <span className="hero__section-line" aria-hidden="true" />
          <span className="hero__section-number">04</span>
        </div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.18 }}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="hero__scroll-arrow" aria-hidden="true"><ArrowDown size={14} strokeWidth={1.05} /></span>
        </motion.div>

        <span className="hero__ornament hero__ornament--top" aria-hidden="true" />
        <span className="hero__ornament hero__ornament--bottom" aria-hidden="true" />
      </section>
    </div>
  )
}

function Collection() {
  return (
    <div className="inner-page">
      <section className="inner-hero shell">
        <span className="section-number">01 / COLLECTION</span>
        <h1>A considered wardrobe<br /><em>for modern moments.</em></h1>
        <p>The first SYBEL collection space is designed to become the future home of products, editions, and custom pieces.</p>
      </section>

      <section className="section section--compact">
        <div className="shell collection-index">
          <div className="collection-index__list">
            {collectionTiles.map((tile, index) => (
              <Link key={tile.title} className="collection-index__item" to="/collection#pieces">
                <span>0{index + 1}</span><strong>{tile.title}</strong><ArrowRight size={16} />
              </Link>
            ))}
          </div>
          <Reveal><BrandImage src="/assets/images/collection-main.png" alt="SYBEL collection editorial" label="SYBEL / COLLECTION" className="collection-main-image" /></Reveal>
        </div>
      </section>

      <section id="pieces" className="section">
        <div className="shell">
          <div className="section-heading-row">
            <div><span className="section-number">02 / PIECES</span><h2>Selected work</h2></div>
            <span className="muted-note">{products.length} curated references</span>
          </div>
          <div className="product-grid product-grid--collection">{products.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}</div>
        </div>
      </section>

      <section className="quote-band">
        <div className="shell">
          <Link className="back-link" to="/"><ArrowDown aria-hidden="true" size={15} strokeWidth={1.3} style={{ transform: 'rotate(90deg)' }} /> Back home</Link>
          <blockquote>“Tradition becomes contemporary when we design it with intention.”</blockquote>
        </div>
      </section>
    </div>
  )
}

function About() {
  return (
    <div className="inner-page">
      <section className="inner-hero shell">
        <span className="section-number">01 / ABOUT SYBEL</span>
        <h1>A house built on<br /><em>living heritage.</em></h1>
        <p>A future-facing visual language for Ethiopian fashion, where cultural memory and contemporary design can share the same silhouette.</p>
      </section>

      <section className="about-feature shell">
        <Reveal><BrandImage src="/assets/images/about-studio.png" alt="SYBEL studio" label="SYBEL / STUDIO" /></Reveal>
        <Reveal delay={0.08}>
          <span className="section-number">02 / THE IDEA</span>
          <h2>Not nostalgia. Continuity.</h2>
          <p>The eventual SYBEL story should live here in the company's own words: who started the house, why the brand exists, how garments are made, and what Ethiopian craftsmanship means to its future.</p>
          <Link className="text-link" to="/contact">Work with SYBEL <ArrowRight size={16} /></Link>
        </Reveal>
      </section>

      <section className="statement-section">
        <div className="shell statement-grid">
          <span className="section-number">03 / PRINCIPLES</span>
          <div>
            <div className="principle"><span>01</span><h3>Craft before decoration.</h3><p>Texture and construction should earn attention.</p></div>
            <div className="principle"><span>02</span><h3>Culture without costume.</h3><p>Heritage informs the design language rather than becoming a visual cliché.</p></div>
            <div className="principle"><span>03</span><h3>Luxury through restraint.</h3><p>White space, proportion, material, and light create the premium feeling.</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="inner-page">
      <section className="inner-hero shell">
        <span className="section-number">01 / CONTACT</span>
        <h1>Let's make<br /><em>something memorable.</em></h1>
        <p>A refined contact surface now, ready to become a Netlify-backed inquiry channel later.</p>
      </section>

      <section className="section section--contact">
        <div className="shell contact-grid">
          <Reveal>
            <div className="contact-details">
              <span className="section-number">02 / DIRECT</span>
              <h2>Speak with SYBEL.</h2>
              <p className="muted-note">Replace these placeholders with the official brand contact details when the company assets are added.</p>
              <a href="mailto:hello@sybel.example"><Mail aria-hidden="true" size={16} strokeWidth={1.3} /> hello@sybel.example</a>
              <a href="#"><MessageCircle aria-hidden="true" size={16} strokeWidth={1.3} /> WhatsApp / phone</a>
              <a href="#"><FiInstagram aria-hidden="true" size={16} strokeWidth={1.3} /> Instagram</a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Name<input name="name" placeholder="Your name" required /></label>
              <label>Email<input type="email" name="email" placeholder="you@example.com" required /></label>
              <label>What can SYBEL help with?
                <select name="reason" defaultValue="private">
                  <option value="private">Private purchase</option>
                  <option value="custom">Custom piece</option>
                  <option value="press">Press / editorial</option>
                  <option value="partnership">Partnership</option>
                </select>
              </label>
              <label>Message<textarea name="message" rows={6} placeholder="Tell us about your request…" required /></label>
              <button className="button button--dark" type="submit">{sent ? 'Inquiry prepared' : 'Send inquiry'} <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.3} /></button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <Link to="/" className="footer-logo-link" aria-label="SYBEL home"><BrandLogo variant="footer" /></Link>
          <p className="footer-intro">Contemporary Habesha clothing shaped by craft, restraint, and modern expression.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">Explore</span>
          <Link to="/collection">Collection</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">Connect</span>
          <a href="#" aria-label="Instagram"><FiInstagram aria-hidden="true" size={15} strokeWidth={1.3} /> Instagram</a>
          <a href="mailto:hello@sybel.example"><Mail aria-hidden="true" size={15} strokeWidth={1.3} /> Email</a>
        </div>
        <div className="footer-cta">
          <span className="footer-label">Private inquiries</span>
          <Link className="text-link" to="/contact">Begin a conversation <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.3} /></Link>
        </div>
      </div>
      <div className="shell site-footer__bottom"><span>© {new Date().getFullYear()} SYBEL</span><span>Designed for a new era of Habesha fashion.</span></div>
    </footer>
  )
}

function PageTransition() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <main><PageTransition /></main>
      <SiteFooter />
    </>
  )
}
