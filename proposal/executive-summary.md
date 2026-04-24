# Executive Summary

**RFP MC-2026-0417 — Inventory Dashboard Modernization**  
**Submitted by:** [Your Firm]  
**Date:** May 8, 2026  

---

Meridian Components operates a business-critical inventory dashboard across three warehouses, and the system is not delivering on its potential. The Reports module has known defects that have gone unresolved. There is no automated test coverage, which has rightly made IT reluctant to approve further changes. And the operations team — particularly staff managing APAC distribution from Tokyo — lacks capabilities they have already asked for.

We have reviewed the RFP package in full, including the previous vendor's source code and handoff documentation. Our read: the foundation is sound. The stack (Vue 3 / FastAPI) is well-chosen and the core data model is coherent. What is missing is finishing work, test coverage, and one significant net-new capability. This is a scoped engagement with a clear definition of done — not a rebuild.

Our proposed approach addresses Meridian's four required items in priority order:

- **R1 — Reports remediation.** We will conduct an independent audit of the Reports module and document all defects found. Our fixed fee covers remediation of up to 15 defects. Any defects beyond that threshold will be presented to Meridian as a prioritised list with individual effort estimates, and addressed under a separate change order. We will not rely on the previous vendor's incomplete handoff notes.
- **R2 — Restocking recommendations.** We will design and build a new Restocking view that surfaces purchase order recommendations based on current stock levels, demand forecasts, and an operator-supplied budget ceiling — directly addressing the ask from your operations team. The new view will follow the existing application's visual design and technical patterns; no design system changes or architectural departures are included in this scope.
- **R3 — Automated browser testing.** We will establish end-to-end test coverage across all major views (Inventory, Orders, Reports, Spending, Restocking), giving IT the confidence to approve future changes. Selection of the testing framework and definition of specific test scenarios are at our discretion as part of the engagement — we will document our choices and rationale in the deliverable.
- **R4 — Architecture documentation.** We will deliver a current-state architecture overview, independently verified against the actual codebase, suitable for handoff to Meridian IT. Format and tooling are at our discretion.

Desired items (UI modernization, i18n extension, dark mode) are **not included in the scope or budget of this engagement**. We are happy to provide separate estimates for any or all of them, and to deliver against those estimates under a follow-on agreement — but we want to be explicit that they sit outside the current statement of work so there is no ambiguity at delivery.

We are confident in a fixed-fee engagement with clearly defined deliverables. Our proposal includes a phased timeline, pricing assumptions, and relevant experience from comparable engagements.
