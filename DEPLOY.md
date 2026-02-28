# Deploy Instructions — sofarcam Hub Site

## 1. Create GitHub Repo (2 minutes)

Go to: https://github.com/new

- **Repository name:** `sofarcam`
- **Description:** Personal hub site — sofar.cam
- **Visibility:** Public
- **Initialize:** Leave unchecked (we already have code)
- Click **Create repository**

Then run in terminal:
```bash
cd ~/Projects/sofarcam
git push -u origin main
```

---

## 2. Deploy to Vercel (3 minutes)

1. Go to https://vercel.com/new
2. Connect GitHub → Select **SofarCam/sofarcam**
3. Framework: **Vite** (auto-detected)
4. No environment variables needed
5. Click **Deploy**

Your site goes live at: `sofarcam.vercel.app`

---

## 3. Add Custom Domain Later (when you buy sofar.cam)

Once you have the domain:

1. Go to Vercel project → **Settings → Domains**
2. Add `sofar.cam`
3. In your domain registrar's DNS, add:
   - **A record** → `76.76.21.21` (Vercel's IP)
   - Or **CNAME** → `cname.vercel-dns.com`
4. SSL auto-provisions in ~5 minutes

### Domain Options (cheapest first):
| Domain | Where to Buy | Est. Price/yr |
|--------|-------------|----------------|
| sofar.cam | namecheap.com | ~$15-25 |
| sofarcam.com | namecheap.com | ~$12 |
| sofar.cam | porkbun.com | ~$10-20 |

---

## 4. Add Your Linktree Links

Edit `src/components/Links.jsx` and update the `href` fields in the `channels` array once you know where each Linktree link points.

Current placeholders:
- `upwork.com` → replace with your Upwork profile URL
- `discord.gg` → replace with your SofarSeven Discord invite link

---

## Stack
- React 19 + Vite 7 + Tailwind 4 + Framer Motion 12
- Same stack as shotbyseven.com
- Dark cinematic theme — ink/cream/gold palette
