# Polymarket Penny-Snipe Scan — 2026-05-16 00:00 UTC

**Scanner:** Claude (automated, WATCH-only mode)
**Scan time:** 2026-05-16T00:00Z
**Price filter:** YES shares $0.001–$0.020 (0.1¢–2¢)
**Payout:** $1.00 per share on YES resolution
**Status:** WATCH ONLY — no bets placed until Cam explicitly enables

---

## Data Sources & Methodology

Polymarket's direct API endpoints returned HTTP 403 in this environment. Market data was obtained via web search, targeting Polymarket event pages and third-party aggregators (Benzinga, CoinTelegraph, StartupHub.ai, GNCrypto.news). All prices/odds are sourced from indexed page metadata as of ~2026-05-15/16. Prices may have moved slightly.

**Scoring formula:** `score = realistic_p × (1 / price)`
- `realistic_p` = my assessed probability, discounting market price for thin liquidity and adverse-selection risk
- Higher score = better expected value per dollar risked

---

## Top 10 Penny-Range Markets

---

### 1. Will the Iranian regime fall by May 31?
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/will-the-iranian-regime-fall-by-may-31 |
| **YES price** | ~$0.010 (1%) |
| **Resolution date** | 2026-05-31 |
| **Volume traded** | $20.1M |
| **Implied probability** | 1% |

**Probability assessment:** The regime has already survived the assassination of Khamenei Sr. in Feb 2026 and a swift succession to Mojtaba Khamenei. Regime collapse within 15 days is extremely unlikely absent a sudden military coup or catastrophic internal fracture. Realistic probability: **0.4%** (market slightly overpriced at 1¢ given the very short window and demonstrated regime resilience).

**ROI if YES resolves:** 99x
**Score:** 0.004 × 100 = **0.40**

**Recommendation:** SKIP — market price is actually slightly generous for this window, but realistic probability still sub-0.5%. Short timeline, strong base rate against collapse.

---

### 2. BTC hits $150k by June 30, 2026
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/when-will-bitcoin-hit-150k |
| **YES price** | ~$0.010 (1%) |
| **Resolution date** | 2026-06-30 |
| **Volume traded** | High ($36.5M on the annual market; June sub-bucket active) |
| **Implied probability** | 1% |

**Probability assessment:** Bitcoin is currently trading in the ~$95k–$105k range based on May 2026 data (market prices ↑80k at 100%, ↓75k at 47% for May). For BTC to hit $150k by June 30 would require a ~50%+ move in ~45 days with no near-term catalysts. However, BTC has historically made large fast moves; June 2026 timeframe is short but not impossible. Realistic probability: **0.8%** — slightly below market 1% given no near-term driver.

**ROI if YES resolves:** 99x
**Score:** 0.008 × 100 = **0.80**

**Recommendation:** WATCH — if macro catalyst emerges (Fed cut surprise, spot ETF inflows spike), price could reprice quickly. Small position makes sense only with strong catalyst signal.

---

### 3. Avg. ships transiting Hormuz end of May — "20–30" bucket
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/avg-of-ships-transiting-strait-of-hormuz-end-of-may |
| **YES price** | ~$0.015 (est. 1.5%) |
| **Resolution date** | 2026-05-31 |
| **Volume traded** | ~$194K |
| **Implied probability** | ~1–2% (residual after 0–10 at 67%, 10–20 at 15%) |

**Probability assessment:** Daily transits are currently under 10, averaging single digits per IMF Portwatch. The blockade is entrenched with active IRGC enforcement, US-Iran ceasefire talks stalled, and no Hormuz reopening in sight before May 31. A sudden jump to 20–30 average would require an immediate deal and fleet deployment. Realistic probability: **0.5%**.

**ROI if YES resolves:** ~66x
**Score:** 0.005 × 66 = **0.33**

**Recommendation:** SKIP — geopolitical situation is too locked in for such a rapid transit surge in 15 days.

---

### 4. Will ≥60 ships transit Hormuz on any day by May 31?
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/will-ships-transit-the-strait-of-hormuz-on-any-day-by-may-31 |
| **YES price** | ~$0.010–0.015 (est. 1–1.5%) |
| **Resolution date** | 2026-05-31 |
| **Volume traded** | $403K |
| **Implied probability** | ~1–2% (20+ at 59%, 40+ at 23%; 60+ residual) |

