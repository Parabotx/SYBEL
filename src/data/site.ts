export type NavItem = {
  label: string
  href: string
}

export type Product = {
  name: string
  category: string
  price: string
  image: string
  eyebrow: string
}

export const navItems: NavItem[] = [
  { label: 'NEW', href: '/collection' },
  { label: 'COLLECTIONS', href: '/collection' },
  { label: 'WOMAN', href: '/collection#pieces' },
  { label: 'MAN', href: '/collection#pieces' },
  { label: 'CONTACT', href: '/contact' },
]

export const products: Product[] = [
  {
    name: 'The Signature Kemis',
    category: 'Kemis',
    price: 'Price on request',
    image: '/assets/images/product-signature-kemis.png',
    eyebrow: '01 / Signature',
  },
  {
    name: 'Tibeb in Motion',
    category: 'Statement',
    price: 'Price on request',
    image: '/assets/images/product-tibeb-motion.png',
    eyebrow: '02 / Statement',
  },
  {
    name: 'Ivory Ceremony',
    category: 'Ceremony',
    price: 'Price on request',
    image: '/assets/images/product-ivory-ceremony.png',
    eyebrow: '03 / Ceremony',
  },
  {
    name: 'Modern Heritage',
    category: 'Ready to wear',
    price: 'Price on request',
    image: '/assets/images/product-modern-heritage.png',
    eyebrow: '04 / Modern',
  },
]

export const collectionTiles = [
  {
    title: 'Heritage',
    kicker: 'Craft / 01',
    image: '/assets/images/collection-heritage.png',
  },
  {
    title: 'Ceremony',
    kicker: 'Occasion / 02',
    image: '/assets/images/collection-ceremony.png',
  },
  {
    title: 'Modern',
    kicker: 'Silhouette / 03',
    image: '/assets/images/collection-modern.png',
  },
]

export const homeEditorial = {
  hero: '/assets/images/home-hero.png',
  heroMobile: '/assets/images/home-hero-mobile.png',
  story: '/assets/images/editorial-craft.png',
  detail: '/assets/images/editorial-detail.png',
}
