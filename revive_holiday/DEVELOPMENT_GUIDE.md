# Revive Holidays — Development Guide

_Website: React (frontend) + FastAPI (backend)_

This guide turns the approved content plan into a concrete build plan: tech stack, folder structure, page/component breakdown, API contract, and a phased implementation order.

---

## 1. Tech Stack

**Frontend**
- React 18+ with Vite (fast dev server, simpler than CRA)
- React Router v6 (multi-page site: Home, About, Destinations, Corporate, Visa, Contact)
- TailwindCSS (fast to theme, matches a travel-brand aesthetic without writing much custom CSS)
- Framer Motion (optional, for hero/section entrance animations)
- Axios or fetch wrapper for API calls
- React Hook Form + Zod (contact/inquiry form validation)

**Backend**
- FastAPI (Python 3.11+)
- Pydantic v2 for request/response schemas
- Uvicorn (dev) / Gunicorn+Uvicorn workers (prod)
- SQLite for MVP → PostgreSQL when traffic/data needs grow (SQLModel or SQLAlchemy as the ORM so the swap is just a connection string)
- Alembic for migrations
- `fastapi-mail` or SMTP via `smtplib` for sending inquiry emails (to sales inbox + optional auto-reply to customer)
- Optional: `slowapi` for rate-limiting the public contact/inquiry endpoints (spam protection)

**Why this split:** the site is content-heavy and form-light — most pages (Home, About, Destinations, Corporate, Visa) are static marketing content. Only Contact/inquiry-style forms need a real backend. Keep the backend small and focused: form intake, storage, and email notification. Don't build a CMS or auth system unless you actually need one.

---

## 2. Repository Structure

```
revive_holiday/
├── frontend/                  # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Destinations.jsx
│   │   │   ├── CorporateTravel.jsx
│   │   │   ├── VisaAssistance.jsx
│   │   │   └── Contact.jsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── AboutPreview.jsx
│   │   │   │   ├── WhyChooseUs.jsx
│   │   │   │   └── ServicesGrid.jsx
│   │   │   ├── destinations/
│   │   │   │   └── DestinationCard.jsx
│   │   │   └── shared/
│   │   │       ├── SectionHeading.jsx
│   │   │       ├── Button.jsx
│   │   │       └── ContactForm.jsx
│   │   ├── data/
│   │   │   ├── services.js        # the 12 "Our Services" entries
│   │   │   ├── destinations.js    # the 9 destinations
│   │   │   └── coreValues.js      # the 5 core values
│   │   ├── lib/
│   │   │   └── api.js             # axios instance, calls FastAPI
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # FastAPI app
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py           # env vars: SMTP creds, DB URL, CORS origins
│   │   ├── database.py
│   │   ├── models.py            # Inquiry, ContactMessage
│   │   ├── schemas.py           # Pydantic request/response models
│   │   ├── routers/
│   │   │   ├── contact.py       # POST /api/contact
│   │   │   └── inquiry.py       # POST /api/inquiry (package/destination inquiries)
│   │   ├── services/
│   │   │   └── email.py         # send_notification_email()
│   │   └── deps.py
│   ├── alembic/
│   ├── requirements.txt
│   └── .env.example
│
└── DEVELOPMENT_GUIDE.md
```

---

## 3. Page-by-Page Content Mapping

Maps your approved copy directly to components so nothing gets lost in translation.

### Home (`/`)
| Section | Component | Content source |
|---|---|---|
| Hero | `Hero.jsx` | Headline "Explore the World with Confidence", subtext, tagline "Skill Is Our Strength.", CTA buttons: **Plan Your Journey** → `/contact`, **Contact Us** → `/contact` |
| About preview | `AboutPreview.jsx` | "Creating Memories Across the Globe" blurb + link to `/about` |
| Why Choose Us | `WhyChooseUs.jsx` | 10-item checklist, rendered as a 2-column icon grid |
| Our Services | `ServicesGrid.jsx` | 12 service cards from `data/services.js`, each with icon + title + description |

### About (`/about`)
- Who We Are (intro paragraph)
- Mission / Vision (two side-by-side cards)
- Core Values (5-card grid from `data/coreValues.js`)

