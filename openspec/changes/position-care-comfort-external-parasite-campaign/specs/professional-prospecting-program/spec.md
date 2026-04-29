## ADDED Requirements

### Requirement: Professional Prospect Segmentation
The prospecting program SHALL classify professional pet-sector contacts by segment and commercial fit.

#### Scenario: Segment assignment
- **WHEN** a professional prospect is added to the working list or CRM
- **THEN** it SHALL include a segment such as veterinary clinic, pet store, groomer, trainer, dog community, breeder, shelter, or other

#### Scenario: Fit qualification
- **WHEN** a prospect is qualified
- **THEN** the record SHALL capture product fit, city/province, source, lead temperature, first hook, owner/upline, and next step

### Requirement: Prospect Source Traceability
The prospecting program SHALL retain enough source information to audit and refresh the list.

#### Scenario: Public source capture
- **WHEN** a contact is collected from a public business listing, website, social profile, referral, or event
- **THEN** the record SHALL include source type, source URL or source note, and collection date where available

#### Scenario: Privacy-safe collection
- **WHEN** prospects are added from public sources
- **THEN** the list SHALL avoid storing unnecessary sensitive personal data or animal medical data

### Requirement: Lead Scoring
The prospecting program SHALL use a simple scoring model to prioritize outreach.

#### Scenario: High-fit signal
- **WHEN** a prospect sells premium or natural pet products, publishes educational veterinary content, offers grooming, or highlights skin, coat, fleas, ticks, or natural care
- **THEN** the prospect SHALL receive a higher priority score

#### Scenario: Low-fit signal
- **WHEN** a prospect appears chain-controlled, lacks a public business contact, or has no clear dog-owner audience
- **THEN** the prospect SHALL receive a lower priority score or be excluded from the first outreach wave

### Requirement: Outreach Cadence
The prospecting program SHALL define a bounded follow-up cadence to avoid pressure and preserve CRM quality.

#### Scenario: No response cadence
- **WHEN** a first outbound message receives no response
- **THEN** follow-up attempts SHALL be limited to a day-3 follow-up, a day-7 asset follow-up, and a day-14 nurture move unless the contact replies

#### Scenario: Interested response
- **WHEN** a prospect expresses interest
- **THEN** the CRM SHALL record the objection or interest reason, send the professional asset, and set a next step within 48 hours

### Requirement: Partner Pipeline Metrics
The prospecting program SHALL measure the practical business outcome of each prospecting wave.

#### Scenario: Weekly review
- **WHEN** a weekly review is performed
- **THEN** the team SHALL count contacts added, contacted, replied, interested, meetings booked, proposals sent, partners won, partners lost, and nurture contacts
