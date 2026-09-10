# HazHzel-Ecommerce — Consolidated Code Analysis

Generated incrementally by Reversa Archaeologist. Documentation level: **complete**.

Confidence scale: 🟢 **CONFIRMED** | 🟡 **INFERRED** | 🔴 **GAP**

## Analysis status

| Module | Status | Complexity |
|---|---|---|
| `auth` | Complete | High |
| `address` | Complete | Medium |
| `admin` | Complete | High |
| `analytics` | Complete | High |
| Remaining 16 modules | Pending | — |

## Module: auth

### Purpose and boundaries

🟢 The authentication module spans two applications:

- The NestJS backend authenticates credentials, activates accounts, issues JWTs, and provides role/permission guards.
- The Next.js frontend uses NextAuth Credentials to call the backend, stores the returned access token in the NextAuth JWT/session, initializes client auth state, and applies route middleware.
- Registration, activation, and password-recovery operations are exposed by `AuthController` but delegated to `UsersService`.

Primary files:

- `HazHzel_Server/src/auth/auth.controller.ts`
- `HazHzel_Server/src/auth/auth.service.ts`
- `HazHzel_Server/src/auth/strategies/local/local.strategy.ts`
- `HazHzel_Server/src/auth/strategies/jwt/jwt.strategy.ts`
- `HazHzel_Server/src/auth/strategies/jwt/jwt-auth.guard.ts`
- `HazHzel_Server/src/auth/guards/roles.guard.ts`
- `HazHzel_Server/src/auth/guards/permission.guard.ts`
- `HazHzel_Server/src/modules/users/users.service.ts`
- `HazHzel_App/src/auth.ts`
- `HazHzel_App/src/middleware.ts`
- `HazHzel_App/src/services/auth.api.ts`

### HTTP surface

All backend routes are under `/api/v1/auth` because `main.ts` installs the global `api/v1` prefix.

| Method and route | Public | Input | Delegation/result |
|---|---|---|---|
| `POST /auth/login` | Yes | Passport Local fields (`username`, `password`; strategy treats username as email) | Validates credentials and active status, then returns user projection plus JWT |
| `POST /auth/register` | Yes | `CreateAuthDto` | Creates inactive CUSTOMER account, sends activation mail, returns user ID |
| `POST /auth/check-code` | Yes | `CodeAuthDto` | Activates account when ID/code match and expiry is in the future |
| `POST /auth/retry-active` | Yes | `RetryCodeDto` | Replaces activation code/expiry and sends reactivation mail |
| `POST /auth/retry-password` | Yes | `RetryPasswordDto` | Generates a recovery code for an active account and sends mail |
| `POST /auth/change-password` | Yes | `ChangePasswordDto` | Intended to validate recovery code and replace password |

### Main control flows

#### Login and session propagation

1. 🟢 The frontend calls NextAuth `signIn("credentials")` through `authenticate`.
2. 🟢 The Credentials provider calls the backend `POST /auth/login`.
3. 🟢 `LocalAuthGuard` runs `LocalStrategy.validate(email, password)`.
4. 🟢 `AuthService.validateUser` loads the user by email and compares the supplied password with bcrypt.
5. 🟢 `LocalStrategy` rejects invalid credentials with HTTP 401 and inactive accounts with HTTP 400.
6. 🟢 `AuthService.login` loads the first role, signs a JWT payload, and returns a limited user object plus `access_token`.
7. 🟢 NextAuth copies the access token and user object into its token and session callbacks.
8. 🟢 The Axios request interceptor attaches the bearer token when a server-side NextAuth session is available.

#### Registration and activation

1. 🟢 Frontend validation requires name, a valid email, password of at least six characters, matching confirmation, and acceptance of terms.
2. 🟢 The backend looks up the `CUSTOMER` role and rejects missing role or duplicate email.
3. 🟢 The password is hashed with bcrypt cost factor 10.
4. 🟢 A UUID activation code and three-minute expiry are stored with an inactive user.
5. 🟢 Gmail SMTP sends the activation code using the Handlebars `register` template.
6. 🟢 Verification matches `_id` and `codeId`, verifies the expiry, and sets `isActive` to true.

#### Authorization

- 🟢 `JwtAuthGuard` is registered globally in `AppModule`; handlers/classes annotated `@Public()` bypass bearer-token validation.
- 🟢 `JwtStrategy` extracts a bearer token, validates expiration and signature, and maps `sub`, `username`, and `roles` onto `request.user`.
- 🟢 `PermissionGuard` reads `{resource, action}` metadata, reloads the user with populated roles/permissions, and grants access if any role has the requested action set to true.
- 🟢 `RolesGuard` reads required role metadata and returns 403 when no user role matches.
- 🟡 The frontend middleware protects `/admin` based on login state only. A separate NextAuth `authorized` callback contains an admin-role check, but the middleware directly supplies its own callback; deeper runtime validation is needed to determine whether that `authorized` callback is also applied.

