# Design: monthly CRM history and comparison layer

## Goal

Keep one monthly snapshot per period and compare snapshots by contact ID.

## Data model

Each snapshot row should include:

- `contact_id`
- `month`
- `status`
- `next_step`
- `owner`
- `last_contact_date`
- `consumption_month`
- `expiry_month`
- `source_snapshot`

The key for comparison is the stable `contact_id`.

## Comparison outputs

The comparison layer should produce:

- new contacts
- removed contacts
- contacts that changed stage
- contacts that changed consumption
- contacts that moved from active to expired
- contacts that were expiring in a prior month and are still unresolved

## Message strategy

The history layer should support message segmentation by outcome:

- expiring now
- no consumption
- prior expiring and still active
- lost / reactivation
- already recovered

## Operational rule

The base CRM remains the source of truth for daily work.
The history layer only reads monthly snapshots and writes comparison artifacts.
