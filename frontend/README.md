# ExamineIQ Frontend — Next.js Migration

Migrated from the supplied React/Vite frontend to Next.js App Router.

## Preserved
- Existing UI sections, text, interactions and colors
- Exam search and category filtering
- Exam details route and backend API calls
- Login/signup behavior and localStorage token/user handling
- Hero and product demo interactions
- FAQ and scholarship/recognition interactions
- Existing responsive behavior

## Routes
- `/`
- `/login`
- `/signup`
- `/exam/[id]`

## API
Create `.env.local` from `.env.example` and set:

`NEXT_PUBLIC_API_URL=http://localhost:5000`

## Run
`npm install`

`npm run dev`
