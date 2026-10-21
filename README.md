# LuxeStudio — Website Development Agency & Creative Technology Studio

[![AWS Amplify](https://img.shields.io/badge/AWS-Amplify_Hosting-FF9900?style=for-the-badge&logo=aws-amplify&logoColor=white)](https://aws.amazon.com/amplify/)
[![Deployment Status](https://img.shields.io/badge/Status-Live_Production-00C853?style=for-the-badge)](https://theluxestudio.in)
[![Performance](https://img.shields.io/badge/Lighthouse-95%2B_Performance-blue?style=for-the-badge&logo=lighthouse&logoColor=white)](https://theluxestudio.in)
[![Architecture](https://img.shields.io/badge/Stack-Vanilla_ES6%2B_|_CSS3_|_HTML5-informational?style=for-the-badge)](https://theluxestudio.in)

> **Websites, digital systems, and automation for businesses that refuse to look ordinary.**

[LuxeStudio](https://theluxestudio.in) is an elite creative technology and website development agency crafting bespoke, high-performance web applications, digital systems, and intelligent workflow automation for ambitious brands, enterprises, and creators worldwide.

---

## 🌟 Table of Contents

- [Overview](#-overview)
- [Key Features & Capabilities](#-key-features--capabilities)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure & Routes](#-project-structure--routes)
- [Deployment & CI/CD](#-deployment--cicd)
- [Local Development](#-local-development)
- [Selected Portfolio](#-selected-portfolio)
- [Contact & Inquiries](#-contact--inquiries)

---

## 💎 Overview

LuxeStudio blends editorial art direction with systems-level engineering. Every digital product is hand-crafted from first principles with zero framework bloat, sub-second render speeds, and fluid typography.

- **Official Website**: [https://theluxestudio.in](https://theluxestudio.in)
- **Live AWS Amplify URL**: [https://luxestudio.live](https://luxestudio.live)
- **HQ**: Mumbai, Maharashtra, India
- **Global Reach**: USA, UK, UAE, Europe, Canada, Australia, India

---

## 🚀 Key Features & Capabilities

- **⚡ Sub-Second Page Loads**: Hand-crafted, zero-runtime overhead architecture achieving 95+ Google Lighthouse scores across Desktop and Mobile.
- **🎨 Fluid Editorial Typography**: Dynamic scaling using modern CSS clamp and custom typeface styling.
- **✨ Custom Micro-Interactions**: Smooth 60fps animations, interactive magnetic cursor effects, and subtle scroll-triggered reveals (`js/motion.js`, `js/cursor.js`).
- **📱 International Contact System**: Form with dynamic international country-code picker and WhatsApp/Email routing (`contact.html`).
- **🛡️ Enterprise Security**: Pre-configured HTTP security headers including strict Content Security Policy directives, `X-Frame-Options`, `X-Content-Type-Options`, and `Permissions-Policy`.
- **🤖 Generative Engine Optimization (GEO)**: Native AI search engine indexing support with standard `llms.txt`, `llms-full.txt`, and deep Schema.org JSON-LD knowledge graph integration.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend Core** | Semantic HTML5, Modern CSS3 (Variables, Grid, Flexbox), Vanilla JavaScript (ES6+ Modules) |
| **Animation & UX** | Custom Vanilla Motion Engine (`js/motion.js`), Hardware-Accelerated Transforms |
| **Hosting & Cloud** | AWS Amplify Hosting (Continuous Deployment via Git) |
| **SEO & Discovery** | Comprehensive JSON-LD Schema.org Graph, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt`, `llms.txt` |
| **Security** | Root-relative resource resolution, custom error routing (`400`, `403`, `404`, `500`, `503`), strict HTTP headers |

---

## 📂 Project Structure & Routes

```text
luxe/
├── index.html                 # Flagship homepage & agency showcase
├── services.html              # Core capabilities & client service offerings
├── work.html                  # Portfolio showcase & project index
├── case-studies.html          # Deep-dive client case studies and metrics
├── studio.html                # Agency ethos, philosophy, and team
├── contact.html               # Project inquiry form with international dialing
├── thank-you.html             # Inquiry confirmation & next steps
├── faq.html                   # Frequently asked questions
│
├── 400.html                   # Custom 400 Bad Request page
├── 403.html                   # Custom 403 Forbidden page
├── 404.html                   # Custom 404 Not Found page
├── 500.html                   # Custom 500 Internal Server Error page
├── 503.html                   # Custom 503 Service Unavailable page
│
├── accessibility.html         # Accessibility statement (WCAG 2.1 AA)
├── cookies.html               # Cookie policy
├── privacy.html               # Privacy policy
├── terms.html                 # Terms of service
│
├── amplify.yml                # AWS Amplify CI/CD build & hosting configuration
├── sitemap.xml                # Search engine sitemap
├── robots.txt                 # Multi-engine crawler guidelines
├── llms.txt                   # LLM context brief for AI search engines
├── llms-full.txt              # Complete studio AI knowledge base
│
├── css/
│   ├── main.css               # Core design tokens, typography, utilities & components
│   ├── routes.css             # Page-specific styling for sub-routes & forms
│   └── animations.css         # Keyframe animations & motion transitions
│
├── js/
│   ├── app.js                 # Global navigation, mobile drawer & theme control
│   ├── motion.js              # Scroll reveals, intersection observers & parallax
│   ├── cursor.js              # Custom interactive cursor dynamics
│   └── hero-typography.js     # Fluid hero typography interactions
│
└── assets/                    # Optimized photography, brand marks, and iconography
```

---

## ☁️ Deployment & CI/CD

The application is deployed on **AWS Amplify Hosting** via GitHub.

### Build Specification (`amplify.yml`)

```yaml
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: .
    files:
      - '**/*'
  cache:
    paths: []
  customHeaders:
    - pattern: '**/*'
      headers:
        - key: 'X-Frame-Options'
          value: 'SAMEORIGIN'
        - key: 'X-Content-Type-Options'
          value: 'nosniff'
        - key: 'Referrer-Policy'
          value: 'strict-origin-when-cross-origin'
        - key: 'Permissions-Policy'
          value: 'camera=(), microphone=(), geolocation=()'
```

### AWS CLI Management

Trigger a release build directly via the AWS CLI:

```powershell
aws amplify start-job --app-id d3vfv0lmzc7nf9 --branch-name master --job-type RELEASE --no-cli-pager
```

Check the latest job status:

```powershell
aws amplify get-job --app-id d3vfv0lmzc7nf9 --branch-name master --job-id <JOB_ID> --query "job.summary" --no-cli-pager
```

---

## 💻 Local Development

No build tools or bundlers required. Run with any local development server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🏆 Selected Portfolio

| Client / Brand | Domain / Discipline |
|---|---|
| **Auri Concept** | [auriconcept.com](https://www.auriconcept.com/) — Architectural Design Studio |
| **Virats BuildTech** | Enterprise Construction & Infrastructure Platform |
| **Cory Ryan Photography** | [coryryan.theluxestudio.in](https://coryryan.theluxestudio.in/) — Editorial Photography Portfolio |
| **Luxxe Labels** | [luxelabels.co.in](https://www.luxelabels.co.in/) — Luxury Fashion & Designer Apparel Platform |
| **Vedant Hospital** | Healthcare & Medical Speciality Portal |
| **Power Gold Gym** | Fitness & Athletic Training Platform |
| **Gravity Private Tutorials** | [gravityprivatetutorials.com](https://www.gravityprivatetutorials.com/) — Academic Coaching Institute |
| **Gurukul Study Center** | [gurukulstudycenter.in](https://gurukulstudycenter.in/) — Educational Learning Center |
| **Yogi's Yoga** | [yogisyoga.in](https://www.yogisyoga.in/) — Wellness & Mindfulness Studio |
| **R3 Studio** | Spatial Architecture & Interior Design Studio |

---

## 📬 Contact & Inquiries

- **Direct Inquiries**: [hello@theluxestudio.in](mailto:hello@theluxestudio.in)
- **WhatsApp (India & Global)**: [+91 99870 31290](https://wa.me/919987031290)
- **Direct / WhatsApp (Australia)**: [+61 0422 974 003](https://wa.me/61422974003)
- **GitHub**: [github.com/luxestudio-live](https://github.com/luxestudio-live)
- **Live Studio**: [https://theluxestudio.in](https://theluxestudio.in)

---

&copy; LuxeStudio Creative Technology. All rights reserved.
