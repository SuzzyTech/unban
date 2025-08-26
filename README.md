# SuzzyTech Unban - Full (Direct Send + Gmail Fallback)

This Next.js project includes a hacker-themed UI and two ways to send unban appeals:
1. **Direct send** via server-side Nodemailer (Next.js API route). Requires SMTP credentials set in `.env.local`.
2. **Gmail compose fallback** that opens the user's Gmail compose window with the message pre-filled.

## Setup (local)

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` in the project root. Example variables (see `.env.local.example`):
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=yourpassword
FROM_EMAIL="Suzzy Tech" <you@example.com>
WHATSAPP_SUPPORT_EMAIL=support@support.whatsapp.com
```
> For Gmail SMTP, you may need an App Password or enable less-secure access depending on your provider.

3. Run locally:
```bash
npm run dev
```

## Deploy to Vercel
- Push the project to GitHub and import into Vercel.
- Add the same environment variables in Vercel project settings (Environment Variables).
- Build command: `npm run build` (Vercel handles automatically).

## Important notes
- Direct send requires valid SMTP credentials. The API route will return success/failure and you can view server logs on Vercel.
- Gmail fallback works without server configuration but requires the user to be signed into Gmail.
