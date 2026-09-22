import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Instagram, Mail, Menu, MessageCircle, MoveDownRight, Search, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FormEvent, type ReactNode, useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { collectionTiles, homeEditorial, navItems, products, type Product } from './data/site'

function BrandImage({ src, alt, label = 'SYBEL / IMAGE', eager = false, className = '' }: {
  src: string
  alt: string
  label?: string
  eager?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={'brand-image ' + className}>
      {!failed ? (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
      ) : (
        <div className="brand-image__placeholder" aria-label={alt + ' placeholder'}>
          <span className="brand-image__placeholder-kicker">{label}</span>
          <span className="brand-image__placeholder-title">Place SYBEL imagery here</span>
          <span className="brand-image__placeholder-path">{src}</span>
        </div>
      )}
    </div>
  )
}

function BrandLogo({ variant = 'header' }: { variant?: 'header' | 'footer' }) {
  const [failed, setFailed] = useState(false)
  const src = variant === 'footer'
    ? '/assets/brand/logo-light.svg'
    : '/assets/brand/logo-dark.svg'
  const className = variant === 'footer' ? 'footer-logo' : 'brand-logo'

  if (failed) {
    return <span className={variant === 'footer' ? 'footer-wordmark' : 'brand-wordmark'}>SYBEL</span>
  }

  return <img className={className} src={src} alt="SYBEL" onError={() => setFailed(true)} />
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

function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <button
          className="icon-button site-header__menu"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>

        <Link className="brand-logo-link" to="/" aria-label="SYBEL home"><BrandLogo /></Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="icon-button" type="button" aria-label="Search"><Search size={19} strokeWidth={1.5} /></button>
          <button className="icon-button" type="button" aria-label="Shopping bag"><ShoppingBag size={19} strokeWidth={1.5} /></button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell mobile-menu__inner">
              {navItems.map((item, index) => (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
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
        <span className="product-card__arrow"><ArrowUpRight size={18} /></span>
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
      <section className="hero">
        <BrandImage src={homeEditorial.hero} alt="SYBEL editorial campaign" eager label="SYBEL / CAMPAIGN IMAGE" />
        <div className="hero__veil" />
        <div className="hero__content shell">
          <motion.span
            className="hero__kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            HABESHA CLOTHING / SYBEL
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Heritage,<em> reimagined.</em>
          </motion.h1>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link className="button button--light" to="/collection">Discover the collection <ArrowRight size={17} /></Link>
          </motion.div>
        </div>
        <div className="hero__scroll"><span>Scroll to explore</span><ArrowDown size={16} /></div>
      </section>

      <section className="section section--intro">
        <div className="shell intro-grid">
          <Reveal><span className="section-number">01 / THE HOUSE</span></Reveal>
          <Reveal delay={0.08}>
            <p className="display-copy">
              SYBEL is a new expression of <em>Habesha dress</em>—rooted in craft,
              refined through contemporary form, and made to be remembered.
            </p>
            <Link className="text-link" to="/about">Discover our story <MoveDownRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--collection">
        <div className="shell">
          <Reveal className="section-heading-row">
            <div><span className="section-number">02 / SIGNATURE WORK</span><h2>Selected pieces</h2></div>
            <Link className="text-link" to="/collection">View collection <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="product-grid">{products.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}</div>
        </div>
      </section>

      <section className="section section--tiles">
        <div className="shell">
          <Reveal className="section-heading-row">
            <div><span className="section-number">03 / THE LANGUAGE</span><h2>Three ways to enter SYBEL</h2></div>
          </Reveal>
          <div className="collection-tiles">
            {collectionTiles.map((tile, index) => (
              <Reveal key={tile.title} delay={index * 0.07}>
                <Link to="/collection" className="collection-tile">
                  <BrandImage src={tile.image} alt={tile.title} label={tile.kicker} />
                  <div className="collection-tile__caption"><span>{tile.kicker}</span><h3>{tile.title}</h3><ArrowRight size={18} /></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="split-story">
        <div className="split-story__image"><BrandImage src={homeEditorial.story} alt="Handcrafted textile detail" label="SYBEL / CRAFT" /></div>
        <div className="split-story__content">
          <Reveal>
            <span className="section-number">04 / CRAFT</span>
            <h2>Every thread carries a memory.</h2>
            <p>
              From the architecture of the silhouette to the smallest woven detail,
              SYBEL treats Ethiopian visual language as a living design system—not a costume.
            </p>
            <Link className="text-link" to="/about">Read the SYBEL story <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--detail">
        <div className="shell detail-grid">
          <Reveal>
            <span className="section-number">05 / DETAIL</span>
            <h2>Quiet luxury, made visible.</h2>
            <p>Texture, proportion, movement, and restraint do the work. Gold belongs here as a material note—a glint, not a flood.</p>
          </Reveal>
          <Reveal delay={0.08}><BrandImage src={homeEditorial.detail} alt="SYBEL fabric and embroidery detail" label="SYBEL / DETAIL" className="detail-image" /></Reveal>
        </div>
      </section>

      <section className="closing-cta">
        <div className="shell closing-cta__inner">
          <span className="section-number">06 / NEXT</span>
          <h2>Dress the moment.</h2>
          <Link className="button button--dark" to="/collection">Explore SYBEL <ArrowRight size={17} /></Link>
        </div>
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
          <Reveal><BrandImage src="/assets/images/collection-main.jpg" alt="SYBEL collection editorial" label="SYBEL / COLLECTION" className="collection-main-image" /></Reveal>
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
          <Link className="back-link" to="/"><ArrowLeft size={16} /> Back home</Link>
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
        <Reveal><BrandImage src="/assets/images/about-studio.jpg" alt="SYBEL studio" label="SYBEL / STUDIO" /></Reveal>
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
              <a href="mailto:hello@sybel.example"><Mail size={17} /> hello@sybel.example</a>
              <a href="#"><MessageCircle size={17} /> WhatsApp / phone</a>
              <a href="#"><Instagram size={17} /> Instagram</a>
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
              <button className="button button--dark" type="submit">{sent ? 'Inquiry prepared' : 'Send inquiry'} <ArrowUpRight size={17} /></button>
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
          <a href="#" aria-label="Instagram"><Instagram size={16} /> Instagram</a>
          <a href="mailto:hello@sybel.example"><Mail size={16} /> Email</a>
        </div>
        <div className="footer-cta">
          <span className="footer-label">Private inquiries</span>
          <Link className="text-link" to="/contact">Begin a conversation <ArrowUpRight size={16} /></Link>
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
