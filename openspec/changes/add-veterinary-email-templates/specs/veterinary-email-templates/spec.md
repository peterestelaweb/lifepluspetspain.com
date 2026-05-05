## ADDED Requirements

### Requirement: Profile-Based Email Library
The sales console SHALL provide copy-ready email templates for distinct veterinary stakeholder profiles.

#### Scenario: Viewing veterinary email templates
- **WHEN** the user opens the Email section in `/ventas/`
- **THEN** the system SHALL show multiple templates segmented by veterinary stakeholder profile

#### Scenario: Copying a veterinary email template
- **WHEN** the user clicks copy on an email template
- **THEN** the system SHALL copy the full subject, body, and follow-up text for that profile

### Requirement: Care & Comfort Claim Boundaries
Email templates MUST use Care & Comfort claims that are supported by the official product sheet and MUST avoid unsupported medical or toxicology guarantees.

#### Scenario: Product positioning in email
- **WHEN** an email mentions Care & Comfort
- **THEN** it SHALL identify it as a dog-only external-use spray with natural oils, no permethrin, lemongrass 4.0%, andiroba 1.0%, and clear application precautions

#### Scenario: Avoiding unsupported claims
- **WHEN** an email discusses parasite or household exposure concerns
- **THEN** it SHALL avoid claiming disease prevention, guaranteed parasite elimination, replacement of veterinary protocols, or protection of pregnant women from specific health outcomes

### Requirement: Subtle Household-Sensitivity Messaging
Email templates SHALL allow subtle household-sensitivity language for families who prefer to reduce unnecessary chemical contact.

#### Scenario: Mentioning pregnancy and sensitive households
- **WHEN** an email references pregnant women, children, cats, or vulnerable households
- **THEN** it SHALL frame the topic as a client preference or conversation point, not as a definitive medical claim

### Requirement: Editable Sales Console Integration
Email templates SHALL be editable and persist through the existing sales-console storage flow.

#### Scenario: Editing email copy
- **WHEN** the user edits and saves an email template
- **THEN** the system SHALL store the changed text in the same local/remote data flow used by other sales scripts
