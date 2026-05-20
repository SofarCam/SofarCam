# Polymarket Penny-Snipe Scan — 2026-05-20 10:00 UTC

**Scanner:** Claude Code (SofarCam)
**Run date:** 2026-05-20
**Strategy:** Buy YES shares priced $0.001–$0.02 (0.1¢–2¢) that pay $1.00 on resolution
**Status:** WATCH ONLY — no live bets until Cam explicitly enables

---

## Methodology

- Sources: Polymarket public web search + market-specific searches (Gamma API blocked from this environment)
- Penny threshold: YES price ≤ $0.02 (≤ 2%)
- Scoring formula: `score = realistic_probability × (1 / price)`
  - `realistic_probability` = analyst estimate of true underlying probability, adjusting for known biases
  - Higher score = better expected value per dollar risked
- ROI calculation: `ROI = (realistic_prob × $1.00) / price − 1`
- Recommendation tiers:
  - **SMALL BET** — score ≥ 0.5, good liquidity, event still live
  - **WATCH** — score 0.2–0.49, or thin liquidity, needs monitoring
  - **SKIP** — near-zero realistic probability or already near resolution with no path to YES

---

## Top 10 Penny Markets (Ranked by Score)

---

### 1. Trump Out as President by May 31, 2026

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/trump-out-as-president-by-may-31 |
| **YES Price** | ~$0.002 (0.2¢) |
| **Resolution Date** | May 31, 2026 |
| **Volume** | ~$1.9M |
| **Liquidity** | High |

**Probability Assessment:**
This market expires in 11 days. Trump leaving office by May 31 would require resignation, 25th Amendment removal, or death. No active proceedings exist. True probability: ~0.1% (rounding above market price only for catastrophic-tail reasons).

**ROI Calculation:**
- Market price: $0.002
- Realistic prob: 0.001 (0.1%)
- Expected value per $1 wagered: $0.001 × $1 / $0.002 = $0.50
- ROI: −50% (EV negative)

**Score:** 0.001 / 0.002 = **0.50**

**Recommendation:** SKIP
> Window closes in 11 days. Realistic probability may actually be *below* the 0.2% market price due to imminent expiry. No plausible mechanism exists. Negative EV.

---

