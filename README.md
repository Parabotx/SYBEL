# SYBEL

Premium frontend foundation for SYBEL, a contemporary Habesha clothing brand.

## Stack

- React 19
- TypeScript
- Vite 8
- React Router
- Motion
- Lucide React
- Custom CSS design system

## Design direction

SYBEL is being built around a luxury editorial feel rather than a generic clothing-store template:

- warm ivory / white foundation
- restrained metallic-gold-inspired accents
- deep ink typography
- editorial serif + clean sans-serif
- large photography
- generous whitespace
- soft motion and micro-interactions
- responsive layout
- accessibility-minded controls

Gold is treated as a premium material accent, not a loud background color.

## Asset structure

Brand files go in public/assets/brand/

- logo-dark.png — full SYBEL logo for light backgrounds
- logo-light.png — full SYBEL logo for dark backgrounds
- mark.png — standalone SYBEL symbol for compact/icon uses

A separate wordmark image is not required. The existing logo assets are reused wherever the full brand logo is needed.

A separate favicon image is not required. The browser is given the existing dark and light logo PNGs and selects between them with prefers-color-scheme. The page also declares support for light/dark color schemes.

Photography goes in public/assets/images/

Recommended:
- home-hero.jpg
- collection-main.jpg
- collection-heritage.jpg
- collection-ceremony.jpg
- collection-modern.jpg
- about-studio.jpg
- editorial-craft.jpg
- editorial-detail.jpg
- product-signature-kemis.jpg
- product-tibeb-motion.jpg
- product-ivory-ceremony.jpg
- product-modern-heritage.jpg

Custom brand icons go in public/assets/icons/

Missing imagery currently falls back to a designed placeholder, so the site remains visually intact while the real assets are being prepared.

## Routes

- / — homepage
- /collection — collection preview
- /about — brand story
- /contact — contact / inquiry

## Local development

Requires Node.js 22.12+.

Install dependencies with npm install.

Run the development server with npm run dev.

Build for production with npm run build.

The repository is already configured for a Vite SPA deployment on Netlify.
