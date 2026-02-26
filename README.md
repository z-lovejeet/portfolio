# Lovejeet Singh - Full-Stack Developer Portfolio

A highly interactive, 3D-accelerated personal portfolio designed to showcase Full-Stack Engineering, UI/UX design, and Machine Learning expertise. Built with modern web technologies focusing on performance, smooth animations, and a dark-luxury brutalist aesthetic.

## 🚀 Live Demo & Screenshots

*(This section is reserved for the Live Deployed URL once hosted on Vercel).*

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Rendering:** Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Animations:** Framer Motion & GSAP
- **Email Backend:** Resend SDK

## ✨ Key Features

- **Immersive 3D Experience**: Integrated custom WebGL canvas for interactive glassmorphism backgrounds and custom 3D geometries in the Projects showcase.
- **Scroll-Linked Animations**: Utilizes GSAP and Framer Motion to map DOM scrolling to timeline animations and text reveals seamlessly.
- **Dynamic Contact Form**: A fully functional, production-ready contact system integrated with Resend, delivering messages directly to a private inbox rather than basic `mailto:` links.
- **Performance Optimized**: Built using Next.js `Image` components, dynamic scene loading for 3D elements, and clean architecture ensuring 60fps WebGL execution without blocking the main DOM thread.
- **Responsive Design**: Flawless translation of the dark-glass theme across ultra-wide monitors, standard laptops, and mobile viewports.

## 📂 Project Structure

```
├── public/                 # Static assets (images, 3D models)
├── src/
│   ├── app/                # Next.js App Router (Pages & API Routes)
│   │   ├── api/contact/    # Resend Email Backend logic
│   │   ├── layout.tsx      # Global UI wrap and font definitions
│   │   └── page.tsx        # Main portfolio composition
│   ├── components/         
│   │   ├── animations/     # Framer Motion components (ScrollReveal, TextReveal)
│   │   ├── sections/       # Primary DOM sections (Hero, About, Projects, etc.)
│   │   └── webgl/          # Three.js (R3F) Canvas components and scenes
│   └── lib/                # Shared utilities
```

## ⚙️ Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/z-lovejeet/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Resend API Key for the contact form:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   *Your site will be available at [http://localhost:3000](http://localhost:3000)*

## 📦 Deployment (Vercel)

This repository is optimized for **Vercel**.
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add `RESEND_API_KEY` to your Vercel Environment Variables.
4. Deploy! Next.js will automatically build and distribute the site globally.

---
*Designed & Engineered by [Lovejeet Singh](https://github.com/z-lovejeet).*