### 2. Putin Out as President of Russia by June 30, 2026

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/putin-out-as-president-of-russia-by-june-30 |
| **YES Price** | ~$0.02 (2¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$2.3M |
| **Liquidity** | High |

**Probability Assessment:**
Putin removal requires coup, death, or severe incapacitation. Base rate historically low but non-trivial over 40-day windows given Russia's ongoing war footing and elite fractures since Prigozhin 2023. Realistic probability: ~1.5%–2% (roughly in line with market).

**ROI Calculation:**
- Market price: $0.02
- Realistic prob: 0.015
- Expected value: 0.015 / 0.02 = $0.75 per $1
- ROI: −25% (slightly unfavorable)

**Score:** 0.015 / 0.02 = **0.75**

**Recommendation:** WATCH
> Market is fairly priced. Liquidity is deep ($2.3M volume). No major edge, but if any credible coup signal emerges this becomes a SMALL BET immediately. Set a news alert on Putin health/security reports.

---

### 3. Will Russia Invade a NATO Country by June 30, 2026?

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/will-russia-invade-a-nato-country-in-2025 (June 30 sub-market) |
| **YES Price** | ~$0.02 (2¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$4.8M |
| **Liquidity** | Very High |

**Probability Assessment:**
Russia is bogged down in Ukraine, deterred by Article 5. No credible signals of a NATO territorial offensive. True probability: ~0.5%–1%. Market may be slightly overpriced at 2¢.

**ROI Calculation:**
- Market price: $0.02
- Realistic prob: 0.008
- Expected value: 0.008 / 0.02 = $0.40 per $1
- ROI: −60% (negative EV)

**Score:** 0.008 / 0.02 = **0.40**

**Recommendation:** SKIP
> 2¢ appears overpriced for the realistic probability here. NATO invasion by June 30 has even lower odds than market implies. Deep liquidity makes this a popular narrative hedge, not a value play.

---

### 4. Trump Out as President by June 30, 2026

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/trump-out-as-president-by-june-30 |
| **YES Price** | ~$0.01 (1¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$5.4M |
| **Liquidity** | Very High |

**Probability Assessment:**
41-day window vs. 11-day window for the May 31 market. Same structural barriers (no impeachment proceedings, no 25th Amendment activity). Slightly longer window raises tail probability marginally. Realistic probability: ~0.5%–0.8%.

**ROI Calculation:**
- Market price: $0.01
- Realistic prob: 0.006
- Expected value: 0.006 / 0.01 = $0.60 per $1
- ROI: −40%

**Score:** 0.006 / 0.01 = **0.60**

**Recommendation:** WATCH
> Better risk/reward than the May 31 market given the 41-day window at half the price. Still negative EV on fundamentals alone, but the price/window ratio is the most interesting Trump-exit play. Monitor for any sudden political shocks (health event, scandal escalation).

---

### 5. Israel x Iran Permanent Peace Deal by May 31, 2026

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/israel-x-iran-permanent-peace-deal-by (May 31 sub-market) |
| **YES Price** | ~$0.02 (2¢) |
| **Resolution Date** | May 31, 2026 |
| **Volume** | ~$971K |
| **Liquidity** | Moderate |

**Probability Assessment:**
Requires a permanent, formal Israel-Iran deal in 11 days. Iran's April ceasefire is fragile; Trump described it as "on massive life support." A *permanent* peace deal (not merely a ceasefire extension) is extremely unlikely. True probability: ~0.3%.

**ROI Calculation:**
- Market price: $0.02
- Realistic prob: 0.003
- Expected value: 0.003 / 0.02 = $0.15 per $1
- ROI: −85%

**Score:** 0.003 / 0.02 = **0.15**

**Recommendation:** SKIP
> "Permanent peace deal" resolution criteria is strict. Even if a ceasefire extension occurs, this likely does not resolve YES. Severely negative EV.

---

### 6. US-Iran Nuclear Deal by May 31, 2026

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/us-iran-nuclear-deal-by-may-31-974 |
| **YES Price** | ~$0.10 (10¢) |
| **Resolution Date** | May 31, 2026 |
| **Volume** | Moderate |
| **Liquidity** | Moderate |

**Probability Assessment:**
*Note: At 10¢, this is above the 2¢ penny-snipe threshold but included for context as a related series.* Trump rejected Iran's mid-May proposal; talks stalled. True probability: ~5%–8%.

> **This market is above the 2¢ threshold — included for reference only, not ranked in top 10 penny plays.**

---

### 7. Trump Invokes Insurrection Act Before July 2026

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/will-donald-trump-invoke-the-insurrection-act-before-july |
| **YES Price** | ~$0.00 (0¢ — effectively resolved NO) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | Unknown |
| **Liquidity** | Unknown |

**Probability Assessment:**
Market appears to be at/near 0%. Likely near-resolved or stale. No actionable opportunity.

**Recommendation:** SKIP
> Price is effectively at floor. No viable snipe.

---

### 8. Kim Jong Un Out as Supreme Leader Before 2027

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/kim-jong-un-out-as-supreme-leader-of-north-korea-before-2027 |
| **YES Price** | ~$0.05–$0.09 (5¢–9¢, conflicting reports) |
| **Resolution Date** | December 31, 2026 |
| **Volume** | ~$55K |
| **Liquidity** | Low |

**Probability Assessment:**
*Note: Price range reported 5–9¢, above our 2¢ hard threshold. Included as near-penny context.* DPRK succession risk is real but low over a 7-month window. True probability: ~3%–5%.

> **Above the 2¢ threshold — reference only.**

---

### 9. US Defaults on Debt by 2027

| Field | Value |
|-------|-------|
| **Market URL** | polymarket.com/event/us-defaults-on-debt-by-2027 |
| **YES Price** | ~$0.05 (5¢) |
| **Resolution Date** | December 31, 2026 |
| **Volume** | ~$13.5K |
| **Liquidity** | Low |

**Probability Assessment:**
*At 5¢, above the 2¢ threshold. Included as context.* Moody's May 2026 downgrade increased attention but US technical default remains very unlikely given debt ceiling suspension history. True probability: ~2%–3%.

> **Above the 2¢ threshold — reference only.**

---

### 10. Trump Out as President by May 31 — Sub-penny Floor Check

*(Re-examining for genuine sub-penny entries)*

Based on available data, the **Trump Out by May 31** at ~0.2¢ ($0.002) is the only confirmed sub-penny YES market identified in this scan. Other markets in the 1–2¢ range include:

| Market | Price | Res. Date | Score | Rec. |
|--------|-------|-----------|-------|------|
| Trump Out by June 30 | 1¢ | Jun 30, 2026 | 0.60 | WATCH |
| Putin Out by June 30 | 2¢ | Jun 30, 2026 | 0.75 | WATCH |
| Russia Invades NATO by Jun 30 | 2¢ | Jun 30, 2026 | 0.40 | SKIP |
| Israel-Iran Peace by May 31 | 2¢ | May 31, 2026 | 0.15 | SKIP |
| Trump Out by May 31 | 0.2¢ | May 31, 2026 | 0.50 | SKIP |

---

## Summary Table (Penny Markets Only — ≤ 2¢)

| Rank | Market | Price | Res. Date | Realistic Prob | Score | Rec. |
|------|--------|-------|-----------|----------------|-------|------|
| 1 | Putin Out by June 30 | 2¢ | Jun 30, 2026 | 1.5% | **0.75** | **WATCH** |
| 2 | Trump Out by June 30 | 1¢ | Jun 30, 2026 | 0.6% | **0.60** | **WATCH** |
| 3 | Trump Out by May 31 | 0.2¢ | May 31, 2026 | 0.1% | 0.50 | SKIP |
| 4 | Russia Invades NATO by Jun 30 | 2¢ | Jun 30, 2026 | 0.8% | 0.40 | SKIP |
| 5 | Israel-Iran Perm. Peace by May 31 | 2¢ | May 31, 2026 | 0.3% | 0.15 | SKIP |

---

## Key Observations

1. **Penny inventory is thin.** True sub-2¢ YES markets are scarce in today's scan. Most long-shot political markets cluster at 5–15¢, well above the snipe threshold.

2. **Best relative value: Putin Out by June 30 (2¢).** The 40-day window, Russia's ongoing war stress, and elite fragility make ~1.5% a defensible realistic estimate. At exactly 2¢ the market is roughly fairly priced — not a screaming value but the best risk/reward in the penny tier today.

3. **Trump Out by June 30 (1¢) is interesting on price/window ratio** — half the price of Putin with a meaningful tail. But the institutional barriers are higher (US system vs. Russia's more personalistic power). A small speculative position is defensible only as a pure tail-risk hedge.

4. **Iran/Israel Peace by May 31 at 2¢ is a SKIP** — the resolution criteria requires *permanent peace deal*, not merely ceasefire continuation. This is a semantic trap.

5. **US debt downgrade (33¢) and Fed rate hike (36¢) markets** are not penny plays but are the most liquid high-volume markets currently showing crowd mispricing potential — flagged for future scan if threshold is raised to 40¢.

6. **API access note:** Gamma API (gamma-api.polymarket.com) returned 403 Forbidden from this environment. Data sourced via web search and public market pages. Next scan should attempt authenticated API access or Polymarket's Python SDK for more complete market enumeration.

---

## Data Sources

- [Polymarket Trump Out by June 30](https://polymarket.com/event/trump-out-as-president-by-june-30)
- [Polymarket Trump Out by May 31](https://polymarket.com/event/trump-out-as-president-by-may-31)
- [Polymarket Putin Out by June 30](https://polymarket.com/event/putin-out-as-president-of-russia-by-june-30)
- [Polymarket Russia Invades NATO](https://polymarket.com/event/will-russia-invade-a-nato-country-in-2025/will-russia-invade-a-nato-country-by-june-30-2026)
- [Polymarket Israel-Iran Peace Deal](https://polymarket.com/event/israel-x-iran-permanent-peace-deal-by)
- [Polymarket US-Iran Nuclear Deal May 31](https://polymarket.com/event/us-iran-nuclear-deal-by-may-31-974)
- [Polymarket US Defaults on Debt](https://polymarket.com/event/us-defaults-on-debt-by-2027)
- [Bitcoin News — Trump Impeachment Odds](https://news.bitcoin.com/trump-impeachment-odds-rise-to-70-on-polymarket-amid-falling-approval-and-iran-war-concerns/)

---

*Scan completed: 2026-05-20 10:xx UTC | Next scheduled scan: 2026-05-21*
*WATCH ONLY — no live positions until Cam explicitly enables trading.*
