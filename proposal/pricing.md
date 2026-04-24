# Pricing

**RFP MC-2026-0417 — Inventory Dashboard Modernization**

---

We propose a **fixed-fee engagement** for R1–R4 as described in our technical approach. All fees below are in USD.

## Fixed Fee — Required Scope (R1–R4)

| Item | Description | Fee |
|---|---|---|
| R4 — Architecture documentation | Codebase review, architecture diagram, written narrative | $10,000 |
| R1 — Reports remediation | Audit + defect register + resolution of up to 15 defects | $18,000 |
| R2 — Restocking view | Backend endpoint + frontend view + integration | $32,000 |
| R3 — Automated browser testing | Playwright suite for all major views + CI setup | $15,000 |
| **Total (R1–R4)** | | **$75,000** |

Fixed fee is not-to-exceed. Work performed within the scope defined in our technical approach will not generate additional charges.

---

## Optional Scope — Desired Items (D1–D3)

The items below are **not included** in the engagement above. Estimates are provided for Meridian's planning purposes and would be delivered under a separate agreement.

| Item | Description | Indicative Estimate |
|---|---|---|
| D1 — UI modernization | Polish pass on existing design (spacing, consistency, typography) | $12,000–$18,000 |
| D2 — Internationalization | Extend i18n to remaining modules; Japanese (ja) locale | $10,000–$15,000 |
| D3 — Dark mode | Operator-selectable theme; CSS variable approach | $8,000–$12,000 |

Indicative estimates assume delivery after R1–R4 are complete and the codebase is in its final state. Estimates will be refined at the time of engagement.

---

## Payment Terms

| Milestone | Amount |
|---|---|
| Engagement start | 30% ($22,500) |
| Phase 1 complete — defect register delivered | 20% ($15,000) |
| Phase 3 complete — Restocking view accepted | 30% ($22,500) |
| Phase 4 complete — final handover | 20% ($15,000) |

---

## Cost Reduction Options

If Meridian needs to reduce the engagement fee, the following options are available. Each trades scope or effort for savings — we present them transparently so Meridian can make an informed decision.

| Option | Saving | Trade-off |
|---|---|---|
| **Reduce R1 defect cap to 10** | ~$4,000 | Fewer defects resolved in scope; remainder priced as change order if needed |
| **Narrow R3 to changed views only** | ~$5,000 | Tests cover Reports and Restocking only — not Inventory, Orders, Spending. Lower confidence baseline for IT. |
| **Defer R4 to self-serve** | ~$7,000 | We provide raw findings from our audit; Meridian IT produces the formatted documentation themselves |
| **R2 MVP only (no budget ceiling logic)** | ~$8,000 | Restocking view lists low-stock items and suggested quantities, but does not apply an operator-supplied budget ceiling — that logic added later under follow-on |

Options can be combined. For example, narrowing R3 + deferring R4 would reduce the total to approximately **$63,000** — a saving of $12,000 against the full scope.

We recommend discussing any reductions before contract signature so the statement of work reflects the agreed scope precisely.

---

## Assumptions

- Pricing is based on remote delivery. On-site travel is not included and would be quoted separately if required.
- Scope changes requested by Meridian after Phase 1 will be assessed and priced as change orders before work begins.
- The defect cap for R1 (15 items) is the basis for the fixed fee. If the audit identifies more than 15 defects, the additional items will be priced as a change order before Phase 2 begins.
