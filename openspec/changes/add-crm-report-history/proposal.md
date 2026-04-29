# Proposal: add monthly CRM history and comparison layer

## Summary

Add a second phase to the PETS CRM that stores monthly snapshots and compares them by contact so the team can review:

- who was due to expire in a prior month
- whether those contacts are still active later
- whether a contact has dropped out of the CRM
- whether a contact should be reactivated with a different message type

## Why this is needed

The base CRM is the operational layer for day-to-day outreach. Once that exists, the team needs a history layer to answer month-over-month questions without rebuilding the CRM manually.

Examples:

- In February, who was due to expire?
- In March, are those same contacts still active?
- If they are no longer active, should they be treated as lost, reactivated, or moved to a different queue?

## Scope

This change only defines the history/comparison layer. It does not replace the base CRM.

## Out of scope

- Reworking the base contact form
- Replacing the SMS launch flow
- Adding new outreach channels beyond the current CRM design
