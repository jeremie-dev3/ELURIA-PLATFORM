# Eluria Investor Relations Prototype

A responsive investor-relations dashboard prototype built with Next.js App Router. The app currently uses mock dashboard data and browser-local storage; it is not a shared CRM or production identity system.

## Requirements

- Node.js 20 or later
- npm

## Local setup

```powershell
npm install
Copy-Item .env.example .env.local
```

Edit `.env.local` and set a private demo email, password, and a random `AUTH_SECRET` of at least 32 characters. Do not commit `.env.local`.

```powershell
npm run dev
```

Open `http://localhost:3000`. Protected routes redirect to `/login`; the login endpoint reads credentials from `.env.local` and issues an expiring, signed, HttpOnly cookie. This lightweight demo gate is not a substitute for production authentication, user management, or an authorization provider.

## Production build

```powershell
npm run build
npm run start
```

Set the same environment variables in the deployment environment before starting the app.

## Current routes

- `/invest`: dashboard (mock KPIs; lead list stored in this browser)
- `/invest/opportunities`: mock opportunity directory and NDA demo form
- `/login`: demo sign-in
- `/api/demo-login`: demo credential verification and signed session cookie

## Architecture

- `app/`: App Router pages and route handlers
- `components/admin-dashboard/`: dashboard, investor list, funnel, and opportunity UI
- `components/public-platform/`: public-facing components and NDA modal
- `data/eluria/`: typed mock data and browser-local investor persistence
- `types/eluria/`: shared TypeScript domain types
- `proxy.ts`: route gate for `/invest`, `/admin`, and `/dashboard`

## Prototype limitations

- Investor records are stored in the browser's `localStorage`; they do not sync between users or devices and can be cleared by the browser.
- Dashboard metrics and opportunity data are illustrative mock values.
- Demo credentials authenticate one shared demo account. For production, use a vetted identity provider, server-side session storage, role-based authorization, and a secured database with access controls and audit logging.
- Do not use real investor personal data or confidential project documents in this prototype.

## Validation

Run `npm run build` to compile and type-check the application.