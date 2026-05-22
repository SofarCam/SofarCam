# SofarCam — Project Bible

## Who Cam Is
Cameron Currence. Charlotte, NC. Photographer and AI/content creator.
Two brands, one mission: help creators and small businesses look and sound like they know what they're doing.

---

## Brand 1: Shot by Seven (@shotbyseven777)
- **What it is**: Cameron's photography brand. Events, portraits, sports, content shoots.
- **IG handle**: @shotbyseven777
- **Voice**: Real, punchy, human. Short sentences. Talk about the person, the moment, the shoot. No fluff. NOT "Golden hour magic ✨". NOT "we are so excited to announce".
- **Content pillars**: Behind the scenes, client stories, location shoots, gear/process, results (before/after or raw vs edited), real talk about the industry
- **Goal**: Book more shoots. Build trust. Show personality.

---

## Brand 2: SofarContent
- **What it is**: AI-powered content tools for creators. Free tools, newsletter, education.
- **Website**: React + Vite app deployed on Vercel (this repo)
- **Tools live in the app**: Concept Generator, Hook Writer, Caption Writer, LinkedIn Writer, Content Analyzer
- **Voice**: Lead with the tool or insight, show the result, practical and direct. No hype. No buzzword soup.
- **Content pillars**: Tool tutorials, AI insights, creator tips, before/after content transformations, "how I made X in Y minutes with AI"
- **Goal**: Grow email list. Drive tool usage. Establish AI content authority.

---

## The Web App (this repo: sofarcam/sofarcam)
- **Stack**: React + Vite, Tailwind CSS, Framer Motion, Three.js (3D hero scene)
- **Backend**: Vercel serverless functions in `/api/` (fetch-content.js, generate-content.js, subscribe.js)
- **Email**: Resend API for email capture
- **Deploy**: Vercel — see DEPLOY.md
- **Dev branch**: `claude/peaceful-ride-dtFYX`

---

## Content Pipeline File Structure
| File/Dir | Purpose |
|---|---|
| `content/IDEAS.md` | Idea backlog for both brands |
| `content/PIPELINE.md` | Tracker: draft → review → scheduled → posted |
| `content/DRAFTS.md` | Full caption/copy drafts ready for Cam's review |
| `briefings/YYYY-MM-DD.md` | Daily morning briefings |
| `logs/` | Automated scan logs (polymarket, analytics, etc.) |
| `digest/src/fetchers/` | Data fetchers for morning briefing (JS modules) |

---

## ⚠️ Review & Approval Rule
**NEVER mark anything as approved or posted. Cam reviews and approves everything before it goes live.**

---

## Active Projects
1. **SofarContent web app** — React/Vite content tools site (this repo)
2. **Shot by Seven** — photography brand, Charlotte NC, Instagram content pipeline
3. **SofarContent brand** — AI/tech content brand, newsletter, tool tutorials
4. **Sports picks** — value betting analysis, $100 bankroll, Quarter Kelly sizing
5. **Polymarket scanner** — penny-snipe scanner, WATCH mode only

---

## Sports Picks Philosophy
- Value first, outcome second
- Quarter Kelly sizing
- Hard cap: 5% per bet
- Minimum 5% edge required to post a pick
- If no edge exists today, say so clearly
- Cam reviews before anything goes out

## Polymarket Scanner Philosophy
- WATCH only — no actual betting until Cam explicitly enables it
- Target: markets priced $0.001–$0.02 that pay $1 on YES resolution
- Score by: realistic_probability × (1/price)
- Recommendations: WATCH / SMALL BET / SKIP
