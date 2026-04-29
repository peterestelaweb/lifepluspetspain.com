# Tasks: monthly CRM history and comparison layer

- [ ] Define the monthly snapshot schema and export naming convention.
- [ ] Reserve a storage area for one snapshot per month.
- [ ] Build the month-to-month comparison output keyed by `contact_id`.
- [ ] Add views for:
  - [ ] expiring this month
  - [ ] no consumption
  - [ ] previously expiring and still unresolved
  - [ ] recovered
  - [ ] lost / inactive
- [ ] Add a message segmentation output for each comparison category.
- [ ] Document that this is a second phase after the base CRM is live.