### Main functions

| Function | Parameters | Return/behavior | Location |
|---|---|---|---|
| `AuthService.validateUser` | `email`, `pass` | User or null; lookup can throw for unknown email | `HazHzel_Server/src/auth/auth.service.ts:24` |
| `AuthService.login` | `UserResponseDto` | `AuthResponseDto` with signed token | `HazHzel_Server/src/auth/auth.service.ts:37` |
| `UsersService.handleRegister` | `CreateAuthDto` | `{ _id }` after creating user and sending mail | `HazHzel_Server/src/modules/users/users.service.ts:114` |
| `UsersService.handleActive` | `CodeAuthDto` | `{ isBeforeCheck }` and activates user | `HazHzel_Server/src/modules/users/users.service.ts:150` |
| `UsersService.retryActive` | `RetryCodeDto` | `{ _id }` and sends replacement code | `HazHzel_Server/src/modules/users/users.service.ts:169` |
| `UsersService.retryPassword` | `RetryPasswordDto` | `{ _id, email }` and sends recovery code | `HazHzel_Server/src/modules/users/users.service.ts:201` |
| `UsersService.changePassword` | `ChangePasswordDto` | Intended `{ isBeforeCheck }` after password update | `HazHzel_Server/src/modules/users/users.service.ts:233` |
| `PermissionGuard.canActivate` | `ExecutionContext` | Boolean or `ForbiddenException` | `HazHzel_Server/src/auth/guards/permission.guard.ts:20` |
| `authenticate` | form data, optional callback URL | NextAuth result or normalized error/code | `HazHzel_App/src/utils/actions.ts:6` |

### Confirmed business rules

- 🟢 New self-registered users receive the `CUSTOMER` role (`users.service.ts:116-134`).
- 🟢 Self-registered accounts begin inactive because `User.isActive` defaults to false (`user.schema.ts:36-37`).
- 🟢 Activation and password-recovery codes expire after three minutes (`users.service.ts:134`, `185`, `217`).
- 🟢 Login is denied until the account is active (`local.strategy.ts:25-27`).
- 🟢 Passwords are stored as bcrypt hashes using ten rounds (`utils.ts:10-15`).
- 🟢 The signed backend JWT includes email as `username`, user ID as `sub`, role IDs, role name, and chat application ID (`auth.service.ts:40-56`).
- 🟢 Public endpoints bypass the global JWT guard through `@Public()` metadata.
- 🟢 Permission authorization is additive: any populated role granting the requested resource/action is sufficient (`permission.guard.ts:31-40`).

### Error handling and notable risks

- 🔴 **GAP / likely defect:** password change queries `{ email, code }`, but the user schema and all code-generation paths use `codeId`. Unless undeclared legacy data contains `code`, recovery cannot locate the user (`users.service.ts:239`; `user.schema.ts:39-43`).
- 🟢 `retryActive`, `retryPassword`, and `changePassword` catch all exceptions and replace specific causes with generic errors, preventing callers from distinguishing validation, lookup, mail, and persistence failures (`users.service.ts:171-199`, `203-230`, `235-256`).
- 🟡 `RolesGuard` compares `user.roles` directly to each enum value, while the JWT payload is built from an array of role IDs. If the guard is applied without another transformation, role checks will fail (`roles.guard.ts:32`; `auth.service.ts:43`).
- 🟡 The frontend NextAuth admin check reads `user.role`, but the declared/session/backend field is `roleName` (`HazHzel_App/src/auth.ts:70-72`; `types/next-auth.d.ts:4-13`).
- 🟢 Backend `CreateAuthDto` only checks non-empty values; the six-character password minimum and email format are frontend-only and therefore bypassable by direct API clients.
- 🟢 `hashPassword` and `comparePassword` swallow bcrypt exceptions and return `undefined`, reducing observability (`HazHzel_Server/src/shared/helpers/utils.ts:12-24`).
- 🟢 The login form renders Google and Facebook buttons, but no OAuth providers are configured in NextAuth.
- 🔴 **GAP:** no auth-specific automated test was found; the only detected test is the generated application e2e test.

### Configuration

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | Backend JWT signing and verification secret |
| `JWT_ACCESS_TOKEN_EXPIRED` | Access-token expiration passed to Nest JWT |
| `MAILDEV_INCOMING_USER` | Gmail SMTP username |
| `MAILDEV_INCOMING_PASS` | Gmail SMTP password |
| `CHAT_APP_ID` | Included in the signed backend JWT payload |
| `AUTH_SECRET` | NextAuth secret |
| `INTERNAL_BACKEND_URL` | Server-side API base URL |
| `NEXT_PUBLIC_BACKEND_URL` | Browser API base URL |

