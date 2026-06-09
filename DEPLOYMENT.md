# Deployment Guide

CyberQuest Ops is currently a static site. That means you can deploy it almost anywhere.

## Option 1: Netlify Drop - easiest

1. Zip or open the `cyberquest-ops` folder.
2. Go to Netlify Drop.
3. Drag the whole project folder into the deploy area.
4. Netlify will give you a live URL.
5. Rename the site in Netlify settings if you want a nicer URL.

For updates, upload the updated folder again or connect the project to GitHub.

## Option 2: Vercel CLI

From the project root:

```bash
npm i -g vercel
vercel
```

Follow the prompts. Because this is a static project, no build command is required.

For production:

```bash
vercel --prod
```

## Option 3: GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from `cyberquest-ops`.
3. Go to repository Settings.
4. Open Pages.
5. Choose Deploy from a branch.
6. Choose `main` and `/root`.
7. Save.

GitHub will publish the site at your GitHub Pages URL.

## Option 4: Any shared hosting

Upload these files to `public_html` or your web root:

```text
index.html
assets/
```

The app will run fully in the browser.

## Custom domain

For a real product, buy a domain such as:

```text
cyberquestacademy.com
whitehatquest.com
hackhero.academy
```

Then connect the domain through your hosting provider's DNS instructions.

## Production checklist

Before publicly launching:

- Replace placeholder name/logo if needed.
- Add a Privacy Policy.
- Add Terms of Service.
- Add a clear legal/ethics notice.
- Add contact email.
- Test mobile layout.
- Test save/import/export.
- Confirm all missions are fictional and safe.
- Add analytics only if you disclose it.

## When you add real accounts later

Do not rely on LocalStorage for serious user progress. Use a backend database.

Recommended app stack:

- Frontend: Next.js
- Database: PostgreSQL via Supabase or Neon
- Auth: Supabase Auth or Auth.js
- Hosting: Vercel or Netlify
- Lab workers: Docker containers on Railway, Fly.io, or a VPS
- Queue: Redis or managed job queue

## When you add real labs later

Use isolated toy targets only.

Minimum lab safety controls:

- One lab container per player/session
- No public internet access from lab containers
- Time-limited sessions
- Reset button
- Strict rate limits
- Audit logs
- Scope confirmation before each lab
- No real targets
- No malware or credential theft outside the lab