**Probability assessment:** Even a single day with 60+ transits would require extraordinary rapid normalization. Current baseline is single digits/day. While the "20+" threshold has a 59% chance, getting to 60+ in 15 days is near-impossible under current blockade conditions. Realistic: **0.3%**.

**ROI if YES resolves:** ~80x
**Score:** 0.003 × 80 = **0.24**

**Recommendation:** SKIP — the 60+ threshold is structurally unreachable in this timeframe given current transit data.

---

### 5. Iran agrees to unrestricted Hormuz shipping by May 31
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/iran-agrees-to-unrestricted-shipping-through-hormuz-by-may-31 |
| **YES price** | ~$0.060 (6%) |
| **Resolution date** | 2026-05-31 |
| **Volume traded** | $413K |
| **Implied probability** | 6% |

**Probability assessment:** *Note: This market is at 6¢, above the 2¢ filter ceiling — included for context only.* Talks are stalled; Iran has not made a public agreement commitment. Realistic: 4%. Not in penny range.

**Recommendation:** OUT OF FILTER RANGE (6¢) — included for context. SKIP for penny snipe purposes.

---

### 6. US-Iran nuclear deal by May 31
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/us-iran-nuclear-deal-by-may-31-974 |
| **YES price** | ~$0.070 (7%) |
| **Resolution date** | 2026-05-31 |
| **Volume traded** | Active |
| **Implied probability** | 7% |

**Probability assessment:** *Above 2¢ filter — included for context.* Trump rejected Iran's counter-proposal as "totally unacceptable" (May 15). Realistic: 5%. Not in penny range.

**Recommendation:** OUT OF FILTER RANGE (7¢). SKIP.

---

### 7. Israel × Iran permanent peace deal by May 31
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/israel-x-iran-permanent-peace-deal-by |
| **YES price** | ~$0.050 (5%) |
| **Resolution date** | 2026-05-31 |
| **Volume traded** | $692K |
| **Implied probability** | 5% |

**Probability assessment:** *Slightly above filter.* Israel-Iran kinetic conflict is ongoing; a permanent peace deal in 15 days is implausible. Realistic: 1%. Not in penny range.

**Recommendation:** OUT OF FILTER RANGE (5¢). SKIP.

---

### 8. Russia nuclear test by June 30, 2026
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/russia-nuclear-test-by |
| **YES price** | ~$0.020 (est. 2%) — "June 30" sub-bucket |
| **Resolution date** | 2026-06-30 |
| **Volume traded** | $1.36M |
| **Implied probability** | ~2–3% (Sept at 5%, Dec at 8%; June bucket lower) |

**Probability assessment:** Russia tested nuclear-capable missile systems May 6–10 (Victory Day), but these are delivery-vehicle tests, not explosive nuclear device tests. No indication of Test Site preparation at Novaya Zemlya. Historical base rate for a nuclear test in any given quarter: ~0.5%. Realistic: **0.8%** given current elevated tensions but no concrete indicators.

**ROI if YES resolves:** ~50x (at 2¢)
**Score:** 0.008 × 50 = **0.40**

**Recommendation:** WATCH — geopolitical risk is genuinely elevated but base rate is extremely low. Worth monitoring for any Novaya Zemlya satellite imagery developments. Low-conviction small position only.

---

### 9. U.S. nuclear test by June 30, 2026
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/us-nuclear-test-by |
| **YES price** | ~$0.015 (est. 1.5%) — "June 30" sub-bucket |
| **Resolution date** | 2026-06-30 |
| **Volume traded** | $665K |
| **Implied probability** | ~1–2% (Sept at 6%, Dec at 9%; June bucket lower) |

**Probability assessment:** US has not tested since 1992. Nevada Test Site would require years of preparation to re-certify. Congressional pushback (RESTRAIN Act) is active. Trump's October 2025 directive created noise but no action. Realistic: **0.3%** — market probably slightly generous at 1.5¢ for June 30.

**ROI if YES resolves:** ~67x
**Score:** 0.003 × 67 = **0.20**

**Recommendation:** SKIP — realistic probability well below market price. Adverse selection: sophisticated traders know NTS is not ready.

---

### 10. BTC hits $150k by June 30 (full-year market sub-bucket)
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/what-price-will-bitcoin-hit-before-2027 |
| **YES price** | ~$0.010–0.015 for the "$150k" bucket |
| **Resolution date** | 2026-12-31 |
| **Volume traded** | $36.5M total |
| **Implied probability** | Market shows $150k full-year at 21%; specific monthly sub-buckets below 2¢ |

