# Polymarket Penny-Snipe Scan — 2026-05-15-09

**Scan time:** 2026-05-15 ~09:00 UTC  
**Criteria:** YES price $0.001–$0.02 (0.1¢–2¢), pays $1 on resolution  
**Status:** WATCH ONLY — no betting until Cam enables it  

---

## Data Notes

The Polymarket Gamma API (`gamma-api.polymarket.com`) returned HTTP 403 from this environment (host not on their allowlist). Market data was sourced via web search aggregating third-party trackers, news articles, and Polymarket's own published page descriptions as of ~09:00 UTC May 15, 2026. Prices are best available estimates; treat as indicative, not tick-accurate.

---

## Top 10 Markets: Ranked by `realistic_p × (1/price)`

### Scoring methodology
- **realistic_p**: my calibrated estimate of true YES probability, informed by context (lower than raw market for very tail risks, higher if market seems oversold)  
- **ROI**: `(realistic_p × $1 − price) / price × 100`  
- **Score**: `realistic_p / price` (higher = more attractive per dollar wagered)

---

### 1. Trump Out as President by June 30, 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/trump-out-as-president-by-june-30 |
| **YES Price** | ~$0.013 (1.3¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$5.24M |
| **Market Implied Prob** | 1.3% |
| **Realistic Probability** | 1.0% |
| **Score (realistic_p/price)** | 0.77 |
| **Expected ROI** | −23% |
| **Recommendation** | SKIP |

**Assessment:** Requires Trump removal (impeachment+conviction, 25th Amendment, or death/resignation) within 46 days. Republican majorities in both chambers make impeachment conviction nearly impossible. 25th Amendment invocation requires cabinet+VP consensus — no signs. Market price is fair; no edge here.

---

### 2. Putin Out as President of Russia by June 30, 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/putin-out-as-president-of-russia-by-june-30 |
| **YES Price** | ~$0.020 (2.0¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$2.01M |
| **Market Implied Prob** | 2.0% |
| **Realistic Probability** | 1.2% |
| **Score (realistic_p/price)** | 0.60 |
| **Expected ROI** | −40% |
| **Recommendation** | SKIP |

**Assessment:** Putin holds iron grip on power through 2030 term (with 2036 extension path). No coup signals, no health crisis confirmed, no scheduled power-transfer event. Iran war context adds marginal instability but not actionable. Market slightly overpriced relative to realistic probability.

---

### 3. Will China Invade Taiwan by June 30, 2026?

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/will-china-invade-taiwan-by-june-30-2026 |
| **YES Price** | ~$0.020 (2.0¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$6.7M |
| **Market Implied Prob** | 2.0% |
| **Realistic Probability** | 1.5% |
| **Score (realistic_p/price)** | 0.75 |
| **Expected ROI** | −25% |
| **Recommendation** | WATCH |

**Assessment:** Xi explicitly raised Taiwan at the Trump-Xi May 13 summit but framed it as a stability issue, not imminent action. US-China trade war has de-escalated somewhat post-summit. PLA would need months of visible mobilization before any invasion. At 2¢ with ~$6.7M volume, liquidity is real. However, true probability is below 1.5% for 46-day window — slightly bearish on YES. Worth watching for any sudden PLA escalation signal (blockade drills, CAC sanctions).

---

### 4. Bitcoin Hits $150k by June 30, 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/when-will-bitcoin-hit-150k |
| **YES Price** | ~$0.010 (1.0¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | ~$15.73M (June 30 sub-market) |
| **Market Implied Prob** | 1.0% |
| **Realistic Probability** | 1.5% |
| **Score (realistic_p/price)** | 1.50 |
| **Expected ROI** | +50% |
| **Recommendation** | SMALL BET |

**Assessment:** BTC is currently near ~$103k (implied from broader market data: 80% chance BTC hits $100k, 45% chance $120k). To hit $150k by June 30 requires a ~46% move in 46 days. While improbable, crypto bull runs can be violent — the 2021 cycle saw similar velocity. With $15.7M in sub-market volume this is well-traded and liquid. At 1¢ the payout is 100×; a realistic probability of ~1.5% implies positive EV. Key risk: if BTC stalls at current levels, this goes to zero quickly. Resolution is clean (Binance BTC/USDT 1-min candle high ≥ $150k). **Best penny-snipe candidate in this scan.**

---

### 5. Russia Nuclear Test by September 30, 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/russia-nuclear-test-by |
| **YES Price** | ~$0.050 (5.0¢) |
| **Resolution Date** | September 30, 2026 |
| **Volume** | Part of ~$665k total market |
| **Market Implied Prob** | 5.0% |
| **Realistic Probability** | 2.5% |
| **Score (realistic_p/price)** | 0.50 |
| **Expected ROI** | −50% |
| **Recommendation** | SKIP |

**Assessment:** Russia has maintained the de facto nuclear test moratorium since 1990. Novaya Zemlya test site has no activation signals. Even post-New START expiration (Feb 2026) and Iran war escalation, geopolitical costs of testing are enormous. Market at 5¢ is outside our 2¢ filter — included for reference. True probability likely 1–2%.

---

### 6. U.S. Nuclear Test by September 30, 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/us-nuclear-test-by |
| **YES Price** | ~$0.060 (6.0¢) |
| **Resolution Date** | September 30, 2026 |
| **Volume** | Part of ~$665k total market |
| **Market Implied Prob** | 6.0% |
| **Realistic Probability** | 2.0% |
| **Score (realistic_p/price)** | 0.33 |
| **Expected ROI** | −67% |
| **Recommendation** | SKIP |

**Assessment:** Trump directed Pentagon to prepare for test resumption (Oct 2025) but faces RESTRAIN Act pushback, years-long facility certification timeline, and political costs. Outside our price filter. Noted for context; not actionable at 6¢.

---

### 7. Will Trump Be Impeached by June 30, 2026?

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/will-trump-be-impeached-by-june-30 |
| **YES Price** | ~$0.050 (5.0¢) |
| **Resolution Date** | June 30, 2026 |
| **Volume** | Active |
| **Market Implied Prob** | 5.0% |
| **Realistic Probability** | 2.0% |
| **Score (realistic_p/price)** | 0.40 |
| **Expected ROI** | −60% |
| **Recommendation** | SKIP |

**Assessment:** Requires House floor vote passing articles of impeachment. GOP controls House; no Speaker motion scheduled or signaled. Outside our 2¢ filter. Noted for context.

---

### 8. Hantavirus Pandemic in 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/hantavirus-pandemic-in-2026 |
| **YES Price** | ~$0.070 (7.0¢) |
| **Resolution Date** | December 31, 2026 |
| **Volume** | ~$10M |
| **Market Implied Prob** | 7.0% |
| **Realistic Probability** | 2.0% |
| **Score (realistic_p/price)** | 0.29 |
| **Expected ROI** | −71% |
| **Recommendation** | SKIP |

**Assessment:** Hantavirus is not efficiently human-to-human transmissible; WHO pandemic declaration requires sustained community spread across multiple countries. Cruise ship outbreak (early 2026) drove initial panic but has not escalated to pandemic-level. Price has dropped from 38% peak to 7% — already corrected significantly. Outside our price filter.

---

### 9. New Coronavirus Pandemic in 2026

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/new-coronavirus-pandemic-in-2026 |
| **YES Price** | ~$0.100 (10.0¢) |
| **Resolution Date** | December 31, 2026 |
| **Volume** | Moderate |
| **Market Implied Prob** | 10.0% |
| **Realistic Probability** | 3.0% |
| **Score (realistic_p/price)** | 0.30 |
| **Expected ROI** | −70% |
| **Recommendation** | SKIP |

**Assessment:** No new SARS-CoV variant with pandemic potential identified. WHO surveillance active. Outside filter range. Noted for completeness.

---

### 10. Iran Nuke Before 2027

| Field | Value |
|---|---|
| **Market URL** | https://polymarket.com/event/iran-nuke-before-2027 |
| **YES Price** | ~$0.090 (9.0¢) |
| **Resolution Date** | December 31, 2026 |
| **Volume** | Active |
| **Market Implied Prob** | 9.0% |
| **Realistic Probability** | 3.0% |
| **Score (realistic_p/price)** | 0.33 |
| **Expected ROI** | −67% |
| **Recommendation** | SKIP |

**Assessment:** US-Israel strikes degraded (but didn't destroy) Natanz and Isfahan. Iranian breakout time still 9–12 months per US intel (May 2026). Even with weapons-grade uranium, weaponization and test take additional months. Outside our price filter.

---

## Summary Table

| Rank | Market | Price | Res. Date | Realistic p | Score | Rec |
|---|---|---|---|---|---|---|
| 1 | Bitcoin $150k by Jun 30 | 1.0¢ | 2026-06-30 | 1.5% | **1.50** | SMALL BET |
| 2 | Trump Out by Jun 30 | 1.3¢ | 2026-06-30 | 1.0% | 0.77 | SKIP |
| 3 | China Invades Taiwan by Jun 30 | 2.0¢ | 2026-06-30 | 1.5% | 0.75 | WATCH |
| 4 | Putin Out by Jun 30 | 2.0¢ | 2026-06-30 | 1.2% | 0.60 | SKIP |
| 5 | Russia Nuclear Test by Sep 30* | 5.0¢ | 2026-09-30 | 2.5% | 0.50 | SKIP |
| 6 | Trump Impeached by Jun 30* | 5.0¢ | 2026-06-30 | 2.0% | 0.40 | SKIP |
| 7 | US Nuclear Test by Sep 30* | 6.0¢ | 2026-09-30 | 2.0% | 0.33 | SKIP |
| 8 | Iran Nuke Before 2027* | 9.0¢ | 2026-12-31 | 3.0% | 0.33 | SKIP |
| 9 | Hantavirus Pandemic 2026* | 7.0¢ | 2026-12-31 | 2.0% | 0.29 | SKIP |
| 10 | New COVID Pandemic 2026* | 10.0¢ | 2026-12-31 | 3.0% | 0.30 | SKIP |

*Outside 0.1¢–2¢ filter; included for context as near-penny markets

---

## Key Finding

Only **one market** (BTC $150k by Jun 30) falls cleanly within the 1¢–2¢ filter with a positive expected-value case (Score > 1.0). Two others (Trump Out, China-Taiwan Jun 30) hit the 2¢ ceiling but show negative EV.

The scan reveals the penny-snipe opportunity landscape is thin today — most tail-risk markets have already re-priced above 5¢ following Iran war escalation and hantavirus news cycles. The BTC $150k June 30 market stands out because:
1. It's at exactly 1¢ with massive ($15.7M) volume = real liquidity
2. Crypto volatility makes the 1.5% realistic probability credible
3. Resolution is objective and clean (Binance candle data)
4. 46-day window with a 46% required move — aggressive but not absurd in a bull market

**Cam should set a price alert for BTC approaching $120k, at which point the June 30 $150k probability would increase sharply and this market could be exited at 5–10× entry price.**

---

## Data Quality Warning

- API access was blocked; all prices sourced from web search / news aggregation
- Prices may be 12–48h stale; verify on Polymarket before any action
- Some markets (esp. nuclear sub-dates) have narrow bid-ask spreads — check order book depth before sizing

---

*Scan generated by Claude Code agent. WATCH ONLY — no bets placed.*
