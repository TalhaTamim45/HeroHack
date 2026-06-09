# CyberQuest Ops

CyberQuest Ops is a playable browser-based cybersecurity learning game.

**v1.1 update:** the prototype now has a colorful casual game skin, rounded cards, emoji district icons, playful Fredoka/Nunito fonts, a global Mentor Tip banner, mission-level mentor tips, and frequent contextual tip popups.

The idea is inspired by open-world mission games: players can choose different paths instead of following one boring course. The first version is a static web app that runs fully in the browser.

## What is included

- GTA-style city mission map
- Multiple learning paths:
  - Core Academy
  - Web Pentest District
  - Network Ops Zone
  - SOC Defense Tower
  - WordPress Security City
  - Cloud Mountain
  - Capstone Boss Cases
- XP, level, rank, credits, reputation, ethics score
- Badges and path mastery
- Safe simulated terminal labs
- Evidence notebook
- Report writing challenges
- Export/import save data
- Export reports as Markdown
- LocalStorage save system
- Colorful casual game UI
- Frequent mentor tips during navigation, missions, choices, terminals, and reports

## Important safety design

This project does not attack anything. The terminal is simulated in JavaScript. All domains, networks, accounts, services, logs, API keys, and missions are fictional training objects.

The goal is to teach:

> Think like an attacker. Act like a defender. Work only with permission.

Every offensive concept should also teach:

1. Scope and permission
2. Evidence collection
3. Business impact
4. Detection or prevention
5. Secure fix
6. Professional reporting

## Run locally

Open `index.html` in a browser.

That is enough for the current static version.

For a local server, you can also run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## File structure

```text
cyberquest-ops/
  index.html
  assets/
    css/
      styles.css
    js/
      data.js
      app.js
  DEPLOYMENT.md
  ROADMAP.md
  SECURITY_AND_ETHICS.md
  netlify.toml
  vercel.json
```

## How to add missions

Open:

```text
assets/js/data.js
```

Add a new object inside `GAME_DATA.missions`.

Each mission supports these step types:

- `briefing`
- `choice`
- `terminal`
- `patch`
- `report`

Example mission shape:

```js
{
  id: "web-05",
  path: "web",
  title: "New Web Mission",
  location: "PixelBank Avenue",
  difficulty: 2,
  xp: 250,
  credits: 120,
  summary: "Short mission summary.",
  tags: ["web", "defense"],
  unlock: { level: 2, completed: ["core-01"] },
  steps: [
    {
      type: "briefing",
      title: "Mission Briefing",
      body: "Story text.",
      objectives: ["Objective 1", "Objective 2"]
    },
    {
      type: "choice",
      title: "Decision",
      question: "What should the player do?",
      options: [
        { id: "a", text: "Safe answer", correct: true, explanation: "Why it is right." },
        { id: "b", text: "Unsafe answer", correct: false, ethicsDelta: -5, explanation: "Why it is wrong." }
      ]
    }
  ]
}
```

## Mission unlock rules

Supported unlock fields:

```js
unlock: { level: 3 }
unlock: { completed: ["core-01", "core-02"] }
unlock: { completedAny: ["web-01", "network-01"] }
unlock: { completedCount: 7 }
```

You can combine them.

## Next recommended upgrade

This is the best first playable prototype. The next big upgrade is to turn this into a real app with accounts and a database:

- Next.js frontend
- Supabase or PostgreSQL database
- Auth.js or Supabase Auth
- Admin panel for creating missions
- Server-side progress saving
- Docker-based isolated labs for advanced challenges
- AI mentor that gives hints without giving answers immediately

Do not add real scanning or public target testing. Keep labs isolated and permission-based.
