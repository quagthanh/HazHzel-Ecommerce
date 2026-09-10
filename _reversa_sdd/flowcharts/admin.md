# Admin Module Flows

## Internal user creation as implemented

```mermaid
flowchart TD
    A[Authenticated POST /admin/create-users] --> B[Read caller role IDs from JWT]
    B --> C[Load caller Role documents]
    C --> D[Pick SYSTEM_ADMIN then ADMIN]
    D --> E[Loop over caller roles]
    E --> F{CREATE_MATRIX callerRole includes each caller role?}
    F -- No --> G[403]
    F -- Yes --> H[Hash password]
    H --> I[Convert requested role IDs to ObjectId]
    I --> J[Create inactive user]
    J --> K[Send activation email]

    style E fill:#ffdddd,stroke:#cc0000
    style I fill:#fff0cc,stroke:#cc8800
```

🔴 The policy loop validates caller roles rather than requested roles. Role metadata also lacks an attached/global RolesGuard on this controller.

## User listing

```mermaid
flowchart TD
    A[GET /admin/users] --> B[Parse AQP filter and sort]
    B --> C[Resolve highest caller role]
    C --> D{Caller is ADMIN?}
    D -- Yes --> E[Restrict roles to ADMIN or CUSTOMER]
    D -- No --> F[Keep supplied filter]
    E --> G[Count, paginate, exclude password]
    F --> G
    G --> H[Return meta and users]
```