### Destinations (`/destinations`)
- Grid of `DestinationCard.jsx` from `data/destinations.js` (Europe, UK, Turkey, Dubai, Thailand, Malaysia, Indonesia, Singapore, Maldives)
- Each card: name, one-line description, image, "Enquire" button → opens `ContactForm` pre-filled with `destination` field

### Corporate Travel (`/corporate-travel`)
- Intro + bulleted services list (7 items)
- CTA to Contact with `inquiryType=corporate`

### Visa Assistance (`/visa-assistance`)
- Intro + "We Support" bulleted list (6 items)
- CTA to Contact with `inquiryType=visa`

### Contact (`/contact`)
- Contact details block (address/phone/WhatsApp/email/website — **placeholders in the copy, need real values before launch**)
- Office hours table
- `ContactForm.jsx` — this is the one component that talks to the backend

### Footer (global, all pages)
- Tagline, "Skill Is Our Strength", service links, copyright

> **Action item:** the Contact page copy still has bracketed placeholders (`[Your Office Address]`, `[Your Phone Number]`, etc.). Get real values before this goes further than dev — I flagged them, didn't invent fake ones.

---

## 4. API Contract (FastAPI)

Keep it to two endpoints for MVP.

### `POST /api/contact`
General contact form submission.

```json
// Request
{
  "name": "string",
  "email": "string (validated)",
  "phone": "string",
  "message": "string"
}
```
```json
// Response 201
{ "id": 1, "status": "received" }
```

### `POST /api/inquiry`
Used by Destinations / Corporate / Visa pages so submissions carry context.

```json
// Request
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "inquiry_type": "destination | corporate | visa | honeymoon | group | umrah",
  "destination": "string | null",
  "message": "string"
}
```
```json
// Response 201
{ "id": 1, "status": "received" }
```

Both endpoints:
1. Validate via Pydantic schema
2. Persist to DB (`ContactMessage` / `Inquiry` table)
3. Fire an email notification to the sales inbox (`services/email.py`)
4. Return `201` with the created record's id

Rate-limit both with `slowapi` (e.g. 5 requests/minute/IP) to deter spam — this is a public unauthenticated form.

---

## 5. Environment & Config

**backend/.env**
```
DATABASE_URL=sqlite:///./revive.db
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
NOTIFY_EMAIL=sales@reviveholidays.example
CORS_ORIGINS=http://localhost:5173
```

**frontend/.env**
```
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 6. Build Order (Phased)

**Phase 1 — Scaffolding**
1. `npm create vite@latest frontend -- --template react`, install Tailwind + React Router
2. FastAPI skeleton: `main.py`, CORS middleware, health check route
3. Confirm frontend can hit `GET /api/health` through the dev proxy

**Phase 2 — Static pages (no backend needed)**
4. Layout shell: `Navbar` + `Footer` + `App.jsx` routes
5. Home page sections (Hero → Services), using content tables above
6. About, Destinations, Corporate, Visa pages

**Phase 3 — Backend + forms**
7. DB models + Alembic migration for `ContactMessage`, `Inquiry`
8. `POST /api/contact` and `POST /api/inquiry` with validation
9. Email notification service
10. Wire `ContactForm.jsx` to the API with React Hook Form + Zod, loading/success/error states

**Phase 4 — Polish**
11. Responsive pass (mobile nav, grid breakpoints)
12. SEO basics: per-page `<title>`/meta via `react-helmet-async`
13. Image optimization for destination photos
14. Rate limiting + basic spam honeypot field on forms

**Phase 5 — Deploy**
15. Frontend: Vercel/Netlify (static build)
16. Backend: any Python host (Render/Railway/VPS) behind Uvicorn+Gunicorn, Postgres if traffic warrants it
17. Point `VITE_API_BASE_URL` at the deployed backend, lock down `CORS_ORIGINS`

---

## 7. Open Questions Before Building

- Real contact details (address/phone/WhatsApp/email/domain) to replace placeholders
- Do you want a package/blog CMS later, or is content hand-coded in `data/*.js` for now? (Hand-coded is simpler and fine for this size site — only revisit if non-devs need to edit content.)
- Any existing brand colors/logo/fonts, or should the guide assume a fresh Tailwind theme?
- Do inquiry emails need to go to multiple recipients (e.g. corporate desk vs. general sales)?
