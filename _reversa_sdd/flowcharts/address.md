# Address Module Flows

Confidence: 🟢 **CONFIRMED** unless marked otherwise.

## Create/default-address flow

```mermaid
flowchart TD
    A[Authenticated POST /address] --> B[Validate CreateAddressDto]
    B --> C{Body says isDefault and includes userId?}
    C -- Yes --> D[Set all addresses for body.userId to isDefault=false]
    C -- No --> E[Skip default normalization]
    D --> F[Create address from request body]
    E --> F
    F --> G[Return created document]

    style C fill:#ffdddd,stroke:#cc0000
```

🔴 Ownership comes from an optional body field rather than the authenticated user. The current frontend omits that field.

## Update/default-address flow

```mermaid
flowchart TD
    A[PATCH /address/:id] --> B[Load address by ID]
    B --> C{Found?}
    C -- No --> D[404]
    C -- Yes --> E{Update sets isDefault true?}
    E -- No --> F[Update target by ID]
    E -- Yes --> G[Use body.userId or existing userId]
    G --> H[Unset default on sibling addresses]
    H --> F
    F --> I[Return updated document]
```

## Customer address page

```mermaid
flowchart TD
    A[Render /account/addresses] --> B[GET /address/me]
    B --> C[Use JWT user._id]
    C --> D[Find addresses by userId]
    D --> E{Array empty?}
    E -- Yes --> F[Render add-address empty state]
    E -- No --> G[Render address cards]
    G --> H[Edit/delete controls]
    H --> I[Placeholder handlers: no mutation implemented]
```
