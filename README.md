# Food Safety Website

A comprehensive bilingual (Turkish/English) food safety information platform built with Next.js 14, TypeScript, and SCSS.

## Features

- 🌐 Bilingual support (Turkish and English)
- 📱 Fully responsive design
- ♿ WCAG 2.1 AA accessibility compliance
- 🎨 Modern UI with SCSS modules
- � Opttimized performance with Next.js App Router
- 🔍 SEO-friendly architecture

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** SCSS with CSS Modules
- **Linting:** ESLint with Next.js configuration

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

Run the production server:

```bash
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable React components
├── lib/              # Utility functions and helpers
└── styles/           # Global styles and SCSS modules
    ├── globals.scss  # Global styles
    ├── _variables.scss # SCSS variables
    └── _mixins.scss  # SCSS mixins
```

## Configuration

### Internationalization

The application supports Turkish (default) and English languages. Configuration is in `next.config.js`:

```javascript
i18n: {
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
}
```

### Image Optimization

Next.js image optimization is configured for optimal performance with WebP and AVIF formats.

## Development Guidelines

- Follow TypeScript strict mode
- Use SCSS modules for component styling
- Maintain accessibility standards (WCAG 2.1 AA)
- Write semantic HTML
- Optimize images using Next.js Image component

## License

ISC