No secret values were read or copied.

## Module: address

### Purpose and boundaries

🟢 The address module persists delivery addresses in MongoDB, exposes authenticated CRUD endpoints under `/api/v1/address`, and feeds the customer account address screen. Its central invariant is that at most one address per `userId` should be marked as default when create/update operations receive an owner ID.

Primary files:

- `HazHzel_Server/src/modules/address/address.controller.ts`
- `HazHzel_Server/src/modules/address/address.service.ts`
- `HazHzel_Server/src/modules/address/schemas/address.schema.ts`
- `HazHzel_App/src/services/address.api.ts`
- `HazHzel_App/src/components/common/customer/account-adress-addressform/index.tsx`
- `HazHzel_App/src/app/(public)/account/addresses/page.tsx`

### HTTP surface and control flow

| Method and route | Behavior | Ownership enforcement |
|---|---|---|
| `POST /address` | Unsets prior defaults for supplied `userId`, then creates the document | 🔴 Accepts optional `userId` from request body; authenticated user is not injected |
| `GET /address` | Returns every address | 🔴 No role/permission decorator beyond global authentication |
| `GET /address/me` | Queries addresses using JWT `request.user._id` | 🟢 Derived from authenticated token |
| `GET /address/:id` | Returns an address by MongoDB ID | 🔴 Does not verify owner |
| `PATCH /address/:id` | Optionally unsets other defaults and updates by ID | 🔴 Does not verify owner; body may supply another `userId` |
| `DELETE /address/:id` | Deletes by ID | 🔴 Does not verify owner |

### Main functions and algorithms

- 🟢 `create(dto)` performs a two-step default-address update: if `isDefault && userId`, set every address for that user to non-default, then insert the new address (`address.service.ts:15-24`).
- 🟢 `update(id, dto)` loads the current address, derives `userId` from the DTO or existing document, clears default on sibling documents excluding `id`, then returns the updated document (`address.service.ts:46-64`).
- 🟢 `findOne(id)` and `remove(id)` throw `NotFoundException` when the target does not exist.
- 🟢 `findMyAddress(userId)` returns an array for the authenticated user.

### Business rules

- 🟢 Address `name`, `street`, and `phone` are required by both DTO and schema.
- 🟢 `typeAddress` accepts `HOMEADDRESS` or `OFFICEADDRESS` and defaults to `HOMEADDRESS` in persistence.
- 🟢 `isDefault` defaults to false.
- 🟢 When an owner-aware create/update marks an address default, all other addresses for that owner are unset.
- 🟡 The two-step default update is not transactional; concurrent writes can create more than one default address.

### Frontend behavior and gaps

- 🟢 The account page loads `GET /address/me` and renders empty/list states.
- 🔴 **GAP / likely defect:** the add-address form does not include `userId`, while the backend create route does not derive it from the authenticated request. Created records therefore have no owner and will not appear in `GET /address/me` (`addressform/index.tsx:106-117`; `address.controller.ts:20-24`).
- 🔴 **GAP:** edit and delete UI handlers are placeholders; only create and read service functions exist (`addressform/index.tsx:102-104`; `addressaction/index.tsx:15-20`).
- 🟢 The edit form maps persisted fields to unrelated initial-value keys (`firstName`, `apt`, `state`, `country`, `phoneNumber`) that do not match its rendered form field names, so existing values are not populated correctly.
- 🟢 The frontend `ShippingAddress` type permits `WORKADDRESS`, while the backend enum uses `OFFICEADDRESS`.
- 🟢 The backend checks `if (!address)` after `find()`, but Mongoose returns an empty array, so the `NotFoundException` branch for no user addresses is unreachable.
- 🔴 **GAP:** no module-specific tests or database unique/partial index enforcing one default address were found.

## Module: admin

### Purpose and API

🟢 The backend admin module provides two intended role-restricted operations: `POST /api/v1/admin/create-users` for internal account creation and `GET /api/v1/admin/users` for role-aware user listing. It depends on User, Role, mail, password hashing, and the create-policy matrix.

| Function | Control flow |
|---|---|
| `handleRegister(dto, callerRoles)` | Reject duplicate email → resolve caller role IDs → choose highest caller role → apply create matrix → hash password → create inactive user with selected roles and 3-minute code → email activation code |
| `findAll(query, current, pageSize, callerRoles)` | Parse AQP filter/sort → resolve highest caller role → restrict ADMIN results to ADMIN/CUSTOMER → paginate → exclude password |

