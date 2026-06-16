# 🚀 Developer Portfolio — SaaS-Grade Dynamic Portfolio

A **fully dynamic, admin-controlled developer portfolio** built with React 19, Vite, Tailwind CSS v4, and Framer Motion. Every section of the portfolio — from your name and skills to projects and certifications — is editable live through a built-in **Admin Console**, with changes persisted via `db.json` and `localStorage`.

---

## ✨ Features

### Portfolio (Public)
- **8 fully dynamic sections** — Home, About, Services, Skills, Projects, Certifications, Journey, Contact
- **Live theme system** — primary accent color applied across all UI elements (buttons, glows, tags, borders) via CSS variables
- **Dark / Light mode** — toggle between themes; user preference persisted
- **Dynamic favicon** — auto-generated from primary color and developer's initials
- **Animated sidebar navigation** — scrolls to active section; respects admin-controlled section visibility
- **Smooth Framer Motion animations** — fade-ins, staggered lists, parallax effects
- **Fully responsive** — mobile-first layout with adaptive grids and typography
- **SEO-ready** — configurable page titles, meta descriptions per page

### Admin Console (`/admin`)
- **11-tab configuration panel** — Dashboard, Theme & Colors, Home, About, Services, Skills, Projects, Certifications, Journey, Contact, SEO & Metadata
- **Live color preview** — pick any hex color or choose from preset swatches; applied to the DOM instantly
- **Section visibility controls** — show/hide any section globally from the Dashboard or per-tab banner
- **Custom section titles** — rename each portfolio section heading
- **Code-split lazy loading** — each admin tab loads on demand for optimal performance

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animations | Framer Motion 12 |
| Routing | React Router DOM v7 |
| Icons | React Icons v5 |
| 3D / Canvas | OGL |
| Deployment | Vercel / GitHub Pages |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── db.json              # ← Persistent config (commit this after admin saves)
│   ├── resume.pdf
│   └── favicon.svg
├── src/
│   ├── App.jsx              # Root: loads db.json + localStorage, provides state
│   ├── Admin.jsx            # Admin console controller (state + handlers)
│   ├── Portfolio.jsx        # Portfolio page assembler
│   ├── sections/            # Public-facing portfolio sections
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Certification.jsx
│   │   ├── Journey.jsx
│   │   └── Contact.jsx
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminCommon.jsx        # Shared admin UI (FormField, TabCardWrapper)
│   │   │   └── tabs/                  # Lazy-loaded admin tab components
│   │   │       ├── DashboardTab.jsx
│   │   │       ├── ThemeTab.jsx
│   │   │       ├── HomeTab.jsx
│   │   │       ├── AboutTab.jsx
│   │   │       ├── ServicesTab.jsx
│   │   │       ├── SkillsTab.jsx
│   │   │       ├── ProjectsTab.jsx
│   │   │       ├── CertificationsTab.jsx
│   │   │       ├── JourneyTab.jsx
│   │   │       ├── ContactTab.jsx
│   │   │       └── SeoTab.jsx
│   │   ├── Sidebar/
│   │   ├── Projects/
│   │   └── Certification/
│   ├── constants/           # Default data (about, projects, skills, etc.)
│   ├── common/              # Shared UI (Particles, DecryptedText, PageLoader, etc.)
│   ├── layout/              # SectionLayout wrapper
│   ├── utils/               # color.js, svg.js helpers
│   └── index.css            # Global CSS, design tokens, theme variables
├── vite.config.js           # Vite config + dev-only theme API middleware
├── vercel.json              # SPA catch-all rewrite rule
└── db.json                  # Source-of-truth config (synced with public/db.json)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/ganapathy214/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`. The Vite dev server includes a custom middleware that serves and writes `db.json` at `/api/theme`.

- **Portfolio**: `http://localhost:5173/portfolio`
- **Admin Console**: `http://localhost:5173/portfolio/admin`

---

## ⚙️ Admin Console

Navigate to `/admin` on your deployed site or `http://localhost:5173/portfolio/admin` in dev.

### Admin Tabs

| Tab | What you can configure |
|---|---|
| **Dashboard** | Stats overview, section visibility toggles, quick shortcuts |
| **Theme & Colors** | Primary accent color (hex / picker / swatches), Dark/Light mode |
| **Home** | Hero name, professional roles, description, center SVG, orbiting stack badges |
| **About** | Bio, avatar, stats, highlights, professional titles, social links, resume |
| **Services** | Service cards (title, description, icon), order management |
| **Skills** | Skill library, categories, bullet points per category |
| **Projects** | Project cards (synopsis, stack, responsibilities, images), order management |
| **Certifications** | Certification cards (title, issuer, PDF, image), order management |
| **Journey** | Timeline entries (title, org, duration, location) |
| **Contact** | Email, phone, location, social links |
| **SEO & Metadata** | Page titles and meta descriptions per page |

---

## 💾 Save & Deploy Workflow

### In Development (`npm run dev`)
1. Make changes in the Admin Console
2. Click **Save Settings**
3. Changes write to `db.json` via Vite middleware
4. Both `db.json` (project root) and `public/db.json` are updated automatically
5. Toast: ✅ *"Configuration saved to db.json successfully!"*

### In Production (Vercel / GitHub Pages)
Static hosts cannot write files, so the admin uses a **download-and-commit** workflow:

1. Visit `your-site.com/admin`
2. Make your changes across any tabs
3. Click **Save Settings**
4. A `db.json` file is **automatically downloaded** to your computer
5. Toast: 💜 *"db.json downloaded! Commit it to `public/db.json` and redeploy."*
6. Commit and push:

```bash
# Move downloaded db.json to your project
cp ~/Downloads/db.json public/db.json

git add public/db.json
git commit -m "update portfolio config"
git push
```

7. Vercel auto-deploys → all visitors see your updated portfolio

> **Note:** Changes in the admin immediately update your own browser session via `localStorage`, so you can preview before committing.

---

## 🌐 Deployment

### Vercel (Recommended)

The project is pre-configured for Vercel with `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

1. Push your code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no extra config needed
4. Set environment variable `VERCEL=true` (auto-set by Vercel) — the `base` path becomes `/`

### GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then publishes `dist/` to the `gh-pages` branch. The base path is `/portfolio` when not on Vercel.

---

## 🎨 Theming

The primary accent color is applied globally through CSS variables:

```css
:root {
  --primary: #00D5D5;
  --primary-rgb: 0, 213, 213;
  --primary-contrast: #000000; /* auto-calculated for button text */
}
```

To change the accent color globally in CSS:

```css
:root {
  --primary: #a855f7; /* Purple Neon */
}
```

Or use the Admin Console — **Theme & Colors** tab for live preview and save.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR + API middleware |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build + publish to GitHub Pages (`gh-pages` branch) |

---

## 🔧 Configuration

### Default Content
All default portfolio data lives in `src/constants/`. Edit these files to set the initial data before any admin saves:

- `src/constants/about.jsx` — Default about info
- `src/constants/index.js` — Projects, certifications, skills, timeline, contact, etc.

### Data Priority (on page load)
1. `localStorage` (instant, no flash)
2. `db.json` fetched from server (authoritative, overwrites localStorage)
3. Constants defaults (fallback if both above are absent)

---

## 📄 License

MIT — feel free to fork and make it your own.

---

<div align="center">
  <strong>Built with ❤️ using React 19 + Vite + Tailwind CSS v4</strong><br/>
  <a href="https://ganapathy214.github.io/portfolio/">Live Demo</a>
</div>
