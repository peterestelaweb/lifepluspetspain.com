## Why

The current sales console supports calls, WhatsApp, objections, and product facts, but lacks structured email templates for veterinary outreach. LifePlus Pets needs profile-specific emails that help Peter approach small clinics and Madrid central decision-makers with professional, compliant Care & Comfort positioning.

## What Changes

- Add an email section to `/ventas/` with copy-ready templates for common veterinary stakeholder profiles.
- Use Care & Comfort as the lead product and keep the wording aligned with product facts: dog-only, natural external defense support, no permethrin, lemongrass 4.0%, andiroba 1.0%, topical spray use, avoid eyes/nose/mouth.
- Add subtle household-sensitivity language for families that prefer to reduce unnecessary chemical contact, including homes with pregnant women, children, cats, or vulnerable people, without making medical or toxicology guarantees.
- Include subject lines, main email body, and follow-up copy for each profile so the operator can copy and adapt quickly.
- Preserve the existing editable/copyable sales-console workflow.

## Capabilities

### New Capabilities

- `veterinary-email-templates`: Defines profile-based veterinary email templates, safe claim boundaries, required content structure, and copy behavior for the sales console.

### Modified Capabilities

- `campaign`: Adds email as a first-class outreach channel for professional Care & Comfort prospecting.

## Impact

- Affected OpenSpec artifacts: new change under `openspec/changes/add-veterinary-email-templates/`.
- Affected frontend: `ventas/index.html`, `ventas/script.js`, and potentially `ventas/styles.css`.
- Affected content source: LifePlus Pets Care & Comfort product sheet `6697-PI_ES.md` and existing Care & Comfort outreach/context files.
- No backend API schema change is required if the email templates are stored inside the existing JSON payload.
