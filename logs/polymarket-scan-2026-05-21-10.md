# Polymarket Penny-Snipe Scan — 2026-05-21 10:00 UTC

**Scanner:** Claude (automated, WATCH-only mode)
**Scope:** Active markets priced $0.001–$0.02 (0.1¢–2¢) paying $1.00 on YES resolution
**Data Source:** Polymarket public pages + web search aggregation (API IP-blocked from this host)
**Note:** Polymarket's gamma-api.polymarket.com and clob.polymarket.com return HTTP 403 ("host not in allowlist") from this server's IP. All prices sourced from search snippets, Lines.com analyses, and mlq.ai data — treat as approximate. Recommend verifying live on polymarket.com before any action.

---

## Methodology

- Searched for active Polymarket markets with publicly-reported YES prices of $0.001–$0.02
- Scored by: `score = realistic_probability × (1 / market_price)`
  - `realistic_probability` = analyst's estimate of true event probability (not necessarily market price)
  - Higher score = better expected value relative to cost
- Ranked top 10 candidates

---

## Top 10 Penny-Snipe Candidates

### #1 — Uzbekistan to Win 2026 FIFA World Cup (Outright)
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/2026-fifa-world-cup-winner-595 |
| **YES Price** | ~$0.002 (0.2¢) |
| **Resolution Date** | ~Jul 19, 2026 |
| **Volume** | ~$39.9M total market |
| **Liquidity** | High (within large multi-outcome market) |

**Probability Assessment:** Uzbekistan is a first-time World Cup qualifier. Drawn in Group K with Portugal (67%) and Colombia (30%), realistic chance of winning the whole tournament is near-zero — scientifically ~0.1-0.3%. The market at 0.2¢ is actually fairly priced or even slightly generous given no pathway is realistic unless all favorites collapse.

**Score:** 0.002 × (1/0.002) = **1.0** *(at breakeven with realistic p; market is not mispriced)*

**ROI (if YES):** 49,900% ($1.00 return on $0.002 stake)

**Recommendation:** SKIP — market price ≈ true probability; no edge. Good for tiny lottery-ticket fun only.

---

### #2 — DR Congo to Win 2026 FIFA World Cup (Outright)
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/2026-fifa-world-cup-winner-595 |
| **YES Price** | ~$0.002 (0.2¢) |
| **Resolution Date** | ~Jul 19, 2026 |
| **Volume** | ~$17.0M total market |

**Probability Assessment:** DR Congo qualified by beating Nigeria, showing genuine quality. Group K features Portugal and Colombia as near-certain qualifiers; DR Congo would need to win or survive the group, then run a 6-game gauntlet. True win probability ~0.1-0.4%. At 0.2¢ there may be slight value if you believe DR Congo can exploit the Uzbekistan match to advance, but the outright is a stretch.

**Score:** 0.003 × (1/0.002) = **1.5** *(small positive edge possible)*

**ROI (if YES):** 49,900%

**Recommendation:** WATCH — marginally interesting if DR Congo beats Uzbekistan (the only realistic win) and draws a favorable knockout bracket. $1 stake = $500 if they somehow win it all.

---

### #3 — Haiti to Win FIFA World Cup 2026 Group C
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/fifa-world-cup-group-c-winner |
| **YES Price** | ~$0.005 (0.5¢) |
| **Resolution Date** | ~Jun 27, 2026 |
| **Volume** | Active group market |

**Probability Assessment:** Group C: Brazil (76.5%), Morocco (18.5%), Scotland (5.3%), Haiti (~0.5%). Brazil is the heavy favorite. Haiti's World Cup preparations have been chaotic (home games played overseas due to gang violence). True probability of winning the group ≈ 0.3-0.8%. Market at 0.5¢ is borderline priced.

**Score:** 0.005 × (1/0.005) = **1.0** *(roughly fair)*

**ROI (if YES):** 19,900%

**Recommendation:** SKIP — no real edge; Haiti faces Brazil as likely first match. True p roughly matches market price.

---