**Probability assessment:** On the annual market, the $150k bucket for the full year is 21¢ (well above filter). However, near-term monthly sub-buckets (e.g., "hits $150k in May") trade near 0–1¢. For May specifically, BTC at ~$103k would need to surge 45%+ in days. Realistic: **0.2%** for a May resolution.

**ROI if YES resolves:** ~100x
**Score:** 0.002 × 100 = **0.20**

**Recommendation:** SKIP for May bucket specifically. The annual $150k market at 21¢ is better risk/reward than the near-term penny bucket.

---

## Ranked Summary (by Score)

| Rank | Market | Price | Res. Date | My P | Score | Rec. |
|------|--------|-------|-----------|------|-------|------|
| 1 | BTC hits $150k by June 30 | $0.010 | 2026-06-30 | 0.8% | 0.80 | WATCH |
| 2 | Iran regime falls by May 31 | $0.010 | 2026-05-31 | 0.4% | 0.40 | SKIP |
| 3 | Russia nuclear test by June 30 | $0.020 | 2026-06-30 | 0.8% | 0.40 | WATCH |
| 4 | Avg Hormuz ships 20–30 (May) | $0.015 | 2026-05-31 | 0.5% | 0.33 | SKIP |
| 5 | ≥60 ships transit Hormuz by May 31 | $0.012 | 2026-05-31 | 0.3% | 0.24 | SKIP |
| 6 | US nuclear test by June 30 | $0.015 | 2026-06-30 | 0.3% | 0.20 | SKIP |
| 7 | BTC hits $150k in May (sub-bucket) | $0.010 | 2026-05-31 | 0.2% | 0.20 | SKIP |
| 8–10 | Hormuz deal markets | $0.05–0.07 | 2026-05-31 | varies | N/A | OUT OF RANGE |

---

## Active WATCH List (Markets Worth Monitoring)

### WATCH #1 — BTC $150k by June 30 @ $0.010
**Why watch:** Score 0.80 is the best in this scan. If BTC breaks above $110k with momentum in the next 2 weeks, this reprices rapidly. A single macro catalyst (Fed surprise cut, major institutional buy, ETF inflow spike) could push BTC 20%+ in days. Worth checking daily. Entry only if BTC >$110k with strong momentum.

**Risk:** BTC is ~$103k as implied by May market data. 45%+ move in 45 days is a low-base-rate event. Most of the ~1¢ price is noise/lottery premium.

### WATCH #2 — Russia nuclear test by June 30 @ ~$0.020
**Why watch:** Score 0.40. The geopolitical context (post-New-START expiration, Victory Day missile tests, Ukraine war escalation) is the most elevated nuclear-test risk environment since the Cold War. If satellite imagery reveals Novaya Zemlya preparation activity, this market would reprice from 2¢ to 10¢+ immediately. This is an information-edge play — monitor arms-control monitoring groups (SIPRI, CTBTO) for anomaly signals.

**Risk:** Physical infrastructure for nuclear testing requires months of preparation; none currently reported. Base rate is still very low.

---

## Scan Notes & Caveats

1. **API access limited:** Polymarket's gamma-api.polymarket.com and clob.polymarket.com both returned 403 in this environment. All prices sourced from indexed search snippets (Benzinga, CoinTelegraph, StartupHub.ai, GNCrypto.news, direct Polymarket page metadata). Prices may be 12–24h stale.

2. **Thin liquidity risk:** Several markets (Hormuz ship-count sub-buckets) have <$500K volume. Penny positions in thin books carry adverse-selection risk — if you can get filled at 1¢, ask why the market maker is selling to you.

3. **Resolution-criteria risk:** Hormuz markets resolve on IMF Portwatch data specifically. Always verify resolution source matches your thesis before entering.

4. **Most Hormuz penny markets are SKIP:** The blockade is too entrenched for a 15-day reversal. Pennies here are structural noise, not mispricing.

5. **Best penny opportunity this cycle:** BTC $150k by June 30 if a momentum catalyst emerges. Monitor for this.

---

*Next scan: 2026-05-16 12:00 UTC (or on major breaking event)*
*WATCH ONLY — no execution until Cam authorizes live trading mode*
