# STUDIO | Creative Design Agency Portfolio

A premium, responsive portfolio website for a creative design agency built with Next.js 16 and Sanity CMS.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f)

## ✨ Features

- **Responsive Design** - Mobile-first with Tailwind CSS breakpoints
- **GPU-Optimized Animations** - Smooth 60fps with Framer Motion
- **Dark/Light Mode** - Full theme support via Next Themes
- **Sanity CMS** - Headless CMS for projects, testimonials, and settings
- **Dynamic Images** - Natural proportions from Sanity CDN
- **Accessibility** - Respects `prefers-reduced-motion`

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion v12 |
| UI Components | Shadcn UI, Radix UI |
| Icons | Lucide React |
| CMS | Sanity.io |
| Theming | Next Themes |
| Fonts | Inter, Playfair Display, Cormorant Garamond |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Main site routes
│   │   ├── page.tsx       # Home
│   │   ├── about/         # About/Info
│   │   ├── projects/      # Work portfolio
│   │   ├── contact/       # Contact form
│   │   └── approach/      # Process methodology
│   ├── globals.css        # Tailwind + custom styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable components
├── lib/                   # Sanity client, utilities
├── hooks/                 # useMediaQuery, etc.
└── sanity/                # Sanity schema types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Lydell2627/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Sanity project ID and dataset
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Sanity Studio

```bash
cd sanity
npm run dev
```

Open [http://localhost:3333](http://localhost:3333)

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured projects, testimonials, philosophy |
| Work | `/projects` | Filterable project grid |
| Project | `/projects/[slug]` | Individual case studies |
| Info | `/about` | Stats, principles, skills |
| Approach | `/approach` | Design process methodology |
| Contact | `/contact` | Form with validation |

## 🎨 Design System

- **Colors**: Neutral palette with accent gradients
- **Typography**: Clamp-based fluid sizing
- **Spacing**: Consistent padding/margins with Tailwind
- **Animations**: Linear easing with GPU hints for performance

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1440px
- **Wide**: 1440px+

## 🔧 Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📦 Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 📝 License

MIT