### #4 — New Zealand to Win FIFA World Cup 2026 Group G
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/fifa-world-cup-group-g-winner |
| **YES Price** | ~$0.028 (2.8¢) — slightly above 2¢ ceiling |
| **Resolution Date** | ~Jun 27, 2026 |
| **Volume** | Active group market |

**Probability Assessment:** Group G: Belgium (68.4%), Egypt (17.5%), Iran (10.2%), New Zealand (2.8%). NZ is FIFA rank ~86, led by Chris Wood. Genuinely a 1.5-3% shot at winning the group — market price is fairly calibrated. Note: this is just above the 2¢ scan ceiling.

**Score:** 0.02 × (1/0.028) = **0.71** *(below fair value)*

**ROI (if YES):** 3,471%

**Recommendation:** SKIP — priced above our 2¢ ceiling; no edge.

---

### #5 — Hantavirus Lab Leak Confirmed by June 30
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/hantavirus-lab-leak-confirmed-by-june-30-1 |
| **YES Price** | ~$0.02–$0.03 (2–3¢, fluctuating) |
| **Resolution Date** | Jun 30, 2026 |
| **Volume** | ~$213K traded |

**Probability Assessment:** Requires WHO or official body to confirm hantavirus originated from a lab by June 30. No credible intelligence indicates a lab origin for current cluster (cruise ship-linked Andes hantavirus cases). Lab leak confirmation in 40 days is genuinely implausible — realistic probability ~0.5-1.5%. If currently at 2¢, this offers mild positive expected value since 0.5¢-1¢ of that is speculative premium. Short time window is both a risk (it resolves soon at NO) and an edge — if you believe p > 2%, it's a buy.

**Score:** 0.01 × (1/0.02) = **0.5** *(slight negative EV at 2¢ if true p ~1%)*

**ROI (if YES):** 4,900%

**Recommendation:** WATCH — check live price. If it has drifted to 1¢ it becomes interesting. At 2¢+ with ~1% realistic probability, slight negative EV.

---

### #6 — Russia Nuclear Test by June 30, 2026
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/russia-nuclear-test-by |
| **YES Price** | ~$0.02–$0.03 (estimated ~2¢ for the June 30 outcome) |
| **Resolution Date** | Jun 30, 2026 |
| **Volume** | ~$1.4M total market |

**Probability Assessment:** Russia hasn't tested a nuclear device since 1990 and faces CTBTO monitoring. The September date is at 5% and December at 8%, implying June 30 (nearer) is priced lower — likely 1-3¢. True probability of Russia testing by June 30 is ~1-2% (40 days remain, no signs of test preparation activity, only missile launch exercises). Could be near fair or slightly overpriced. No strong catalyst.

**Score:** 0.015 × (1/0.02) = **0.75**

**ROI (if YES):** ~4,900%

**Recommendation:** WATCH — if June 30 outcome is priced at 1¢, it may have marginal value since 1-2% true probability at 1¢ = positive EV. Verify current price on-chain.

---

### #7 — US Nuclear Test by June 30, 2026
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/us-nuclear-test-by |
| **YES Price** | ~$0.06 (6¢) — above 2¢ ceiling |
| **Resolution Date** | Jun 30, 2026 |
| **Volume** | ~$665K total market |

**Probability Assessment:** US has maintained test moratorium since 1992. Trump directed preparation studies but no action taken. Congressional opposition via RESTRAIN Act. True probability by June 30: ~1-2%. Market at 6¢ looks significantly overpriced vs true probability — but this is ABOVE our 2¢ ceiling so it doesn't qualify as a penny snipe. Better as a NO bet.

**Score:** N/A (price above 2¢ threshold)

**Recommendation:** SKIP for YES; potentially interesting as a NO bet (price of NO ≈ 94¢ vs true ~98%). Not in scope for penny-snipe strategy.

---

### #8 — 1-Megaton Meteor Strike in 2026
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/1-megaton-meteor-strike-in-2026 |
| **YES Price** | ~$0.04 (4¢) — above 2¢ ceiling |
| **Resolution Date** | Dec 31, 2026 |
| **Volume** | ~$106K |

**Probability Assessment:** Scientific baseline for a 1-megaton airburst in any given year is ~1-in-500 (0.2%). Market at 4¢ is ~20x overpriced vs scientific estimate. However, the definition may include smaller interpretations. Above our 2¢ ceiling.

