# Deploying to Vercel

The site is a Vite + React app. The chatbot runs as a Vercel serverless function (`api/chat.js`), so the
Groq keys stay on the server and are never sent to the browser.

## 1. Push the project

Push the `site` folder to GitHub (or GitLab/Bitbucket). `.env` is git-ignored: **never commit it**.

If your repository root is the parent folder (`saiconsultancy`), set **Root Directory = `site`**
in the Vercel project settings. If the repository root is `site` itself, leave it blank.

## 2. Import in Vercel

- **Framework preset:** Vite (auto-detected from `vercel.json`)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js version:** 20.x or newer

## 3. Environment variables (Project → Settings → Environment Variables)

| Name | Value | Notes |
| --- | --- | --- |
| `GROQ_API_KEYS` | `key1,key2,key3,key4` | comma-separated, no spaces. **Required.** Do not prefix with `VITE_`. |
| `GROQ_MODEL` | `openai/gpt-oss-120b` | optional |
| `GROQ_FALLBACK_MODEL` | `openai/gpt-oss-20b` | optional, used when the main model is rate-limited |

Add them for **Production** (and Preview if you want the chat on preview deployments), then redeploy.

## 4. Check it

- Open the site and each page directly by URL (`/gallery`, `/what-we-do`...): they should load, not 404.
- Open the chat bubble, ask "What programs do you offer?": you should get a bulleted answer.
- Ask something unrelated ("what is 2+2"): it should politely refuse.

## Local development

```
npm install
cp .env.example .env     # then fill in GROQ_API_KEYS
npm run dev              # site on http://localhost:5173, chat API on :8787
```

## Notes

- `vercel.json` rewrites every non-`/api` path to `index.html`, so React Router pages work on refresh.
- Rate limiting inside the function is per instance (best effort). Groq's own limits are the real cap; if you
  expect heavy traffic, add more keys to `GROQ_API_KEYS` or use Vercel's firewall rate limiting.
- The Google Fonts (Onest, IBM Plex Mono) load from fonts.googleapis.com.
- Photos in `public/images` are served from Vercel's CDN (about 5 MB in total).
