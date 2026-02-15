# Throttle Connectors - High-Performance Driving Academy

A modern, fully responsive web platform for Throttle Connectors, a premier high-performance driving academy with locations across India. Built with Next.js 14+ and optimized for performance, SEO, and social media sharing.

**Live Site:** https://throttleconnectors.in

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Environment Configuration](#environment-configuration)
- [Key Components](#key-components)
- [SEO & Metadata](#seo--metadata)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)
- [Contact](#contact)

---

## 🎯 Project Overview

Throttle Connectors is a professional driving academy offering high-performance driving training across multiple Indian cities. This website serves as the digital presence of the academy, showcasing:

- **Multi-location Academy**: Ahmedabad, Bangalore, Coimbatore, and Hyderabad
- **Professional Training Programs**: High-performance driving and business skills courses
- **Interactive User Experience**: Smooth animations, responsive design, and engaging content
- **Social Integration**: WhatsApp direct contact, social media links, and rich media previews
- **SEO Optimized**: Structured data, Open Graph metadata, and search engine optimization

**Contact:** +91-8467-042-523 (WhatsApp)  
**Email Integration:** Available through contact forms  
**Service Areas:** Ahmedabad (Gujarat), Bangalore (Karnataka), Coimbatore (Tamil Nadu), Hyderabad (Telangana)

---

## ✨ Features

### Core Features

- **Responsive Multi-Device Support**: Mobile, tablet, desktop, and ultra-wide screens
- **Interactive Hero Section**: Landing page with engaging visuals and call-to-action
- **About Us Section**: Company mission with portfolio images
- **Academy Showcase**: Detailed pages for each city academy location
- **Testimonials Carousel**: Interactive customer testimonials with smooth transitions
- **WhatsApp Floating Button**: Persistent WhatsApp contact button for easy communication
- **Navigation Navbar**: Sticky header with smooth scrolling and mobile menu

### SEO & Marketing Features

- **Open Graph Metadata**: Rich preview cards for WhatsApp, Facebook, LinkedIn, Twitter
- **JSON-LD Structured Data**:
  - Organization schema with social links and contact information
  - EducationalOrganization schema with postal addresses for all city locations
  - Schema.org compliant for knowledge graph eligibility
- **Robots.txt & Sitemap**: Search engine crawler optimization
- **Meta Tags**: Comprehensive title, description, keywords, and canonical URLs
- **Social Media Cards**: Customized previews for different social platforms

### Performance Features

- **Next.js Optimization**: Built-in image optimization, code splitting, and lazy loading
- **Tailwind CSS**: Utility-first CSS framework for minimal bundle size
- **Font Optimization**: Google Fonts with variable font support for faster loading
- **Asset Optimization**: Compressed images in JPEG and WebP formats

---

## 🛠 Tech Stack

### Frontend Framework

- **Next.js** (v16.1.6) - React-based framework with SSR and static generation
- **React** (v19.2.3) - UI library
- **TypeScript** (v5) - Type-safe JavaScript

### Styling & UI

- **Tailwind CSS** (v4) - Utility-first CSS framework
- **PostCSS** (v4) - CSS processing and transformations
- **Custom CSS** - Global styles and animations in `/src/app/globals.css`

### Animation & Effects

- **GSAP** (v3.14.2) - GreenSock Animation Platform for smooth animations

### Fonts

- **Bebas Neue** - Bold, modern heading font from Google Fonts
- **Inter** - Clean, professional body font from Google Fonts

### Development Tools

- **ESLint** (v9) - Code quality and linting
- **Bun** - Fast JavaScript runtime and package manager

---

## 📁 Project Structure

```
throttle_connectors/
├── public/
│   ├── assets/
│   │   ├── about_us_page.jpeg          # Main about section image
│   │   ├── aboutus_small_image.jpeg    # Secondary about section image
│   │   ├── throttle.png                # Logo
│   │   ├── landing_video.mp4           # Hero section video
│   │   ├── academy_page*.jpeg          # Academy hub images
│   │   ├── ahmedabad.jpeg              # Ahmedabad city image
│   │   ├── bangalore*.jpeg             # Bangalore city images
│   │   ├── coimbatore.jpeg             # Coimbatore city image
│   │   ├── hyderabad*.jpeg             # Hyderabad city images
│   ├── robots.txt                      # SEO crawler configuration
│   └── sitemap.xml                     # URL sitemap for search engines
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with metadata and WhatsApp button
│   │   ├── page.tsx                    # Home page
│   │   ├── globals.css                 # Global styles and animations
│   │   └── academy/
│   │       ├── page.tsx                # Academy hub page
│   │       ├── ahmedabad/
│   │       │   └── page.tsx            # Ahmedabad academy detail page
│   │       ├── bangalore/
│   │       │   └── page.tsx            # Bangalore academy detail page
│   │       ├── coimbatore/
│   │       │   └── page.tsx            # Coimbatore academy detail page
│   │       └── hyderabad/
│   │           └── page.tsx            # Hyderabad academy detail page
│   │
│   └── components/
│       ├── TestimonialsCarousel.tsx    # Testimonials carousel component
│       ├── navbar/                     # Navigation bar components
│       │   └── Navbar.tsx
│       ├── hero_section/               # Hero section components
│       │   └── HeroSection.tsx
│       ├── sections/
│       │   ├── aboutus/
│       │   │   └── AboutUsSection.tsx  # About us section component
│       │   ├── academy/
│       │   │   └── AcademySection.tsx  # Academy section component
│       │   └── footer/
│       │       └── Footer.tsx          # Footer component
│       └── shared/                     # Reusable components
│           └── SocialIcons.tsx         # Social media links
│
├── next.config.ts                      # Next.js configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies and scripts
├── postcss.config.mjs                  # PostCSS configuration
├── eslint.config.mjs                   # ESLint rules
└── README.md                           # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18+ recommended)
- **Bun** (v1.0+ recommended) or npm/yarn
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/throttle_connectors.git
cd throttle_connectors
```

### Step 2: Install Dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed
bun list   # for Bun
# or
npm list   # for npm
```

---

## 💻 Development

### Start Development Server

```bash
bun dev
# or
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Development Features

- **Hot Reload**: Changes are instantly reflected without page refresh
- **Fast Refresh**: React component updates without losing state
- **Debug Mode**: Browser DevTools and React Developer Tools support
- **Type Checking**: Real-time TypeScript error checking

### Common Development Tasks

**View TypeScript errors:**

```bash
npx tsc --noEmit
```

**Check Tailwind CSS classes:**

```bash
npx tailwindcss -i src/app/globals.css -o public/output.css --watch
```

**Lint code:**

```bash
bun lint
# or
npm run lint
```

---

## 🔨 Build & Deployment

### Build for Production

```bash
bun run build
# or
npm run build
```

This creates an optimized production build in the `.next` directory.

### Start Production Server

```bash
bun start
# or
npm start
```

### Build Output

- **Static HTML**: Pre-rendered pages for SEO
- **Code Splitting**: Automatic chunk optimization
- **Image Optimization**: Next.js automatic image sizing
- **CSS Purging**: Unused Tailwind classes removed (dev dependency only)

### Deployment Options

#### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js and configures build settings
3. Deploy with automatic CI/CD on push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Other Hosting Platforms

- **Netlify**: Configure build command to `bun run build`
- **AWS Amplify**: Select Next.js framework
- **Docker**: Create a Docker image with Node.js runtime
- **Traditional Hosting**: Use `npm start` to run the production server

### Environment Variables

Create a `.env.local` file (not committed to git):

```env
# Google Site Verification (update in layout.tsx metadata)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=918467042523

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

---

## ⚙️ Environment Configuration

### Next.js Configuration (`next.config.ts`)

- Image optimization enabled
- Compression enabled
- TypeScript and ESLint checking integrated

### TypeScript Configuration (`tsconfig.json`)

- Strict mode enabled for type safety
- Path aliases for cleaner imports
- JSX configured for React 19

### Tailwind Configuration (via PostCSS)

- Responsive breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px
- Dark mode support (if needed)
- Custom font variables
- Hover and focus states

### PostCSS Configuration

- Tailwind CSS v4 support
- Nested CSS support
- Autoprefixer for browser compatibility

---

## 🎨 Key Components

### Navbar (`src/components/navbar/Navbar.tsx`)

- Sticky positioning on scroll
- Responsive mobile menu
- Logo and navigation links
- Smooth transitions

### Hero Section (`src/components/hero_section/HeroSection.tsx`)

- Full-screen landing area
- Background video/image
- Call-to-action buttons
- Animated text elements

### About Us Section (`src/components/sections/aboutus/AboutUsSection.tsx`)

- Grid layout with two images
- Company mission text
- Call-to-action button
- Responsive image sizing:
  - Left: Portrait image (4:5 aspect ratio)
  - Right: Landscape image (55% max-width on tablets)

### Academy Section (`src/components/sections/academy/AcademySection.tsx`)

- City cards with images
- Location information
- Direct links to city pages
- Hover effects and transitions

### Testimonials Carousel (`src/components/TestimonialsCarousel.tsx`)

- Auto-rotating testimonials
- Manual navigation arrows
- Smooth animations with GSAP
- Responsive design

### Footer (`src/components/sections/footer/Footer.tsx`)

- Company information
- Quick links
- Social media icons
- Contact information
- Copyright notice

### Social Icons (`src/components/shared/SocialIcons.tsx`)

- Instagram, LinkedIn, Facebook links
- Consistent styling
- Reusable across pages

### WhatsApp Button (in `layout.tsx`)

- Fixed floating button
- Always visible on mobile and desktop
- Green WhatsApp theme color (#25D366)
- Hover animations with scale and shadow effects
- Responsive sizing:
  - Mobile: w-11 h-11
  - Tablet: w-13 h-13
  - Desktop: w-14 h-14
  - Large screens: w-16 h-16
- Direct link to WhatsApp chat: `wa.me/918467042523`

---

## 🔍 SEO & Metadata

### Open Graph Configuration

**File:** `src/app/layout.tsx`

Metadata includes:

- **Title** (60 chars): "Throttle Connectors - Learn High-Performance Driving & Business Skills"
- **Description** (155 chars): "Master the art of high-performance driving with Throttle Connectors. Expert training programs in Ahmedabad, Bangalore, Coimbatore, and Hyderabad."
- **Keywords**: high-performance driving, performance training, driving academy, business skills, professional courses
- **Image**: 1200×630px for social media preview (og-image.png)
- **Locale**: en_IN (for India-based content)
- **URL**: https://throttleconnectors.in (canonical)

### JSON-LD Structured Data

Two schemas implemented for rich search results:

#### 1. Organization Schema

```json
{
  "@type": "Organization",
  "name": "Throttle Connectors",
  "url": "https://throttleconnectors.in",
  "logo": "https://throttleconnectors.in/assets/throttle.png",
  "sameAs": [
    "https://www.facebook.com/throttleconnectors",
    "https://www.instagram.com/throttleconnectors",
    "https://www.linkedin.com/company/throttleconnectors"
  ],
  "contactPoint": {
    "telephone": "+91-8467-042-523"
  },
  "areaServed": ["Ahmedabad", "Bangalore", "Coimbatore", "Hyderabad"]
}
```

#### 2. EducationalOrganization Schema

```json
{
  "@type": "EducationalOrganization",
  "name": "Throttle Connectors",
  "description": "Professional training academy for high-performance driving and business skills",
  "address": [
    { "addressLocality": "Ahmedabad", "addressRegion": "Gujarat" },
    { "addressLocality": "Bangalore", "addressRegion": "Karnataka" },
    { "addressLocality": "Coimbatore", "addressRegion": "Tamil Nadu" },
    { "addressLocality": "Hyderabad", "addressRegion": "Telangana" }
  ]
}
```

### Twitter Card Configuration

- Card Type: `summary_large_image`
- Includes title, description, and image
- Max dimensions: 1200×630px

### Robots.txt

**File:** `public/robots.txt`

Configuration:

- **Allow**: All paths accessible to crawlers
- **Disallow**: Admin paths
- **Sitemap**: https://throttleconnectors.in/sitemap.xml
- **Crawl Delay**: Googlebot (0ms), Bingbot (1s)

### Sitemap

**File:** `public/sitemap.xml`

Includes 6 main URLs:

1. Home (priority: 1.0)
2. Academy Hub (priority: 0.9)
3. Ahmedabad Academy (priority: 0.8)
4. Bangalore Academy (priority: 0.8)
5. Coimbatore Academy (priority: 0.8)
6. Hyderabad Academy (priority: 0.8)

### Google Search Console Integration

- Verify ownership via meta tag in `metadata.verification.google`
- Submit sitemap for faster indexing
- Monitor search performance and fix issues

---

## 📱 Responsive Design

### Breakpoints & Grid System

The design follows Tailwind CSS breakpoints for perfect responsiveness:

| Breakpoint | Size    | Device              |
| ---------- | ------- | ------------------- |
| Default    | 0-639px | Mobile phones       |
| `sm`       | 640px+  | Small tablets       |
| `md`       | 768px+  | Tablets (iPad)      |
| `lg`       | 1024px+ | Laptops & desktops  |
| `xl`       | 1280px+ | Large desktops      |
| `2xl`      | 1536px+ | Ultra-wide monitors |

### Key Responsive Elements

#### About Us Section

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px+)**: Two-column grid (32% left image, 68% right content)
- **Desktop (1024px+)**: Larger gaps and spacing

#### Hero Section

- **Mobile**: Full-width, adjusted padding
- **Tablet**: Larger text, optimized spacing
- **Desktop**: Maximum widths, centered content

#### WhatsApp Button

- **Mobile**: Small (w-11 h-11), bottom: 80px
- **Tablet**: Medium (w-13 h-13), bottom: 80px
- **Desktop**: Large (w-14 h-14 → w-16 h-16), bottom: 24px

#### Navigation

- **Mobile < 640px**: Hamburger menu with slide-in navigation
- **Tablet+**: Full horizontal navigation bar
- **Sticky**: Always visible on scroll with smooth transitions

### Image Sizing

- **Hero Images**: 100% width, intrinsic aspect ratio maintained
- **About Us Left Image**: `aspect-[4/5]` (portrait)
- **About Us Right Image**: `sm:max-w-[55%]` (responsive max-width)
- **Academy Cards**: Fixed aspect ratio with object-fit
- **Testimonials**: Circle images with responsive sizing

---

## 🔐 Security Best Practices

### Implemented Security Measures

1. **Content Security Policy**: Defined in Next.js headers
2. **HTTPS Enforced**: All links use https://throttleconnectors.in
3. **External Links**: `target="_blank"` links use `rel="noopener noreferrer"`
4. **Input Validation**: TypeScript type safety prevents invalid data
5. **Image Optimization**: Next.js Image component prevents image-based attacks

### Environment Variables

- Never commit `.env.local` to Git
- Use `.env.example` for documentation
- Google verification codes stored in environment

---

## 🤝 Contributing

### Code Style

- **TypeScript**: Strict mode enabled, prefer explicit types
- **React**: Functional components with hooks
- **Tailwind**: Use utility classes, avoid custom CSS when possible
- **File Names**: Use PascalCase for components, kebab-case for utilities

### Adding New Features

1. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**:
   - Follow component structure in `src/components/`
   - Keep components smaller and focused
   - Use Tailwind utilities for styling

3. **Test Locally**:

   ```bash
   bun dev
   ```

4. **Lint & Build**:

   ```bash
   bun lint
   bun run build
   ```

5. **Commit & Push**:

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request** on GitHub

### Common Modifications

**Changing Colors**:

- Update Tailwind utility classes in components
- Use existing color palette: black, white, gray, green (#25D366)

**Adding a New Academy Location**:

1. Create new folder in `src/app/academy/newcity/`
2. Add `page.tsx` with location-specific content
3. Add images to `public/assets/newcity*.jpeg`
4. Update Academy Hub page with new location card
5. Add JSON-LD schema entry for new address

**Updating Contact Information**:

- Edit phone number in `layout.tsx` (WhatsApp button link)
- Update phone in JSON-LD schemas in `layout.tsx`
- Update in Footer component

---

## 🐛 Troubleshooting

### Build Issues

**Error: "Cannot find module"**

- Clear node_modules and reinstall: `rm -rf node_modules && bun install`
- Clear Next.js cache: `rm -rf .next && bun run build`

**Error: "Port 3000 already in use"**

```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>
```

**TypeScript errors in development**

- Errors are logged but don't block the dev server
- Check terminal output or VS Code problems panel
- Run `npx tsc --noEmit` for full type check

### Runtime Issues

**Images not loading**

- Check file path in `public/assets/`
- Ensure Next.js Image component is used
- Check browser console for 404 errors

**Styling not applying**

- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild: `bun run build`
- Check Tailwind class names are spelled correctly

**WhatsApp button not visible**

- Check z-index (should be 100)
- Verify CSS classes for positioning
- Check mobile viewport in DevTools

### Performance Issues

**Slow page load**

- Use Next.js DevTools to identify slow components
- Check Lighthouse score: https://web.dev/measure/
- Optimize image sizes: convert to WebP format

**High bundle size**

- Analyze with: `npm analyze`
- Lazy-load components with dynamic imports
- Remove unused dependencies

---

## 📚 Additional Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Schema.org Documentation](https://schema.org)

### Learning Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev by Google](https://web.dev)
- [CSS-Tricks](https://css-tricks.com)

### Tools & Services

- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

---

## 📞 Contact & Support

**Company:** Throttle Connectors  
**Website:** https://throttleconnectors.in  
**WhatsApp:** +91-8467-042-523  
**Instagram:** [@throttleconnectors](https://www.instagram.com/throttleconnectors)  
**LinkedIn:** [Throttle Connectors](https://www.linkedin.com/company/throttleconnectors)  
**Facebook:** [Throttle Connectors](https://www.facebook.com/throttleconnectors)

### Support Channels

- **Technical Issues**: Create an issue on GitHub
- **Feature Requests**: Discuss in GitHub discussions
- **Business Inquiries**: Contact via WhatsApp
- **General Questions**: Email or contact form

---

## 📄 License

This project is private and proprietary. All rights reserved © 2024 Throttle Connectors.

---

## 🗺️ Roadmap

### Version 2.0 (Q2 2026)

- [ ] Student registration form with email verification
- [ ] Online course catalog and enrollment system
- [ ] Student dashboard for tracking progress
- [ ] Live chat support integration
- [ ] Blog section for articles and tips
- [ ] Advanced analytics dashboard

### Version 2.5 (Q4 2026)

- [ ] Mobile app (iOS/Android)
- [ ] Video course content platform
- [ ] Community forum
- [ ] In-app notifications
- [ ] Multi-language support (Hindi, Tamil, Telugu, Kannada)

### Version 3.0 (2027)

- [ ] AI-powered course recommendations
- [ ] Virtual instructor sessions
- [ ] Certification issuance system
- [ ] Payment gateway integration
- [ ] Advanced SEO with AI content generation

---

## ✅ Verification Checklist

Before deploying to production, ensure:

- [ ] All pages load without errors
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] WhatsApp link opens correctly on mobile
- [ ] Images load quickly and display correctly
- [ ] SEO metadata renders in social media previews
- [ ] Google Search Console is set up and verified
- [ ] Analytics tracking is configured
- [ ] 404 pages are handled gracefully
- [ ] Performance score is 80+
- [ ] Accessibility standards are met (WCAG 2.1)

---

## 🙏 Acknowledgments

- **Next.js Team** for the excellent framework
- **Vercel** for deployment and optimization services
- **Google Fonts** for beautiful typography
- **Tailwind Labs** for the utility-first CSS framework
- **GSAP** for smooth animations
- **All Contributors** who have helped improve this project

---

**Last Updated:** February 2026  
**Maintained By:** Throttle Connectors Team  
**Status:** Active Development

---

**Happy Coding! 🚗💨**
