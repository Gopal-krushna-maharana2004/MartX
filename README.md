# MartX Company Workspace

MartX is a modern, responsive company management dashboard built with Next.js, featuring separate Admin and Employee portals, role-based navigation, dynamic management tools, interactive analytics, and browser LocalStorage persistence. This frontend-only demo uses Next.js App Router, React, Tailwind CSS, Recharts, and Lucide React; it has no database, external API, or separate backend.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create the static production build:

```bash
npm run build
```

The generated site is in `out/`.

### Deploy to Render as a Static Site

- **Root Directory:** leave the field empty so Render builds from the repository root. Do not enter the words `Leave blank`.
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `out`

## Demo access

The seeded employee profile for Gopal uses `gopal@martx.org`, phone `6370173996`, and location Bhubaneswar. The admin display name is Biswa.

- **Admin:** username `admin`, password `1234`
- **Employee:** choose an employee username and use password `1234`
- Demo employee usernames: `gopal`, `sofia`, `noah`, `emma`, `liam`, `ava`, and `ethan`

Authentication is demo-only and is not secure production authentication. Credentials and role checks run in the browser. Do not use real credentials or sensitive company information.

## Features

- Admin workspace for employees, departments, tasks, projects, attendance, responsibilities, announcements, and company information.
- Employee workspace with read-only access to their tasks, attendance, responsibilities, profile, performance, directory, and announcements.
- Create, edit, delete, search, filter, paginate, and validate company records. Charts and dashboard metrics recalculate as shared LocalStorage data changes.
- Seeded realistic demo data is created only when the browser has no existing MartX data. Admins can restore the original dataset with **Reset demo data** on the dashboard.
- Responsive navigation, notifications, profile menu, modal forms, confirmation dialogs, empty states, and toast feedback.

Company data is stored in the browser under `martx-company-data-v1`. The active demo session is stored in sessionStorage and ends when the browser session is closed or the user logs out.
