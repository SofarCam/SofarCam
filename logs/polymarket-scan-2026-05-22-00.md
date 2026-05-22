# Polymarket Penny-Snipe Scan — 2026-05-22 (Hour 00)

**Scanner status:** API UNAVAILABLE  
**Scan time:** 2026-05-22T00:00Z  
**Mode:** WATCH only — no betting active

---

## API Availability Report

All Polymarket endpoints returned **HTTP 403 Forbidden** from this sandbox environment.

Endpoints attempted:
- `https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=100`
- `https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=100&order=volume&ascending=false`
- `https://gamma-api.polymarket.com/markets` (bare)
- `https://clob.polymarket.com/markets`
- `https://clob.polymarket.com/markets?next_cursor=MA==`
- `https://data-api.polymarket.com/activity?limit=50`
- `https://polymarket.com/api/markets`
- `https://api.polymarket.com/markets`
- `https://polymarket.com` (homepage)

**Root cause:** The Claude Code sandbox enforces an egress proxy allowlist (`CLAUDE_CODE_PROXY_RESOLVES_HOSTS=true`). The Polymarket domains (`gamma-api.polymarket.com`, `clob.polymarket.com`, `polymarket.com`) are not on the allowlist. All requests return `Host not in allowlist` or `HTTP 403`. This is a network-level restriction, not an API auth issue.

**TLS inspection confirmed:** SSL cert issuer was `O=Anthropic; CN=sandbox-egress-production TLS Inspection CA`, confirming all outbound traffic passes through the Anthropic sandbox proxy.

---

## Findings

**No live market data could be fetched this run.**

---

## What a Successful Scan Looks Like (Reference)

When the API is reachable, penny-snipe targets are markets where:
- `outcomePrices[0]` (YES price) is between `0.001` and `0.020`
- Market is `active=true`, `closed=false`
- Resolution date is near-term (within 1–90 days)

Scoring formula: `realistic_probability × (1 / price)`  
A market priced at $0.01 with a realistic 5% probability scores: `0.05 × 100 = 5.0`  
A market priced at $0.005 with a realistic 3% probability scores: `0.03 × 200 = 6.0`

---

## Recommendation for Next Run

To fix this scan, one of the following is needed:
1. **Run scanner locally** (outside sandbox) where Polymarket APIs are accessible
2. **Add Polymarket domains to allowlist** in the Claude Code environment config
3. **Use a proxy/tunnel** that is on the allowlist to relay Polymarket data

Until then, this scanner cannot fetch live data from within the Claude Code sandbox.

---

## Action Items for Cam

- [ ] Confirm whether to run this scanner locally vs. in Claude Code
- [ ] If local: set up a cron job or GitHub Action to hit the API and push results
- [ ] If Claude Code: request that `gamma-api.polymarket.com` and `clob.polymarket.com` be added to the egress allowlist

---

*Next scan attempt: 2026-05-23 or whenever the API access issue is resolved.*
