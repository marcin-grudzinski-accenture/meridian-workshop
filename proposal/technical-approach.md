# Technical Approach

**RFP MC-2026-0417 — Inventory Dashboard Modernization**

---

We have reviewed the full RFP package including the previous vendor's source code and handoff documentation. Our assessment: the application's foundation is sound — the Vue 3 / FastAPI stack is well-chosen, the data model is coherent, and the core views are functional. The work required is finishing work, test coverage, and one net-new capability. Our approach is additive; we are not proposing a rebuild.

---

## R1 — Reports Module Remediation

**Methodology.** We will begin with an independent audit of the Reports module, conducted against the live codebase — not the previous vendor's handoff notes, which are incomplete. The audit will produce a defect register: each issue documented with description, affected component, reproduction steps, and proposed resolution.

**Remediation.** Our fixed fee covers resolution of up to 15 defects. Known categories include filter wiring gaps (filters not correctly applied to API queries), internationalization omissions, API response pattern inconsistencies, and extraneous console noise. We will prioritise by operational impact in consultation with Meridian's operations team.

**Scope protection.** If the audit identifies more than 15 defects, we will present the remainder as a prioritised list with individual effort estimates. Those items will be addressed under a separate change order — they are not included in this engagement's fee.

**Deliverable.** Updated Reports module with all in-scope defects resolved, plus a defect register showing before/after status for each item.

---

## R2 — Restocking Recommendations View

**What it does.** A new Restocking view that surfaces purchase order recommendations for each SKU based on three inputs: current stock level, demand forecast, and an operator-supplied budget ceiling. Operators enter a budget ceiling and receive a ranked list of recommended orders — what to buy, how much, and from which supplier — that maximises coverage within the constraint.

**Design.** The new view will follow the existing application's visual design and component patterns exactly. It will use the same slate/gray design tokens, the same Vue 3 Composition API patterns used in other views, and the same filter system where applicable. No new UI framework, no design system changes.

**Data.** The view will consume the existing `/api/inventory` and `/api/demand` endpoints. We will add a new `/api/restock` endpoint to the FastAPI backend to encapsulate the recommendation logic, consistent with the existing API surface pattern.

**Deliverable.** A working Restocking view fully integrated into the dashboard navigation.

---

## R3 — Automated Browser Testing

**Framework.** We will use Playwright — the current industry standard for end-to-end browser testing, with headless execution, cross-browser support, and strong CI integration. Framework selection is at our discretion; this choice will be documented in the deliverable.

**Coverage.** Tests will cover all major views: Inventory, Orders, Reports, Spending, and the new Restocking view. For each view we will cover the primary happy-path flow and key filter interactions. Specific scenario selection is at our discretion; we will document the rationale for each test included and excluded.

**Deliverable.** A Playwright test suite checked into the repository, runnable in CI, with documented setup and execution instructions.

---

## R4 — Architecture Documentation

**Approach.** We will conduct an independent review of the actual codebase and produce the architecture documentation from first principles. We will not forward the previous vendor's handoff notes — those are acknowledged to be incomplete and will not satisfy Meridian IT's needs for ongoing maintenance.

**Content.** The documentation will cover: technology stack and version inventory, frontend component structure, backend API surface (all endpoints, filters, and response shapes), data flow from UI interaction to JSON data layer, and deployment topology.

**Format.** We will deliver a self-contained HTML file with an interactive architecture diagram and written narrative. Format is at our discretion; we will produce whatever format best serves Meridian IT's handoff needs.

**Deliverable.** Architecture documentation suitable for handoff to Meridian IT, verifiable against the delivered codebase.

---

## Out of Scope

The desired items — D1 (UI modernization), D2 (i18n extension), D3 (dark mode) — are **not included in the scope or budget of this engagement**. We are prepared to provide separate estimates for any or all of them upon request, and to deliver against those estimates under a follow-on agreement.

The fixed fee described in our pricing section covers R1 through R4 as specified above.
