# HazHzel-Ecommerce — Data Dictionary

Generated incrementally by Reversa Archaeologist. Confidence: 🟢 **CONFIRMED** | 🟡 **INFERRED** | 🔴 **GAP**.

## Module: auth

### Persisted User document

Source: `HazHzel_Server/src/modules/users/schemas/user.schema.ts`. Mongoose timestamps add `createdAt` and `updatedAt`.

| Field | Type | Required by schema | Default | Notes |
|---|---|---:|---|---|
| `_id` | MongoDB ObjectId | Yes (implicit) | Generated | User identifier |
| `name` | string | No | — | Required by registration DTO only |
| `email` | string | No | — | Required by registration DTO; no schema-level unique/index constraint shown |
| `password` | string | No | — | bcrypt hash in registration/create flows |
| `phone` | string | No | — | Optional profile field |
| `address` | string | No | — | Optional profile field; distinct address module also exists |
| `image` | string | No | — | Profile image reference |
| `roles` | array of ObjectId → `Role` | No | `[]` | Self-registration inserts CUSTOMER role ID |
| `accountType` | string | No | `LOCAL` | Authentication source/type |
| `isActive` | boolean | No | `false` | Blocks login while false |
| `codeId` | string | No | — | Activation/recovery UUID |
| `codeExpired` | Date | No | — | Code expiry timestamp |
| `createdAt` | Date | Automatic | Current time | Added by timestamps option |
| `updatedAt` | Date | Automatic | Current time | Added by timestamps option |

### Role and Permission documents used by authorization

| Entity.field | Type | Required | Default/constraint |
|---|---|---:|---|
| `Role.name` | string | Yes | Unique; expected values include `SYSTEM_ADMIN`, `ADMIN`, `CUSTOMER` |
| `Role.permissions` | array of ObjectId → `Permission` | No | `[]` |
| `Permission.resource` | `Resources` enum | Yes | Unique |
| `Permission.action.create` | boolean | No | `false` |
| `Permission.action.read` | boolean | No | `false` |
| `Permission.action.update` | boolean | No | `false` |
| `Permission.action.delete` | boolean | No | `false` |

### Request DTOs

| DTO | Field | Type | Validation |
|---|---|---|---|
| `CreateAuthDto` | `email` | string | Non-empty only |
| `CreateAuthDto` | `password` | string | Non-empty only |
| `CreateAuthDto` | `name` | string | Non-empty |
| `CodeAuthDto` | `_id` | string | Non-empty |
| `CodeAuthDto` | `code` | string | Non-empty |
| `RetryCodeDto` | `email` | string | Non-empty and email format |
| `RetryPasswordDto` | `email` | string | Non-empty and email format |
| `ChangePasswordDto` | `email` | string | Non-empty and email format |
| `ChangePasswordDto` | `code` | string | Non-empty |
| `ChangePasswordDto` | `password` | string | Non-empty |
| `ChangePasswordDto` | `confirmPassword` | string | Non-empty; equality enforced in service |

### Authentication responses and tokens

| Structure.field | Type | Notes |
|---|---|---|
| `AuthResponseDto.user` | `UserResponseDto` | Sanitized login user projection |
| `AuthResponseDto.access_token` | string | Signed backend JWT |
| `UserResponseDto._id` | string | User ID |
| `UserResponseDto.name` | string | Display name |
| `UserResponseDto.email` | string | Email/login name |
| `UserResponseDto.roles` | string or string array | Runtime flow assumes first role exists |
| backend JWT `username` | string | User email |
| backend JWT `sub` | string/ObjectId serialization | User ID |
| backend JWT `roles` | role ID array | Used to populate `request.user.roles` |
| backend JWT `roleName` | string | Name of first role |
| backend JWT `appId` | string or undefined | Chat service application ID |
| NextAuth session `user` | `IUser` | Backend user projection plus access token |
| NextAuth session `access_token` | string | Copied from NextAuth token callback |

🔴 **GAP:** refresh-token fields exist in frontend type augmentation but no refresh-token issue/rotation flow was found.