**Score:** N/A (price above threshold)

**Recommendation:** SKIP for YES penny-snipe. The NO side (96¢ price, true ~99.8%) offers value, not the YES.

---

### #9 — Hantavirus Outbreak by June 30 (PHEIC Declaration)
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/hantavirus-outbreak-by-june-30 |
| **YES Price** | ~$0.04 (4¢) — above 2¢ ceiling |
| **Resolution Date** | Jun 30, 2026 |
| **Volume** | ~$39K |

**Probability Assessment:** Requires WHO PHEIC declaration for hantavirus by June 30. Only 11 cruise-ship linked Andes hantavirus cases documented, no community spread. True probability ~0.5-1.5%. At 4¢, the market overprices this relative to true probability. Not in penny-snipe range.

**Score:** N/A (price above threshold)

**Recommendation:** SKIP for YES. Potentially interesting as a NO (96¢ → ~99% probability, ~4% upside).

---

### #10 — DR Congo/Uzbekistan to Win World Cup Group K
| Field | Value |
|---|---|
| **Market URL** | polymarket.com/event/fifa-world-cup-group-k-winner |
| **YES Price** | ~$0.015–$0.02 (estimated ~1.5¢–2¢ for each, split of ~3% remaining) |
| **Resolution Date** | Jun 27, 2026 |
| **Volume** | Active group stage market |

**Probability Assessment:** Portugal (67%) + Colombia (30%) dominate. DR Congo and Uzbekistan share ~3% implied probability between them. True probability for each is ~1-2% — they face each other in the final group game, so one of them will win that match. DR Congo has better pedigree (beat Nigeria in qualifying). If the market prices each at ~1.5¢, there's a scenario where DR Congo beating Uzbekistan + a Colombia stumble against Portugal could yield a surprise 2nd-place finish. Not realistic for group winner but not 0%.

**Score (DR Congo):** 0.02 × (1/0.015) = **1.33** *(potential positive EV)*

**ROI (if YES):** ~6,567%

**Recommendation:** SMALL BET (micro-stake) — DR Congo specifically has slightly better realistic odds than market implies (~2% true vs ~1.5¢ market). $5 stake = $333 if DR Congo tops the group. Pure lottery; verify live price.

---

## Summary Table

| Rank | Market | Price | Resolution | Realistic p | Score | Rec |
|------|--------|-------|------------|-------------|-------|-----|
| 1 | Uzbekistan WC Winner (Outright) | 0.2¢ | Jul 19, 2026 | ~0.2% | 1.0 | SKIP |
| 2 | DR Congo WC Winner (Outright) | 0.2¢ | Jul 19, 2026 | ~0.3% | 1.5 | WATCH |
| 3 | Haiti WC Group C Winner | 0.5¢ | Jun 27, 2026 | ~0.5% | 1.0 | SKIP |
| 4 | New Zealand WC Group G Winner | 2.8¢* | Jun 27, 2026 | ~2% | 0.71 | SKIP |
| 5 | Hantavirus Lab Leak by Jun 30 | 2–3¢ | Jun 30, 2026 | ~1% | 0.5 | WATCH |
| 6 | Russia Nuclear Test by Jun 30 | ~2¢ est | Jun 30, 2026 | ~1.5% | 0.75 | WATCH |
| 7 | US Nuclear Test by Jun 30 | 6¢* | Jun 30, 2026 | ~1% | — | SKIP |
| 8 | 1-Megaton Meteor Strike 2026 | 4¢* | Dec 31, 2026 | ~0.2% | — | SKIP |
| 9 | Hantavirus Outbreak by Jun 30 | 4¢* | Jun 30, 2026 | ~1% | — | SKIP |
| 10 | DR Congo WC Group K Winner | ~1.5¢ est | Jun 27, 2026 | ~2% | 1.33 | SMALL BET |

*\* Above 2¢ ceiling — shown for context*

---

## Key Findings

### Markets in the 0.1¢–2¢ Range (True Penny Snipes)
Only a handful of markets currently trade in the true 0.1¢–2¢ zone:

