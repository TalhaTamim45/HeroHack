# CyberQuest Ops Roadmap

## Phase 1 - Playable prototype

Status: included in this package.

- Static browser game
- Mission map
- Multiple paths
- Simulated terminal
- XP, badges, reports
- LocalStorage saves

## Phase 2 - Real MVP

Goal: make it ready for public testers.

Features:

- User accounts
- Cloud save
- Admin mission editor
- Public landing page
- Course progress page
- Better mission animations
- Mobile-first polish
- More beginner missions
- Report portfolio export

Suggested stack:

- Next.js
- Tailwind CSS
- PostgreSQL
- Prisma
- Supabase Auth or Auth.js

## Phase 3 - Community and monetization

Features:

- Leaderboard
- Daily missions
- Weekly story cases
- Badges and certificates
- Pro path unlocks
- Team/classroom mode
- Teacher dashboard

## Phase 4 - Isolated practical labs

Features:

- Docker lab instances
- Resettable vulnerable toy apps
- Isolated network ranges
- Browser-based terminal
- Lab timer
- Per-session flags
- Automatic scoring

Safety requirement:

No real public target testing. All labs must be created, owned, and isolated by the platform.

## Phase 5 - AI mentor

Features:

- Hint system that does not reveal full answers instantly
- Report quality scoring
- Mission generator for admins
- NPC conversations
- Personalized study plan

Guardrail:

The AI mentor should refuse requests to attack real targets and redirect to lab-only learning.