### Confirmed rules

- 🟢 Intended access roles are `ADMIN` and `SYSTEM_ADMIN` on both controller handlers.
- 🟢 `SYSTEM_ADMIN` may create SYSTEM_ADMIN, ADMIN, or CUSTOMER; ADMIN may create CUSTOMER; CUSTOMER may create none (`create_policy.ts:3-10`).
- 🟢 ADMIN listings are limited to accounts holding ADMIN or CUSTOMER roles; SYSTEM_ADMIN listings retain the caller-supplied filter.
- 🟢 Internally created accounts receive an activation code and remain inactive until activation.
- 🟢 Passwords are excluded from list results.

### High-impact findings

- 🔴 **GAP / authorization defect:** `@Roles(...)` only sets metadata. `AdminController` does not use `@UseGuards(RolesGuard)`, and `RolesGuard` is not registered as a global `APP_GUARD`; therefore these handlers appear protected only by authentication, not the declared roles.
- 🔴 **GAP / policy defect:** `handleRegister` loads `targetRoles` from `callerRoles`, then validates those same caller roles against `CREATE_MATRIX[callerRole]`. It never validates requested `createRoles`. For example, an ADMIN caller causes ADMIN to be checked against the list `[CUSTOMER]` and is rejected; requested role IDs are not policy-checked (`admin.service.ts:41-60`).
- 🟢 `pickHighestRole` only prioritizes SYSTEM_ADMIN then ADMIN and may return `undefined` for CUSTOMER/unknown role sets; indexing `CREATE_MATRIX[undefined]` can fail.
- 🔴 **GAP:** `InternalCreateUser.roles` is only `@IsNotEmpty`; it does not validate array shape or Mongo IDs before `new Types.ObjectId(id)`.
- 🟢 Frontend administration screens call general `/users` endpoints, not `/admin/users` or `/admin/create-users`. The create modal submits multipart image data without `roles`, while the admin DTO requires roles. The backend admin surface therefore appears disconnected from the current UI.
- 🔴 **GAP:** no admin-specific automated tests were found.

## Module: analytics

### Purpose and flow

🟢 `GET /api/v1/analytics/dashboard?days=N` builds an inclusive date window from now minus `N` days and executes seven MongoDB operations concurrently with `Promise.all`: hero metrics, new-customer count, daily sales, top products, payment methods, category sales, and low-stock variants. The Next.js dashboard fetches this response and five recent orders concurrently with `Promise.allSettled`, allowing either source to fail independently.

### Aggregations and formulas

- 🟢 Common order scope: `createdAt` within the selected range and status not equal to `CANCELLED`.
- 🟢 Hero metrics: sum `totalPrice`, count orders, average `totalPrice`; average is rounded before response.
- 🟢 Sales chart: group by UTC-formatted `YYYY-MM-DD`, sum revenue and count orders.
- 🟢 Top products: unwind order items, group by `items.productId`, sum quantity and `quantity × price`, sort by quantity, limit five.
- 🟢 Payment methods: include `payment.status = COMPLETED`, group by method, sum revenue/count transactions.
- 🟢 Category sales: join products then categories, group item revenue by category name with `Uncategorized` fallback.
- 🟢 Low stock: variants with stock ≤ 10, joined to products, ordered ascending, limit five.

### Response contract

`heroMetrics`, `salesChart`, `topProducts`, `paymentMethods`, `categorySales`, and `lowStockAlerts` are returned. Empty hero aggregation defaults monetary/count values to zero; all other series naturally return empty arrays.

### Findings and gaps

- 🔴 **GAP / authorization:** the analytics endpoint has no admin role or permission guard. Any authenticated user can request store-wide revenue, customer, order, and stock information.
- 🟢 `days` uses raw `parseInt`; invalid, zero, or negative values are not validated and can produce invalid or future-facing date windows.
- 🟡 Hero revenue, sales chart, top products, and category sales include every non-cancelled order, including `PENDING`; only payment-method statistics require completed payment. Whether revenue should mean paid revenue requires business confirmation.
- 🟢 “New customers” counts every user with a `roles` field rather than verifying the CUSTOMER role, so admin/system-admin accounts are included.
- 🟢 The frontend defaults dashboard data to 365 days while the visible selector defaults to 30 days, so the initial label and queried range disagree.
- 🟢 Several dashboard widgets (`RevenueBreakdown`, `ShippingOverview`, `TopCountries`, traffic/distribution/activity) receive no analytics data; `DashboardMetrics` also synthesizes customer points from order/revenue values. These visuals are partially illustrative rather than source-of-truth analytics.
- 🔴 **GAP:** no analytics tests, timezone policy, currency unit, or explicit definition of recognized revenue were found.