1. **World Cup outright winner longshots** (Uzbekistan, DR Congo at ~0.2¢) — widely distributed market; no strong edge over scientific probability.
2. **World Cup group stage extreme underdogs** (Haiti ~0.5¢, potentially DR Congo/Uzbekistan in Group K at ~1.5¢).
3. **Hantavirus lab leak / Russia nuclear test near-term outcomes** — these hover around the 2¢ boundary.

### Edge Assessment
- Most penny markets are fairly priced or even slightly overpriced relative to true probability (the market is efficient at the extremes).
- **Best potential edge:** DR Congo to win Group K (~1.5¢ if confirmed) — they have a real match against Uzbekistan where winning is plausible, which creates a path to a group surprise. $5 → $333 is the bet.
- **Biggest red flag:** US/Russia nuclear tests by June 30 are priced at 6¢ and ~2¢ respectively, but true probabilities are ~1-2%. The YES is overpriced, but these markets are too wide to arb efficiently.

### Data Limitations
- **API Access Blocked:** Polymarket's gamma-api.polymarket.com returns `host_not_allowed` from this server. All prices sourced from search engine snippets and third-party sites.
- **Price Staleness:** Some prices cited from articles dated May 12-20, 2026. Market prices shift continuously — verify before any action.
- **Missing Coverage:** Crypto binary markets (BTC at specific targets), short-dated sports props, and weather markets were not scanned due to API access issues. These categories may contain additional penny opportunities.

### Next Steps for Cam
1. Verify live prices at [polymarket.com](https://polymarket.com) — especially the DR Congo Group K outcome and hantavirus lab leak market.
2. If DR Congo Group K is at ≤1.5¢, consider a micro-stake ($1-5) as a calculated lottery.
3. Set up local API access from a non-blocked IP (e.g., home machine or VPS) to run automated scans via `gamma-api.polymarket.com`.
4. Consider scanning crypto sub-cent options on BTC monthly range markets (these often have many outcomes at 0.5¢–2¢).

---

## Sources
- [Polymarket 2026 FIFA World Cup Winner](https://polymarket.com/event/2026-fifa-world-cup-winner-595)
- [Polymarket World Cup Group K](https://polymarket.com/event/fifa-world-cup-group-k-winner)
- [Polymarket World Cup Group C](https://polymarket.com/event/fifa-world-cup-group-c-winner)
- [Polymarket World Cup Group G](https://polymarket.com/event/fifa-world-cup-group-g-winner)
- [Polymarket Hantavirus Lab Leak by Jun 30](https://polymarket.com/event/hantavirus-lab-leak-confirmed-by-june-30-1)
- [Polymarket Russia Nuclear Test](https://polymarket.com/event/russia-nuclear-test-by)
- [Polymarket US Nuclear Test](https://polymarket.com/event/us-nuclear-test-by)
- [Polymarket 1-Megaton Meteor Strike 2026](https://polymarket.com/event/1-megaton-meteor-strike-in-2026)
- [Polymarket Hantavirus Outbreak by Jun 30](https://polymarket.com/event/hantavirus-outbreak-by-june-30)
- [Lines.com — Megaton Meteor Strike 2026 Analysis](https://www.lines.com/prediction-markets/science/1-megaton-meteor-strike-in-2026)
- [Lines.com — Hantavirus Lab Leak Analysis](https://www.lines.com/prediction-markets/pop-culture/hantavirus-lab-leak-confirmed-by-june-30-1)
- [DeFi Rate — 2026 World Cup Power Rankings](https://defirate.com/news/2026-world-cup-power-rankings-kalshi-vs-polymarket/)
- [DeFi Rate — Group G Odds](https://defirate.com/prediction-markets/world-cup-odds/group-g/)
- [mlq.ai — 1 Megaton Meteor Strike Data](https://mlq.ai/prediction/market/1-megaton-meteor-strike-in-2026/)
- [Polymarket Agents Gamma API Code](https://github.com/Polymarket/agents/blob/main/agents/polymarket/gamma.py)

---

*Scan completed: 2026-05-21 ~10:40 UTC | WATCH-ONLY mode — no positions taken*