🔴 **GAP:** `ChangePasswordDto.code` maps conceptually to persisted `User.codeId`, but the implementation queries a non-schema field named `code`.

## Module: address

Source: `HazHzel_Server/src/modules/address/schemas/address.schema.ts`. Mongoose timestamps add `createdAt` and `updatedAt`.

| Field | Persisted type | Required | Default/constraint | DTO validation |
|---|---|---:|---|---|
| `_id` | ObjectId | Yes (implicit) | Generated | Route parameter is not explicitly validated as Mongo ID |
| `userId` | ObjectId → `User` | No | None | Optional `@IsMongoId()` string |
| `name` | string | Yes | — | Non-empty string |
| `street` | string | Yes | — | Non-empty string |
| `ward` | string | No | — | Optional string |
| `city` | string | No | — | Optional string |
| `country` | string | No | — | Optional string |
| `zipCode` | string | No | — | Optional string |
| `phone` | string | Yes | — | Non-empty string; no format validation |
| `typeAddress` | `TypeAddress` string enum | No | `HOMEADDRESS` | Optional enum: `HOMEADDRESS`, `OFFICEADDRESS` |
| `isDefault` | boolean | No | `false` | Optional boolean |
| `createdAt` | Date | Automatic | Current time | — |
| `updatedAt` | Date | Automatic | Current time | — |

`UpdateAddressDto` is a partial form of `CreateAddressDto`, so every field becomes optional. 🔴 Ownership is mutable because `userId` is included in the update DTO.

## Module: admin

### InternalCreateUser request

| Field | Type | Validation | Persistence mapping |
|---|---|---|---|
| `email` | string | Non-empty | `User.email` |
| `password` | string | Non-empty | bcrypt hash → `User.password` |
| `name` | string | Non-empty | `User.name` |
| `roles` | `Types.ObjectId[]` | Non-empty only | Each value converted to ObjectId → `User.roles` |

The service additionally creates `codeId` (UUID) and `codeExpired` (now + 3 minutes). `Admin` and `UpdateAdminDto` are empty placeholder classes and have no persistence schema.

### User-list response

| Field | Type | Notes |
|---|---|---|
| `meta.current` | number | Defaults to 1 |
| `meta.pageSize` | number | Defaults to 5 |
| `meta.pages` | number | `ceil(total/pageSize)` |
| `meta.total` | number | Matching user count |
| `result` | `User[]` | Password projected out; roles are not populated in this query |

## Module: analytics

The module has no persistence entity; it returns projections derived from Order, User, Variant, Product, and Category collections.

| Response field | Type | Derivation |
|---|---|---|
| `heroMetrics.totalRevenue` | number | Sum of `Order.totalPrice` for in-range non-cancelled orders |
| `heroMetrics.totalOrders` | number | Count of in-range non-cancelled orders |
| `heroMetrics.newCustomers` | number | Count of in-range users where `roles` exists |
| `heroMetrics.averageOrderValue` | integer | Rounded average `Order.totalPrice` |
| `salesChart[].date` | string | `%Y-%m-%d` from order `createdAt` |
| `salesChart[].revenue` | number | Daily sum of `totalPrice` |
| `salesChart[].orders` | number | Daily order count |
| `topProducts[].productId` | ObjectId | `Order.items.productId` |
| `topProducts[].name` | string | First item name in group |
| `topProducts[].image` | string | First item image in group |
| `topProducts[].totalSold` | number | Sum of item quantity |
| `topProducts[].revenue` | number | Sum of quantity × item price |
| `paymentMethods[].method` | PaymentMethodType | Embedded payment method |
| `paymentMethods[].revenue` | number | Sum of completed-payment order totals |
| `paymentMethods[].transactions` | number | Completed-payment order count |
| `categorySales[].categoryName` | string | Joined category name or `Uncategorized` |
| `categorySales[].sales` | number | Sum of quantity × item price |
| `lowStockAlerts[].variantId` | ObjectId | Variant ID |
| `lowStockAlerts[].name` | string | Product name with optional variant name |
| `lowStockAlerts[].stockLeft` | number | Variant stock |
