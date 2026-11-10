# Eswaran — Personal Portfolio & Resume Website

A modern, high-performance, and responsive personal portfolio and resume website built with **Next.js (App Router)**, **Tailwind CSS**, and **TypeScript / JavaScript**.

Designed with a sleek **dark-themed glassmorphism aesthetic** (deep charcoal background `#07090e`, translucent frosted cards with backdrop blur, and glowing neon blue `#00f0ff` & violet `#8b5cf6` accents).

---

## 🚀 Key Features & Sections

1. **Header & Navigation (`Navbar.tsx`)**:
   - Translucent glassmorphism navbar with backdrop blur (`backdrop-blur-xl`).
   - Active section tracking on scroll.
   - Quick resume view/download button & "Let's Connect" CTA.
   - Fully responsive mobile drawer menu.

2. **Hero Section (`Hero.tsx`)**:
   - Status badge: *"Available for Full-Stack & Infrastructure Engineering"*.
   - Professional greeting & bold typography.
   - Engaging headline: *"System Engineer & Full-Stack Developer"*.
   - Impactful bio bridging Linux systems, networks, and modern web/mobile apps.
   - Call-to-action buttons: **"View Projects"**, **"Download Resume"**, and **"Contact Me"**.
   - Interactive glassmorphic Linux CLI / neofetch terminal inspection card.
   - Quick stats metric strip (5+ Years, 99.9% Uptime, 25+ Shipped Projects).

3. **About Me & Skills Section (`AboutSkills.tsx`)**:
   - 4 Core Domain Pillars:
     - **System Administration** (Linux Ubuntu/RHEL/Debian, Docker, Bash, CI/CD, Nginx, Prometheus)
     - **Networking** (TCP/IP, WireGuard VPN, pfSense, VLANs, Wireshark, High Availability)
     - **Web Development** (Next.js 15 App Router, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL)
     - **Android Development** (Kotlin, Java, Jetpack Compose, Room DB, MVVM, Material 3)
   - Interactive category switcher with animated proficiency meters and highlight tags.

4. **Experience & Career Timeline (`ExperienceTimeline.tsx`)**:
   - Vertical timeline layout with glowing neon connection line and pulsing nodes.
   - Role, company, location, employment type, key achievements, and tech stack tags.

5. **Projects Showcase (`Projects.tsx`)**:
   - Grid cards for featured projects with category filtering (*All, Systems & Cloud, Web Apps, Mobile, Security*).
   - Metrics badges (e.g. *"< 15ms Telemetry Latency"*, *"60 FPS Fluid"*).
   - Direct GitHub repository and live demo action buttons.

6. **Resume Showcase & Download (`ResumeSection.tsx`)**:
   - Interactive curriculum vitae preview with education & certifications.
   - Instant one-click **Download Resume (TXT)** button.
   - Print view support.

7. **Contact Section (`Contact.tsx`)**:
   - One-click copy email button with feedback indicator.
   - Social links (GitHub, LinkedIn, Twitter/X).
   - Glassmorphic contact form UI with field validation, sending animation, and instant success banner.

8. **Footer (`Footer.tsx`)**:
   - Clean credits, navigation anchors, social links, and smooth scroll to top.

---

## 🛠️ Project Structure

```text
eswaran-resume-website/
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind styles & glassmorphic classes
│   │   ├── layout.tsx          # Root layout & SEO metadata
│   │   └── page.tsx            # Main single-page portfolio layout
│   ├── components/
│   │   ├── AboutSkills.tsx     # 4 Core technical pillars & interactive skill meters
│   │   ├── Contact.tsx         # Contact form & social media links
│   │   ├── ExperienceTimeline.tsx # Vertical career timeline
│   │   ├── Footer.tsx          # Footer with back-to-top & links
│   │   ├── Hero.tsx            # Hero greeting, bio, CTAs & terminal UI
│   │   ├── Icons.tsx           # High-precision SVG icons (GitHub, LinkedIn, Twitter)
│   │   ├── Navbar.tsx          # Glassmorphic header & mobile navigation
│   │   ├── Projects.tsx        # Project showcase grid & category filters
│   │   └── ResumeSection.tsx   # Resume viewer & download handler
│   └── data/
│       └── portfolioData.ts    # Centralized data store (customize your content here)
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Custom dark glassmorphism theme & neon glows
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Customize Your Information

All personal details, skills, experiences, and projects are centralized in:
📂 `src/data/portfolioData.ts`

Simply edit the fields in that file to update your bio, social profiles, email address, projects, and work experience!
