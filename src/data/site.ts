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
  { label: 'Collection', href: '/collection' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const products: Product[] = [
  {
    name: 'The Signature Kemis',
    category: 'Kemis',
    price: 'Price on request',
    image: '/assets/images/product-signature-kemis.jpg',
    eyebrow: '01 / Signature',
  },
  {
    name: 'Tibeb in Motion',
    category: 'Statement',
    price: 'Price on request',
    image: '/assets/images/product-tibeb-motion.jpg',
    eyebrow: '02 / Statement',
  },
  {
    name: 'Ivory Ceremony',
    category: 'Ceremony',
    price: 'Price on request',
    image: '/assets/images/product-ivory-ceremony.jpg',
    eyebrow: '03 / Ceremony',
  },
  {
    name: 'Modern Heritage',
    category: 'Ready to wear',
    price: 'Price on request',
    image: '/assets/images/product-modern-heritage.jpg',
    eyebrow: '04 / Modern',
  },
]

export const collectionTiles = [
  {
    title: 'Heritage',
    kicker: 'Craft / 01',
    image: '/assets/images/collection-heritage.jpg',
  },
  {
    title: 'Ceremony',
    kicker: 'Occasion / 02',
    image: '/assets/images/collection-ceremony.jpg',
  },
  {
    title: 'Modern',
    kicker: 'Silhouette / 03',
    image: '/assets/images/collection-modern.jpg',
  },
]

export const homeEditorial = {
  hero: '/assets/images/home-hero.jpg',
  story: '/assets/images/editorial-craft.jpg',
  detail: '/assets/images/editorial-detail.jpg',
}
