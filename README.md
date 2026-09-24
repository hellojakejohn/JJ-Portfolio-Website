# hellojakejohn.com

Personal site for Jake John (Jakob Johnson). Vite + React + TypeScript SPA on Vercel, with one serverless function for the contact form.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs client/dist
```

## Where things live

- `client/src/data/site.ts`: all content (projects, socials, credentials, stack). Edit this, not the components.
- `client/src/styles.css`: design tokens for dark (default) and light themes.
- `client/public/img`: project previews, headshot, brand hand.
- `client/public/JakobJohnsonResume.pdf`: printed from `/resume` (headless Chrome, Letter, no backgrounds).
- `api/contact.ts`: contact form, sends mail through Resend.

## Env vars (Vercel)

| Name | What |
|---|---|
| `RESEND_API_KEY` | Resend API key for the contact form |
| `RECIPIENT_EMAIL` | Where messages go (default hellojakejohn@gmail.com) |
| `FROM_EMAIL` | Verified sender (default onboarding@resend.dev) |

Never commit `.env` files. `.env.example` is the template.
