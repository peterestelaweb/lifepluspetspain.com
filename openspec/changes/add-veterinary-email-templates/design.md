## Context

`/ventas/` is a static sales console with editable/copyable cards backed by localStorage and the existing `api.php` JSON payload. It currently exposes phone scripts, WhatsApp messages, objections, and product facts. Care & Comfort content already exists in OpenSpec context and the official Spanish product sheet confirms: dog-only, external-use spray, lemongrass oil 4.0%, cinnamon oil 1.0%, andiroba oil 1.0%, castor oil 0.5%, avoid nose/mouth/eyes, may be used daily, and the product is not intended to diagnose, treat, cure, or prevent disease.

Professional email outreach needs more segmentation than WhatsApp because veterinary stakeholders have different motivations: independent clinic owners care about simplicity and differentiation, clinical directors care about responsible positioning, central/group buyers care about risk, rollout, and consistency, reception or practice managers care about who to route the message to, and integrative or family-oriented clinics care about lower-friction household routines.

## Goals / Non-Goals

**Goals:**

- Add a new Email tab to the sales console with profile-specific templates.
- Keep every template copy-ready and editable with the existing card workflow.
- Include subject line, target profile, main email, and follow-up in each template.
- Use only product-sheet-supported claims and cautious household-sensitivity language.
- Support future remote JSON data without requiring a backend schema change.

**Non-Goals:**

- Do not add mass-email sending, CRM automation, tracking pixels, or deliverability tooling.
- Do not claim Care & Comfort replaces veterinary antiparasitic protocols.
- Do not state that the product prevents disease transmission or protects pregnant women from a defined chemical risk.
- Do not alter the CRM data model in this change.

## Decisions

- Store `emails` as a new top-level array in the existing sales-console data object. This avoids backend changes because `api.php` stores arbitrary JSON under the current payload.
- Render emails with the same reusable card component used for WhatsApp and objections. This preserves edit/copy behavior and lowers implementation risk.
- Add a fifth tab rather than mixing emails into WhatsApp. Email templates are longer and need different scanning behavior from short mobile messages.
- Use cautious segmentation labels: independent clinic owner, clinical director, Madrid central/group buyer, practice manager/reception route, integrative/family-sensitive clinic, and follow-up after interest.
- Phrase household sensitivity as preference-based language: "hogares que prefieren reducir exposición innecesaria" and "familias con especial sensibilidad, como embarazo, niños o convivencia con gatos" rather than causal or medical claims.

## Risks / Trade-offs

- Existing local or remote data may not include `emails` → `normalizeData()` must default missing arrays from `createDefaultData()`.
- Users with already customized remote arrays will not automatically receive future changes inside existing arrays if the property exists → acceptable for this change; reset restores defaults.
- Email copy can drift into medical claims during manual edits → include a visible compliance note and safe wording in the default templates.
- Adding a fifth tab can crowd small screens → use responsive tab styling already present and allow wrapping or smaller labels if needed.
