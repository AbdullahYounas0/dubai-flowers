# Daffofils Flowers Shop - Premium Dubai Florist

This repository contains the frontend codebase for Daffofils Flowers Shop, a premium flower shop in Dubai that specializes in importing and selling Scottish and Colombian flowers.

## Project Overview

The website is built using the following technology stack:

- React 18 with TypeScript
- Vite build system
- Tailwind CSS with custom design system
- React Three Fiber & Drei for 3D graphics
- Three.js for 3D rendering
- React Router DOM for navigation
- Framer Motion for animations
- Radix UI components for accessibility

## Features

- Modern, elegant design with 3D flower displays
- Responsive layout for all device sizes
- Interactive 3D flower gallery with orbit controls
- Custom animations and transitions
- SEO optimization with structured data
- Performance optimized rendering

## Pages

1. **Homepage (/)** - Features a hero section, 3D flower separator, highlights section, countries gallery, and contact form
2. **3D Flowers Gallery (/flowers)** - Interactive 3D flower display with tabs for Scottish vs Colombian flowers
3. **404 Page** - Custom error page for non-existent routes

## 3D Components

The project features several custom 3D components:

1. **RealisticFlower** - Creates detailed 3D flowers with customizable petals, colors, and animations
2. **FlowerText** - Renders text using arrays of small flowers positioned to form letters
3. **FloatingParticles** - Creates ambient particle effects for pollen/sparkle

## Project Structure

```
src/
  App.tsx              # Main application component with routing
  index.css            # Global styles and Tailwind directives
  main.tsx             # Application entry point
  assets/              # Static assets like images and fonts
    images/            # Image resources
  components/          # Reusable UI components
    3d/                # 3D components using Three.js
    layout/            # Layout components (Header, Footer)
    sections/          # Page sections
    ui/                # UI components
  hooks/               # Custom React hooks
  pages/               # Route components
  utils/               # Helper functions and utilities
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

To build the project for production, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Next Steps

### Content Integration
1. Replace placeholder images with actual high-quality flower photographs
2. Add real product catalog data
3. Implement product detail pages

### Functionality
1. Add e-commerce capabilities (shopping cart, checkout)
2. Implement user accounts and authentication
3. Create an admin dashboard for content management

### Performance
1. Implement code splitting for improved loading times
2. Optimize 3D models and textures
3. Add progressive image loading

### SEO & Marketing
1. Enhance structured data for rich snippets
2. Implement social sharing features
3. Create a blog section for content marketing

## License

All rights reserved. This code is the property of Daffofils Flowers Shop.
```
