# Auth Module Flows

Confidence: 🟢 **CONFIRMED** unless a node is explicitly marked otherwise.

## Login and session creation

```mermaid
flowchart TD
    A[Submit email and password] --> B[NextAuth Credentials authorize]
    B --> C[POST /api/v1/auth/login]
    C --> D[LocalAuthGuard / LocalStrategy]
    D --> E[Find user by email]
    E --> F{Password matches bcrypt hash?}
    F -- No --> G[401 invalid credentials]
    F -- Yes --> H{User active?}
    H -- No --> I[400 inactive account]
    H -- Yes --> J[Load first role]
    J --> K[Sign backend JWT]
    K --> L[Return user projection and access token]
    L --> M[Store user/token in NextAuth JWT]
    M --> N[Expose user/token in NextAuth session]
```

## Registration and activation

```mermaid
flowchart TD
    A[Submit registration] --> B[Load CUSTOMER role]
    B --> C{Role exists?}
    C -- No --> D[400 missing CUSTOMER role]
    C -- Yes --> E{Email already exists?}
    E -- Yes --> F[400 duplicate email]
    E -- No --> G[Hash password with bcrypt cost 10]
    G --> H[Generate UUID code]
    H --> I[Create inactive user with 3-minute expiry]
    I --> J[Send activation email]
    J --> K[Return user ID]
    K --> L[Submit user ID and code]
    L --> M{ID/codeId match?}
    M -- No --> N[400 invalid or expired]
    M -- Yes --> O{Current time before codeExpired?}
    O -- No --> N
    O -- Yes --> P[Set isActive true]
    P --> Q[Redirect to login]
```

## Authenticated request and permission check

```mermaid
flowchart TD
    A[Incoming backend request] --> B{Handler/class is Public?}
    B -- Yes --> C[Bypass global JWT guard]
    B -- No --> D[Extract bearer token]
    D --> E{Signature and expiry valid?}
    E -- No --> F[401 unauthorized]
    E -- Yes --> G[Map sub, username, roles to request.user]
    G --> H{Permission metadata present?}
    H -- No --> I[Continue request]
    H -- Yes --> J[Populate user roles and permissions]
    J --> K{Any role grants resource.action?}
    K -- No --> L[403 missing permission]
    K -- Yes --> I
```

## Password recovery as implemented

```mermaid
flowchart TD
    A[Submit active-account email] --> B[Generate UUID codeId]
    B --> C[Store codeId and 3-minute expiry]
    C --> D[Send recovery email]
    D --> E[Submit email, code, password, confirmation]
    E --> F{Passwords equal?}
    F -- No --> G[Generic 400 internal server error]
    F -- Yes --> H[Query user by email and field named code]
    H --> I{User found?}
    I -- No --> J[Generic 400 internal server error]
    I -- Yes --> K{Code not expired?}
    K -- No --> J
    K -- Yes --> L[Hash and store new password]

    style H fill:#ffdddd,stroke:#cc0000
```

🔴 The highlighted query uses `code`, while generated and persisted codes use `codeId`; this is a likely broken recovery path.
