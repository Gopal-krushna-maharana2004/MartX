# MartX Company Workspace

A frontend-only company management demo built with Next.js App Router, React, Tailwind CSS, Recharts, and Lucide React. The browser's LocalStorage is the single source of truth for company data; sessionStorage holds the current demo login session. No database, API service, or separate backend is used.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create and run a production build:

```bash
npm run build
npm start
```

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
