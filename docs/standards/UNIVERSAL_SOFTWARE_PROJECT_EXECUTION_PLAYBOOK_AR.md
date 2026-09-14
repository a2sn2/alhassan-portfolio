# الدليل العام لتنفيذ أي مشروع برمجي من الصفر إلى الإنتاج
## Universal Software Project Execution Playbook
### منهج عملي شامل لبناء المشاريع بطريقة معمارية، قابلة للاختبار، قابلة للتوسع، قابلة للتوليد، وآمنة للإنتاج

> **نوع الوثيقة:** دليل هندسي عام قابل لإعادة الاستخدام  
> **النطاق:** أي مشروع برمجي مهما كان نوعه أو حجمه  
> **الفئات المستهدفة:** مطورون، مهندسو برمجيات، قادة تقنيون، QA، DevOps، Product Engineers، Software Architects، فرق ناشئة أو مؤسسات  
> **الفلسفة:** Contract → Evidence → Reuse → Automation → Governance  
> **الهدف:** تحويل فكرة المشروع إلى نظام قابل للتشغيل، الاختبار، الصيانة، التوسع، التوليد، النشر، والحوكمة دون الوقوع في فوضى الميزات أو الاعتماد على الاجتهادات الفردية.

---

# 1. ما الهدف من هذا الدليل؟

هذا الدليل ليس Tutorial لتقنية واحدة.

ليس دليلًا لـ.NET فقط.

ليس دليلًا لـWeb فقط.

ليس خاصًا بـSaaS أو Fintech أو ERP أو AI.

هو **منهج تنفيذ هندسي** يحدد:

- ماذا نفعل أولًا؟
- ماذا نثبت قبل الخطوة التالية؟
- متى نعيد الاستخدام؟
- متى نستخدم Framework أو Provider جاهز؟
- متى نكتب Custom Code؟
- كيف نمنع التكرار؟
- كيف نحمي العقود؟
- كيف نعرف أن المشروع يعمل فعلًا؟
- كيف نعرف أن المشروع أصبح Consumer-ready؟
- ومتى فقط يحق لنا القول إنه Production-ready؟

---

# 2. القاعدة الذهبية

```text
لا تبدأ بالميزات.
ابدأ بالمشكلة والحدود والعقود.

لا تعتبر Build ناجحًا دليلًا كافيًا.
أثبت Runtime behavior.

لا تجعل كل شيء Reusable من البداية.
استخراج Reuse يأتي بعد ظهور التكرار.

لا تجعل كل Tool مصدر حقيقة جديدًا.
احتفظ بـSource of Truth واحد.

لا تفترض أن CI أخضر = Production.
افصل Software Evidence عن Deployment Governance.
```

---

# 3. لمن يصلح هذا المنهج؟

يمكن استخدامه في:

- أنظمة مالية.
- محافظ إلكترونية.
- أنظمة دفع.
- ERP.
- CRM.
- HR.
- أنظمة مخزون.
- أنظمة مستشفيات.
- أنظمة تعليم.
- أنظمة حكومية.
- SaaS.
- Portals.
- Mobile Apps.
- Desktop Applications.
- APIs.
- Microservices.
- Monoliths.
- Modular Monoliths.
- Data Platforms.
- AI Products.
- Automation Platforms.
- Workflow Engines.
- Internal Tools.
- E-commerce.
- Marketplace.
- B2B.
- B2C.
- B2B2C.
- IoT.
- Hybrid Systems.

المبدأ لا يتغير، لكن حجم التطبيق يتغير.

---

# 4. المستويات الخمسة لأي مشروع

أي مشروع يمر عمليًا عبر خمس طبقات نضج:

```text
1. Idea / Problem
2. Architectural Foundation
3. Working Product
4. Repeatable Platform / Automation
5. Production Governance
```

لا تخلط بينها.

مثال:

```text
API يعمل
≠
Architecture ناضجة

Architecture ناضجة
≠
Generator جاهز

Generator جاهز
≠
Production approved
```

---

# 5. المرحلة صفر — تعريف المشروع

قبل أول سطر كود، اكتب `PROJECT-CHARTER.md`.

يحتوي:

## 5.1 Problem

ما المشكلة؟

```text
المستخدم يريد...
الشركة تعاني من...
العملية الحالية فيها...
المخاطر الحالية...
```

---

## 5.2 Target Users

حدد:

- End Users.
- Admins.
- Operators.
- Managers.
- External Partners.
- Developers.
- Integrators.
- Auditors.

---

## 5.3 Business Goal

مثال:

```text
خفض وقت العملية
تقليل الأخطاء
رفع الأتمتة
زيادة الإيرادات
خفض التكلفة
توحيد البيانات
بناء منصة قابلة لإعادة الاستخدام
```

---

## 5.4 Scope

اكتب ما سيدخل.

---

## 5.5 Non-goals

اكتب ما لن يدخل.

Non-goals تمنع Scope Creep.

---

## 5.6 Success Metrics

حدد قياسًا.

مثال:

```text
P95 API latency < X
error rate < Y
processing time < Z
availability target
conversion target
automation rate
user adoption
```

---

## 5.7 Project Status Target

اختر:

```text
Prototype
PoC
MVP
Internal Beta
Consumer-ready
Pre-production
Production
```

لا تستخدم كلمة Production مبكرًا.

---

# 6. صنف المشروع قبل اختيار المعمارية

## 6.1 حسب الحجم

```text
Small
Medium
Large
Platform
Mission Critical
```

---

## 6.2 حسب نوع البيانات

```text
Simple CRUD
Transactional
Financial
Highly relational
Document-heavy
Event-driven
Real-time
Analytics-heavy
AI-heavy
Mixed
```

---

## 6.3 حسب التوزيع

```text
Single App
Modular Monolith
Distributed Services
Microservices
Serverless
Edge
Hybrid
```

---

## 6.4 حسب الحساسية

```text
Public
Internal
Confidential
PII
Financial
Healthcare
Government
Highly regulated
```

---

# 7. قاعدة اختيار المعمارية

ابدأ بأبسط معمارية تحقق المتطلبات.

```text
هل Modular Monolith يكفي؟
        ↓ نعم
ابدأ به.

        ↓ لا
هل يوجد سبب حقيقي لـMicroservices؟
        ↓ نعم
افصل الخدمات التي تحتاج استقلالًا حقيقيًا.
```

لا تستخدم Microservices كديكور.

---

# 8. Architecture Decision Record

لكل قرار كبير، أنشئ ADR.

```markdown
# ADR-0001: اخترنا Modular Monolith

## Context

## Decision

## Alternatives

## Why

## Consequences

## Risks

## Migration Path
```

أمثلة قرارات تحتاج ADR:

- Monolith vs Microservices.
- SQL Server vs PostgreSQL.
- REST vs GraphQL.
- Blazor vs React.
- Native Identity vs Provider.
- Kafka vs RabbitMQ.
- Redis.
- Kubernetes.
- Multi-tenancy model.
- Event-driven architecture.

---

# 9. Technology Selection Rule

استخدم هذه الأولوية:

```text
1. Native Platform Capability
2. Mature OSS Framework / Provider
3. Mature Managed Service
4. Thin Adapter / Integration
5. Custom Implementation
```

ولا تبدأ من رقم 5.

---

# 10. Technology Stack Decision Matrix

لا توجد تقنية أفضل دائمًا.

اختر بناءً على:

- Team skills.
- Ecosystem maturity.
- Security support.
- Long-term support.
- Performance.
- Development speed.
- Deployment environment.
- Vendor constraints.
- Hiring.
- Integrations.
- Cost.
- Operability.

---

# 11. Backend Options

## .NET

مناسب جدًا لـ:

- enterprise.
- fintech.
- government.
- APIs.
- modular monolith.
- high-performance services.
- Windows/Linux.
- long-lived systems.

Stack نموذجي:

```text
.NET LTS
ASP.NET Core
EF Core
OpenAPI
Dependency Injection
Options/Configuration
Health Checks
HttpClientFactory
Resilience
Background Services
```

---

## Java / JVM

```text
Java LTS
Spring Boot
Spring Security
JPA/Hibernate
OpenAPI
```

مناسب للمؤسسات والأنظمة طويلة العمر.

---

## Node.js / TypeScript

```text
Node.js LTS
TypeScript
NestJS / Fastify / Express
Prisma / TypeORM / Drizzle
```

مناسب للـSaaS وAPIs والفرق التي تريد سرعة تطوير.

---

## Python

```text
Python
FastAPI / Django
SQLAlchemy
Pydantic
```

مناسب:

- AI.
- data.
- automation.
- backend متوسط.
- rapid development.

---

## Go

```text
Go
net/http / Fiber / Gin
sqlc / Ent / GORM
```

مناسب للخدمات الخفيفة والبنية التحتية.

---

# 12. Frontend Options

## Blazor

مناسب إذا:

- الفريق .NET.
- تريد C# end-to-end.
- business applications.
- admin portals.

---

## React

مناسب:

- web apps.
- ecosystems.
- high UI flexibility.

---

## Angular

مناسب:

- enterprise frontend.
- strong structure.
- large teams.

---

## Vue

مناسب:

- simpler web apps.
- fast onboarding.

---

## Mobile

```text
Flutter
React Native
.NET MAUI
Native Swift
Native Kotlin
```

اختر بناءً على:

- platform needs.
- native integration.
- performance.
- team skills.

---

# 13. Database Selection

## SQL Server

مناسب:

- .NET enterprise.
- financial.
- reporting.
- transactional systems.
- Microsoft ecosystem.

---

## PostgreSQL

مناسب:

- SaaS.
- cloud.
- open-source ecosystem.
- JSON + relational hybrid.
- geospatial.

---

## MySQL / MariaDB

مناسب:

- web systems.
- simpler relational workloads.

---

## NoSQL

لا تستخدم NoSQL لأن "المشروع كبير".

استخدمه عندما طبيعة البيانات تبرره:

```text
Document DB
Key-value
Wide-column
Graph
Time-series
```

---

# 14. قاعدة قاعدة البيانات

إذا البيانات:

```text
Transactional
Relational
Financial
Auditable
```

ابدأ غالبًا بـRDBMS.

لا تبدأ بـDistributed Database دون حاجة مثبتة.

---

# 15. Clean Architecture General Pattern

```text
Domain
  ↑
Application
  ↑
Infrastructure

API / UI
→ Application
```

---

# 16. Domain Layer

يحتوي:

- Entities.
- Aggregates.
- Value Objects.
- Domain Rules.
- Domain Events.
- Domain Exceptions.

لا يحتوي:

- DB provider.
- HTTP.
- UI.
- Cloud SDK.
- Logging implementation.

---

# 17. Application Layer

يحتوي:

- Use Cases.
- Commands.
- Queries.
- Interfaces.
- Result/Error.
- Validation contracts.
- Repository ports.
- UoW.
- Authorization interfaces.
- Clock.
- Current User.
- Pagination.
- Policies.

---

# 18. Infrastructure Layer

يحتوي:

- ORM.
- DB.
- cache.
- messaging.
- file storage.
- email.
- external APIs.
- telemetry adapters.
- identity providers.

---

# 19. Presentation Layer

قد يكون:

```text
REST API
GraphQL
gRPC
Web UI
Mobile
Desktop
CLI
```

ولا يملك business truth.

---

# 20. Modular Monolith Pattern

للمشاريع المتوسطة والكبيرة، استخدم:

```text
src/
  Modules/
    Customers/
    Orders/
    Billing/
    Identity/
```

كل Module يملك:

- Domain.
- Application.
- Infrastructure.
- API.

لكن ضمن Deployable واحد إذا كان ذلك كافيًا.

---

# 21. متى تنتقل لـMicroservices؟

عند وجود Evidence مثل:

- independent scaling.
- independent release.
- fault isolation.
- legal/data isolation.
- independent team ownership.
- incompatible runtime.
- high-volume specialized workload.

ليس لمجرد زيادة عدد developers.

---

# 22. Repository Structure

مثال عام:

```text
repo/
├─ src/
├─ tests/
├─ docs/
├─ scripts/
├─ deploy/
├─ tools/
├─ .github/
├─ Directory.Build.props
├─ Directory.Packages.props
├─ README.md
├─ CHANGELOG.md
├─ CONTRIBUTING.md
├─ SECURITY.md
└─ LICENSE
```

---

# 23. Monorepo vs Multi-repo

## Monorepo

مناسب:

- tightly related modules.
- shared contracts.
- one team.
- atomic changes.

---

## Multi-repo

مناسب:

- independent products.
- independent release cycles.
- access control.
- independent teams.

---

# 24. Build Configuration

من البداية:

- warnings-as-errors حسب السياسة.
- nullable safety.
- deterministic build.
- code analyzers.
- formatting.
- central dependency versions.
- reproducible packages.
- source metadata.

---

# 25. Dependency Management

استخدم إدارة مركزية عندما النظام متعدد المشاريع.

في .NET:

```text
Directory.Packages.props
```

في Node:

```text
workspace package manager
lock file
```

في Java:

```text
dependency management
BOM
```

---

# 26. Dependency Hygiene

كل PR يجب أن يمر:

- vulnerability audit.
- outdated dependency review.
- license review عند الحاجة.
- transitive dependency review.
- lockfile integrity.

---

# 27. Secrets

ممنوع:

```text
password in source
API key in source
connection string in repo
token in generated docs
```

استخدم:

- environment variables.
- secret manager.
- KMS/Vault.
- CI secrets.

---

# 28. Configuration

طبق:

```text
Development
Test
Staging
Production
```

ولا تجعل Production يعتمد على local defaults.

---

# 29. Options / Strongly Typed Configuration

بدل:

```text
config["Payments:Timeout"]
```

في كل مكان.

استخدم Config Object واحدًا.

---

# 30. Fail Fast

إذا Configuration أساسية ناقصة:

```text
Startup fails.
```

أفضل من Runtime failure بعد ساعة.

---

# 31. Project Isolation

إذا نفس Platform تستخدمها عدة مشاريع:

كل مشروع يملك:

- ProjectId.
- config.
- DI.
- DB.
- credentials.
- storage namespace.
- cache namespace.
- job namespace.
- telemetry attributes.

---

# 32. Multi-Tenancy

مختلف عن Project Isolation.

حدد:

- tenant resolution.
- tenant authentication.
- tenant authorization.
- tenant data isolation.
- tenant cache.
- tenant files.
- tenant jobs.
- tenant billing.
- tenant admin.

---

# 33. Multi-Tenancy Storage Models

## Shared DB / Shared Schema

```text
TenantId في كل جدول
```

## Shared DB / Separate Schema

## Separate Database per Tenant

اختر بناءً على:

- scale.
- isolation.
- cost.
- compliance.
- migration complexity.

---

# 34. Identity and Authentication

لا تختر فقط Login screen.

حدد:

- users.
- passwords.
- SSO.
- MFA.
- session/token.
- refresh.
- logout.
- account lock.
- password reset.
- recovery.
- service accounts.
- API clients.

---

# 35. Authentication Options

- ASP.NET Core Identity.
- ABP OSS Identity infrastructure.
- Keycloak.
- Auth0.
- Microsoft Entra ID.
- AWS Cognito.
- Firebase Auth.
- Custom provider only when justified.

---

# 36. Authorization

افصل:

```text
Authentication = من أنت؟
Authorization = ماذا يسمح لك؟
```

---

# 37. Authorization Models

- Roles.
- Permissions.
- Claims.
- Policies.
- Ownership.
- ABAC.
- RBAC.
- resource-based authorization.

---

# 38. Fail Closed Authorization

إذا Policy المطلوبة غير موجودة:

```text
DENY
```

---

# 39. Validation Layers

## Transport Validation

- required.
- max length.
- format.

## Application Validation

- cross-field.
- external context.

## Domain Validation

- invariants.

لا تعتمد فقط على frontend validation.

---

# 40. Result/Error Model

اعمل Contract موحد للأخطاء.

```text
Validation
Unauthorized
Forbidden
NotFound
Conflict
Precondition
RateLimited
DependencyFailure
InternalError
```

---

# 41. Problem Details

في REST APIs استخدم نمطًا قياسيًا.

يشمل:

- status.
- type.
- title.
- detail.
- correlationId.
- validation errors.

---

# 42. Correlation ID

كل Request:

```text
CorrelationId
```

ينتقل عبر:

- API.
- logs.
- external calls.
- jobs.
- events.

---

# 43. API Design

حدد:

- route conventions.
- HTTP verbs.
- status codes.
- pagination.
- filtering.
- sorting.
- versioning.
- idempotency.
- concurrency.
- rate limiting.
- authentication.

---

# 44. REST Resource Design

```text
GET    /api/customers
GET    /api/customers/{id}
POST   /api/customers
PUT    /api/customers/{id}
DELETE /api/customers/{id}
```

لكن Business Operations:

```text
POST /api/orders/{id}/approve
POST /api/payments/{id}/cancel
```

لا تجبر كل شيء على CRUD.

---

# 45. Pagination

استخدم Boundaries:

```text
page
pageSize
```

أو Cursor pagination إذا البيانات كبيرة ومتغيرة.

---

# 46. Filtering

لا تسمح arbitrary field access.

استخدم whitelist.

مثال:

```text
filter=status|eq|active
```

---

# 47. Sorting

حدد sortable fields.

---

# 48. Rate Limiting

حدد:

- anonymous.
- authenticated.
- per user.
- per IP.
- per API client.
- per operation.

ولا تجعل Rate Limit ثابتًا داخل Domain.

---

# 49. OpenAPI

اجعل Runtime API يولد OpenAPI.

لا تحافظ على Swagger يدوي منفصل.

---

# 50. Contract Source of Truth

النمط:

```text
Runtime Contracts
+ Endpoint Metadata
        ↓
Runtime OpenAPI
        ↓
Generated Clients / Docs / Postman
```

---

# 51. Typed Clients

لكل Client:

- generated DTOs.
- generated methods.
- error parsing.
- response metadata.
- auth injection.

---

# 52. Contract Determinism

إذا نفس OpenAPI:

```text
Generated Client Hash
=
Same Hash
```

---

# 53. Versioning

API Versioning عند الحاجة.

لا تبدأ بـv37.

استخدم:

```text
/v1
```

عندما يوجد Contract عام تحتاج حمايته.

---

# 54. Compatibility

أي تغيير:

- DTO.
- route.
- header.
- enum.
- nullability.
- DB.
- config.
- generated source.

يجب تقييمه.

---

# 55. Database Ownership

كل Application/Service يملك:

- schema.
- migrations.
- indexes.
- constraints.

لا تجعل Shared Library تشحن Product migration عامة.

---

# 56. EF Core / ORM Rules

- no lazy-loading surprises.
- explicit tracking.
- pagination server-side.
- no N+1.
- explicit includes/projections.
- cancellation tokens.
- transaction boundaries.

---

# 57. SQL Rules

- explicit indexes.
- explicit FK.
- explicit constraints.
- decimal precision.
- date/time policy.
- no uncontrolled `SELECT *`.
- no hidden dynamic SQL.

---

# 58. Date and Time

اختر سياسة:

```text
UTC internally
DateTimeOffset عند الحاجة للoffset
TimeProvider للوقت القابل للاختبار
```

---

# 59. Money

لا تستخدم floating point.

استخدم:

```text
decimal
currency
rounding policy
minor units إذا مناسب
```

---

# 60. Concurrency

استخدم Optimistic Concurrency غالبًا.

```text
Version
RowVersion
ETag / If-Match
```

---

# 61. Idempotency

للعمليات الحساسة:

```text
POST payment
POST transfer
POST create order
```

استخدم Idempotency Key.

---

# 62. Idempotency Fingerprint

يشمل:

- method.
- path.
- query.
- body hash.
- relevant headers.

---

# 63. Transactions

حدد:

```text
Single DB transaction
Cross-resource workflow
Distributed transaction?
Saga?
Outbox?
```

لا تستخدم Distributed Transaction إلا عند ضرورة حقيقية.

---

# 64. Domain Events vs Integration Events

## Domain Event

داخل النظام/العملية.

## Integration Event

يعبر حدود Service/System.

لا تخلطهما.

---

# 65. Messaging

استخدم عندما تحتاج:

- async processing.
- decoupling.
- buffering.
- retries.
- event-driven integration.

---

# 66. Messaging Providers

أمثلة:

- RabbitMQ.
- Kafka.
- Azure Service Bus.
- AWS SQS/SNS.
- NATS.

اختر حسب:

- throughput.
- ordering.
- replay.
- retention.
- operational complexity.

---

# 67. Outbox Pattern

إذا:

```text
DB commit
+
message publish
```

يجب أن يكون reliable.

استخدم Outbox عند الحاجة.

---

# 68. Inbox / Deduplication

Consumer side يحتاج dedup إذا delivery at-least-once.

---

# 69. Background Jobs

حدد:

- persistence.
- retry.
- poison jobs.
- timeout.
- concurrency.
- scheduling.
- monitoring.
- ownership.

---

# 70. Background Job Tools

- native BackgroundService.
- Hangfire.
- Quartz.NET.
- ABP Jobs.
- Celery.
- Sidekiq.
- cloud schedulers.

---

# 71. Caching

استخدم Cache فقط عندما يوجد سبب.

أنواع:

- memory.
- distributed.
- output cache.
- HTTP cache.
- hybrid cache.

---

# 72. Cache Key Design

يجب أن يشمل:

```text
project
tenant
resource
version
key
```

---

# 73. Redis

استخدمه عندما تحتاج:

- distributed cache.
- coordination.
- locks.
- ephemeral state.
- pub/sub أحيانًا.

لا تستخدم Redis كقاعدة بيانات رئيسية افتراضيًا.

---

# 74. Distributed Locking

استخدم عند وجود:

- shared resource.
- multi-instance race.
- scheduled singleton work.

ولا تستخدمه بدل transaction/concurrency إذا الأخير يكفي.

---

# 75. Files and BLOB Storage

حدد:

- metadata.
- storage provider.
- size.
- content type.
- virus scan.
- access.
- retention.
- encryption.
- signed URLs.

---

# 76. Storage Providers

- Local only for development.
- S3.
- Azure Blob Storage.
- MinIO.
- GCS.

---

# 77. Search

ابدأ بقاعدة البيانات.

انتقل إلى Search Engine عند Evidence:

- full-text.
- fuzzy search.
- ranking.
- facets.
- very large corpus.

---

# 78. Search Providers

- PostgreSQL FTS.
- SQL Server FTS.
- Elasticsearch.
- OpenSearch.
- Meilisearch.

---

# 79. Read Models

للـReports/Complex Query:

```text
Write Model
≠
Read Model
```

---

# 80. CQRS

استخدمه كفصل للقراءة/الكتابة عند الحاجة، لا كدين.

---

# 81. SQL Views

ممتازة عندما:

- multi-table report.
- stable projection.
- relational DB.

---

# 82. Data Warehouse

استخدمه عندما:

- analytics كبيرة.
- historical BI.
- ETL/ELT.
- operational DB لا يناسب التقارير.

---

# 83. Reporting

ابدأ:

```text
Query
→ Read Model
→ API
```

ثم BI Tool عند الحاجة.

---

# 84. Observability

المشروع غير قابل للتشغيل Production دونها.

ثلاثة أعمدة:

```text
Logs
Metrics
Traces
```

---

# 85. Logging

استخدم Structured Logging.

مثال:

```json
{
  "correlationId": "...",
  "userId": "...",
  "operation": "...",
  "status": "..."
}
```

ولا تطبع Secrets.

---

# 86. Metrics

راقب:

- requests.
- latency.
- errors.
- DB time.
- queue depth.
- job failures.
- cache hit.
- business metrics.

---

# 87. Tracing

Distributed tracing مفيد عند تعدد الخدمات.

استخدم OpenTelemetry عند الحاجة.

---

# 88. Health Checks

فرق بين:

```text
Liveness
Readiness
Startup
```

---

# 89. Resilience

External HTTP:

- timeout.
- retry.
- circuit breaker.
- rate limiting.
- fallback.
- bulkhead عندما يلزم.

---

# 90. Retry Rule

لا تعيد كل شيء تلقائيًا.

عمليات غير idempotent تحتاج حذرًا.

---

# 91. External Integrations

لكل Integration:

```text
Contract
Auth
Timeout
Retry
Idempotency
Error mapping
Circuit breaker
Logging
Sandbox
Production config
Reconciliation
```

---

# 92. Payment Integrations

إضافيًا:

- requestId.
- providerRef.
- status inquiry.
- pending.
- duplicate prevention.
- reconciliation.
- callback/webhook verification.

---

# 93. Webhooks

حدد:

- signature.
- timestamp.
- replay prevention.
- idempotency.
- retry.
- event ID.
- dead-letter.
- monitoring.

---

# 94. Realtime

Options:

- SignalR.
- WebSockets.
- SSE.
- provider-specific realtime.

لا تستخدم realtime إذا polling البسيط يكفي.

---

# 95. Frontend Architecture

افصل:

- transport.
- state.
- presentation.
- business view models.
- components.
- design system.

---

# 96. Design System

يجب أن يحدد:

- tokens.
- typography.
- spacing.
- colors.
- radius.
- elevation.
- motion.
- accessibility.
- RTL/LTR.
- responsive.

---

# 97. Accessibility

على الأقل:

- keyboard.
- focus.
- labels.
- contrast.
- no color-only feedback.
- semantic HTML.
- screen-reader considerations.

---

# 98. Responsive Design

حدد:

```text
Desktop
Tablet
Mobile
```

ولا تضغط Desktop داخل Mobile.

---

# 99. RTL/LTR

استخدم Logical CSS.

لا تعمل CSS مستقل كامل لكل اتجاه.

---

# 100. Frontend Security

لا تضع:

- secrets.
- private keys.
- authoritative permissions.

في browser.

---

# 101. Mobile Architecture

حدد:

- offline.
- sync.
- secure storage.
- push notifications.
- deep links.
- version compatibility.
- API lifecycle.

---

# 102. Desktop Applications

حدد:

- installer/update.
- local data.
- encryption.
- offline mode.
- OS permissions.
- crash reporting.

---

# 103. AI Projects

أضف طبقة خاصة:

```text
Use Case
→ Model
→ Prompt
→ Context
→ Evaluation
→ Guardrails
→ Cost
→ Latency
→ Fallback
→ Audit
```

---

# 104. AI Provider Abstraction

لا تربط الـDomain بمزود واحد.

استخدم Adapter.

---

# 105. AI Data Boundary

حدد:

- ما الذي يرسل للموديل؟
- هل يحتوي PII؟
- أين يخزن؟
- retention؟
- training usage؟
- redaction؟

---

# 106. Prompt Versioning

اعتبر Prompt Contract.

```text
prompt-v1
prompt-v2
```

---

# 107. AI Evaluation

لا تعتمد "يبدو جيدًا".

استخدم:

- dataset.
- expected behavior.
- scoring.
- regression tests.
- human review.

---

# 108. RAG

حدد:

- source ingestion.
- chunking.
- embedding.
- index.
- retrieval.
- citation.
- freshness.
- authorization filtering.

---

# 109. AI Agents

لا تبدأ Agent قبل Workflow واضح.

حدد:

- tools.
- permissions.
- memory.
- max steps.
- timeout.
- approval.
- rollback.
- audit.

---

# 110. Automation / Workflow Systems

حدد:

- states.
- transitions.
- actors.
- permissions.
- SLA.
- timers.
- compensation.
- audit trail.

---

# 111. Workflow State Machine

أفضل من if/else منتشر.

---

# 112. Audit

حدد Audit Event:

- who.
- what.
- when.
- before/after عند الحاجة.
- correlation.
- source.
- reason.

---

# 113. Audit Security

Audit log:

- append-only قدر الإمكان.
- protected.
- searchable.
- retention.
- access controlled.

---

# 114. Compliance

إذا المجال منظم:

حدد:

- PII.
- consent.
- retention.
- residency.
- audit.
- access reviews.
- deletion/anonymization.
- encryption.

---

# 115. Privacy

طبق Data Minimization.

لا تجمع شيئًا لا تحتاجه.

---

# 116. Encryption

## In Transit

TLS.

## At Rest

DB/storage encryption حسب الحاجة.

## Application-level

للحقول عالية الحساسية عند الحاجة.

---

# 117. Passwords

لا تخزن plaintext.

استخدم established password hashing provider.

---

# 118. Security Headers

في Web:

- CSP حسب الحاجة.
- HSTS.
- X-Content-Type-Options.
- frame policy.
- secure cookies.

---

# 119. CORS

لا تستخدم:

```text
AllowAnyOrigin
```

في Production بدون سبب.

---

# 120. CSRF

مهم في cookie-based browser authentication.

---

# 121. SSRF / Injection / XSS

كل External Input untrusted.

---

# 122. File Upload Security

- extension لا تكفي.
- content validation.
- size limits.
- malware scan.
- non-executable storage.
- random names.

---

# 123. Dependency Security

كل PR:

- audit.
- CVE.
- critical update policy.
- Dependabot/Renovate.

---

# 124. Static Analysis

أمثلة:

- CodeQL.
- Sonar.
- language analyzers.

---

# 125. Container Security

- minimal base image.
- non-root.
- pinned image version.
- no secret in image.
- scan image.

---

# 126. Docker

استخدم Multi-stage builds.

---

# 127. Docker Compose

مناسب لـ:

- local dev.
- integration tests.
- demo environments.

---

# 128. Kubernetes

لا تستخدمه تلقائيًا.

استخدمه عند وجود:

- multiple services.
- scaling.
- operational team.
- deployment complexity يبرره.

---

# 129. Cloud

يمكن:

- Azure.
- AWS.
- GCP.
- on-prem.
- hybrid.

Architecture يجب ألا تربط الـDomain بمزود Cloud.

---

# 130. Infrastructure as Code

لـProduction:

- Terraform.
- Bicep.
- CloudFormation.
- Pulumi.

عند وجود Infrastructure معتبرة.

---

# 131. CI/CD

CI يثبت الجودة.

CD ينشر.

افصل بينهما.

---

# 132. Git Workflow

```text
Issue
→ Branch
→ PR
→ CI
→ Review
→ Merge
→ Deploy
```

---

# 133. Branch Naming

مثال:

```text
feat/
fix/
chore/
docs/
security/
refactor/
```

---

# 134. Pull Request Template

يجب أن يحتوي:

```text
Purpose
Scope
Architecture
API impact
DB migration
Security
Tests
Compatibility
Deployment impact
Evidence
```

---

# 135. Exact-Head CI

قبل merge:

```text
HEAD SHA
→ all required checks green
```

أي commit جديد = إعادة التحقق.

---

# 136. CI Layers

## Basic

- restore.
- build.
- unit tests.

## Architecture

- dependency boundaries.

## Integration

- DB.
- cache.
- external simulators.

## Contract

- OpenAPI.
- generated clients.

## E2E

- real runtime.

## Security

- scan.

---

# 137. Example CI Set

```text
ci.yml
security.yml
codeql.yml
integration.yml
contract-proof.yml
frontend.yml
e2e.yml
release.yml
```

---

# 138. Unit Tests

اختبر:

- domain.
- validation.
- policies.
- mapping.
- pure services.

---

# 139. Architecture Tests

اختبر:

- Domain لا يعتمد Infrastructure.
- no forbidden reference.
- no mutable global state.
- naming.
- package boundaries.

---

# 140. Integration Tests

اختبر:

- DB.
- migration.
- repository.
- transactions.
- external adapters.

---

# 141. API Tests

اختبر:

- 2xx.
- 4xx.
- 5xx mapping.
- auth.
- headers.
- pagination.
- concurrency.
- idempotency.

---

# 142. E2E Tests

اختبر User Flow كامل.

مثال:

```text
Login
→ Create
→ Approve
→ Process
→ Verify
```

---

# 143. Smoke Tests

شغّلها بعد Deploy.

---

# 144. Contract Tests

بين Services:

- provider.
- consumer.
- schema compatibility.

---

# 145. Performance Tests

أنواع:

- load.
- stress.
- spike.
- soak.

---

# 146. Performance Budget

حدد:

- P50.
- P95.
- P99.
- throughput.
- DB query budget.
- frontend load budget.

---

# 147. Database Performance

راقب:

- slow queries.
- missing indexes.
- blocking.
- deadlocks.
- connections.
- query plans.

---

# 148. Profiling

استخدم profiler عند Evidence، لا التخمين.

---

# 149. Caching Performance

لا تعالج Query سيئة بـCache قبل فهم السبب.

---

# 150. Generator / Automation Decision

لا تبن Generator من اليوم الأول.

ابنِ أولًا manual reference.

ثم عندما يتكرر:

```text
Repeatable pattern
→ generator candidate
```

---

# 151. Generator Source of Truth

يستهلك Canonical Model.

لا يخترع Model ثاني.

---

# 152. Generator Safety

- safe identifiers.
- bounded paths.
- deterministic output.
- no arbitrary code execution.
- no arbitrary filesystem paths from browser.

---

# 153. Generator Determinism

ممنوع:

- current timestamp.
- random order.
- random ID.
- machine path.

---

# 154. Generated Ownership

أنشئ Marker:

```json
{
  "generatorVersion": "...",
  "files": {
    "path": "sha256"
  }
}
```

---

# 155. Safe Regeneration

```text
Validate ownership
→ generate temp
→ diff
→ preview
→ apply
```

---

# 156. Consumer Customization

حدد مسارًا:

```text
Custom/
Extensions/
Overrides/
```

لا تجبر المطور أن يعدل generated file.

---

# 157. Partial Hooks / Extension Points

وفر:

- DI hooks.
- pipeline hooks.
- business handlers.
- UI overrides.
- configuration hooks.

---

# 158. Visual Project Studio

إذا المشروع Platform/Factory:

يبني UI لـ:

- project.
- modules.
- features.
- providers.
- resources.
- fields.
- relationships.
- policies.
- preview.
- generation.

---

# 159. Feature Catalog

كل Feature:

```text
Id
Name
Category
Dependencies
Maturity
Providers
Evidence
```

---

# 160. Maturity Levels

استخدم:

```text
Planned
Reference
Preview
Stable
```

أو:

```text
Generated
ProviderReady
Reference
Planned
```

---

# 161. Capability Evidence

لا ترفع Maturity لأن الكود موجود فقط.

اطلب:

- tests.
- runtime.
- compatibility.
- integration.
- docs.
- provider support.

---

# 162. Preview Before Generate

```text
Design
→ generate temp
→ compare
→ show create/update/delete
→ warnings
→ approve
```

---

# 163. Data Designer

يمكن دعم:

- Text.
- Integer.
- Decimal.
- Boolean.
- Date.
- DateTime.
- Guid.
- Reference.
- Enum.
- Money.
- JSON فقط إذا مدعوم بوضوح.

---

# 164. Relationship Designer

يدعم:

- one-to-one.
- one-to-many.
- many-to-many.

لكن لا تولد علاقة بدون FK/constraint واضح.

---

# 165. Business UI Generation

يمكن توليد:

- list.
- create.
- edit.
- details.
- delete.
- search.
- filters.
- pagination.

لكن لا تعتبر generated UX نهائية دائمًا.

---

# 166. Reference Host / Workbench

في Platform project:

ابنِ تطبيقًا مرجعيًا حقيقيًا يثبت الـCore.

---

# 167. Workbench Rule

```text
لا تولد شيئًا لم تثبت يدويًا أنه يعمل.
```

---

# 168. Evidence Ladder

```text
Unit
→ Integration
→ Runtime
→ Generated Runtime
→ Security
→ Production
```

---

# 169. Documentation

لكل Capability مهمة:

```text
Purpose
Non-goals
Architecture
Contracts
Provider boundary
Failure behavior
Security
Tests
Migration
Compatibility
Production boundary
```

---

# 170. README

README = Navigation.

لا تضع كل التفاصيل فيه.

---

# 171. Changelog

يسجل:

- contract changes.
- migrations.
- features.
- security.
- architecture.
- compatibility.

---

# 172. Contribution Guide

حدد:

- branch.
- tests.
- lint.
- docs.
- PR.
- review.
- merge.

---

# 173. Security Policy

حدد:

- reporting security issue.
- secrets.
- dependency policy.
- supported versions.

---

# 174. Release Strategy

قبل 1.0:

```text
0.x
alpha
beta
rc
pre-release
```

حسب المشروع.

---

# 175. Release Artifact

يجب أن يحتوي:

- version.
- commit.
- notes.
- migrations.
- known issues.
- rollback notes.

---

# 176. Semantic Versioning

استخدم عندما لديك Public Contract.

---

# 177. Database Migration Release

قبل Deploy:

- backup.
- compatibility.
- rollback strategy.
- zero-downtime إذا مطلوب.

---

# 178. Feature Flags

استخدم لإطلاق تدريجي.

لكن لا تجعلها بديلًا عن cleanup.

---

# 179. Deployment Environments

```text
Local
CI
Dev
QA
Staging
Production
```

---

# 180. Deployment Strategy

Options:

- Rolling.
- Blue/Green.
- Canary.
- Recreate.

---

# 181. Rollback

حدد قبل النشر:

```text
App rollback
DB rollback / forward fix
Feature flag
Traffic rollback
```

---

# 182. Production Readiness

Repository green لا يكفي.

---

# 183. Production Checklist

## Governance

- protected main.
- required PR.
- review.
- approvals.

## Security

- secrets.
- TLS.
- least privilege.
- vulnerability status.

## Database

- backups.
- restore tested.
- migrations reviewed.

## Observability

- logs.
- metrics.
- traces.
- alerts.

## Reliability

- timeout.
- retry.
- incident plan.
- rollback.

## Performance

- load test.
- capacity.

## Product

- acceptance.
- support.
- SLA/SLO.

---

# 184. SLO

حدد Service Level Objective.

مثال:

```text
99.9% availability
P95 < 300 ms
```

---

# 185. SLA

Business commitment.

لا تساوِ SLA بـSLO.

---

# 186. Error Budget

في الأنظمة المتقدمة، استخدم Error Budget لتوازن التطوير والاستقرار.

---

# 187. Incident Management

حدد:

- severity.
- owner.
- communication.
- mitigation.
- postmortem.

---

# 188. Postmortem

بدون لوم.

يركز:

- ماذا حدث؟
- لماذا؟
- detection؟
- response؟
- prevention؟

---

# 189. Backup and Restore

Backup بدون Restore Test لا يعتبر مضمونًا.

---

# 190. Disaster Recovery

حدد:

- RPO.
- RTO.
- region strategy.
- failover.

---

# 191. Business Continuity

للأنظمة الحرجة:

- manual fallback.
- offline procedure.
- support contacts.

---

# 192. Security Testing

- SAST.
- DAST عند الحاجة.
- dependency scan.
- penetration test.
- threat modeling.

---

# 193. Threat Modeling

لكل Feature حساسة:

```text
Assets
Actors
Trust Boundaries
Threats
Controls
Residual Risk
```

---

# 194. Compliance Evidence

احتفظ:

- audit.
- approvals.
- changes.
- release evidence.
- access review.

---

# 195. Production Data

لا تستخدم Production data في Dev بدون masking/authorization.

---

# 196. Data Retention

حدد:

```text
What
How long
Why
How deleted
```

---

# 197. Soft Delete vs Hard Delete

قرار Business/Compliance، ليس Default تقني.

---

# 198. Data Export

إذا المنتج يحتاج:

- CSV.
- Excel.
- PDF.
- API.

لا تجعل Export يستنزف Transactional API.

---

# 199. Import

حدد:

- schema.
- validation.
- partial failure.
- idempotency.
- error report.
- batch size.

---

# 200. Auditability

كل عملية مالية/إدارية حساسة تحتاج trace واضح.

---

# 201. Financial Systems إضافيًا

حدد:

- double-entry إذا مناسب.
- immutable ledger.
- reconciliation.
- settlement.
- rounding.
- currency.
- transaction state.
- reversal.

---

# 202. Healthcare إضافيًا

حدد:

- patient privacy.
- consent.
- access logs.
- data minimization.
- retention.

---

# 203. Government إضافيًا

حدد:

- audit.
- access levels.
- data residency.
- records retention.
- integration governance.

---

# 204. E-commerce إضافيًا

حدد:

- cart.
- inventory.
- reservation.
- payment.
- order state.
- refund.
- reconciliation.

---

# 205. SaaS إضافيًا

حدد:

- tenant.
- subscription.
- billing.
- plans.
- feature limits.
- usage.
- support.

---

# 206. Marketplace إضافيًا

حدد:

- sellers.
- buyers.
- commission.
- payout.
- dispute.
- trust/safety.

---

# 207. Data Platform إضافيًا

حدد:

- ingestion.
- schema evolution.
- lineage.
- quality.
- warehouse/lake.
- retention.
- access.

---

# 208. Integration Platform إضافيًا

حدد:

- connectors.
- credentials.
- retries.
- mapping.
- transformations.
- versioning.
- observability.

---

# 209. Project Management

قسم العمل إلى Milestones.

---

# 210. Milestone Rule

كل Milestone له:

```text
Goal
Deliverables
Gate
Evidence
Non-goals
```

---

# 211. Generic Milestone Plan

```text
M0 Definition
M1 Repository
M2 Architecture
M3 First Vertical Slice
M4 Security/Auth
M5 Contract/API
M6 Reliability
M7 Business Modules
M8 Read Models
M9 Frontend
M10 Integrations
M11 Automation/Generation
M12 Hardening
M13 Pre-production
M14 Production
```

---

# 212. Definition of Done للFeature

```text
[ ] requirements
[ ] design
[ ] code
[ ] unit tests
[ ] integration tests
[ ] security
[ ] error behavior
[ ] docs
[ ] migration
[ ] observability
[ ] CI
[ ] acceptance
```

---

# 213. Requirements Traceability

Feature يجب أن تربط:

```text
Requirement
→ Design
→ Code
→ Test
→ Evidence
```

---

# 214. Product Requirements

PRD يوضح:

- user problem.
- user flow.
- edge cases.
- business rules.
- analytics.
- acceptance.

---

# 215. Technical Requirements

توضح:

- architecture.
- API.
- DB.
- security.
- performance.
- integrations.
- operations.

---

# 216. Non-Functional Requirements

لا تؤجل:

- performance.
- security.
- availability.
- scalability.
- accessibility.
- audit.
- maintainability.

---

# 217. Acceptance Criteria

اكتب Given/When/Then إذا مناسب.

---

# 218. QA Strategy

حدد:

- unit responsibility.
- developer testing.
- QA testing.
- regression.
- automation.
- exploratory.
- UAT.

---

# 219. Test Data

- deterministic.
- no real secrets.
- no uncontrolled production data.
- fixtures.

---

# 220. QA Environments

اعزل بياناتها.

---

# 221. UAT

User Acceptance Test يثبت Business value، لا مجرد Technical correctness.

---

# 222. Release Candidate

لا تجعل كل commit Production.

استخدم Candidate عند الحاجة.

---

# 223. Change Management

في المؤسسات:

- change request.
- impact.
- approver.
- window.
- rollback.

---

# 224. Repository Hygiene

- branches القديمة تحذف.
- superseded PRs تغلق.
- generated artifacts لا تتراكم.
- releases محفوظة.
- main نظيف.

---

# 225. Branch Protection

عند Production:

- PR required.
- required checks.
- review.
- no force push.
- no delete.
- signed commits إذا السياسة تتطلب.

---

# 226. CODEOWNERS

مفيد لفرض review على:

- security.
- infra.
- payments.
- shared contracts.

---

# 227. Templates

استخدم:

- issue.
- bug.
- feature.
- PR.
- security.

---

# 228. Automation

أي عملية تتكرر 3+ مرات وتسبب أخطاء مرشحة للأتمتة.

---

# 229. Scripts

احتفظ بـ:

```text
verify
build
test
pack
run
smoke
migrate
generate
```

---

# 230. Developer Experience

Developer يجب أن يستطيع:

```text
clone
→ setup
→ run
→ test
```

بأقل خطوات.

---

# 231. Local Development

وثق:

- prerequisites.
- commands.
- ports.
- secrets.
- DB.
- troubleshooting.

---

# 232. Dev Containers

اختياري لتحسين consistency.

---

# 233. Package / Artifact Registry

لـLibraries:

- NuGet.
- npm.
- Maven.
- container registry.

---

# 234. Library Projects

تحتاج:

- API compatibility.
- versioning.
- package metadata.
- consumer tests.
- migration guides.

---

# 235. Platform Projects

تحتاج أيضًا:

- capability model.
- provider abstraction.
- reference consumer.
- generator.
- studio إذا justified.

---

# 236. Business App Projects

لا تحتاج كل Platform features.

ركز:

- business.
- UX.
- integrations.
- operations.

---

# 237. Small Project Profile

استخدم:

```text
Single solution
Modular folders
One DB
One API
One frontend
Basic CI
Basic security
```

---

# 238. Medium Project Profile

```text
Modular monolith
Separate layers
Integration tests
OpenAPI
Typed client
CI/security
Observability
```

---

# 239. Large Project Profile

```text
Module boundaries
Async integration
Caching
Read models
Feature flags
Full CI/CD
Observability
Governance
```

---

# 240. Platform Profile

```text
Reusable packages
Capability graph
Providers
Generator
Studio
Compatibility
Consumer proofs
```

---

# 241. Mission Critical Profile

إضافيًا:

- HA.
- DR.
- formal security.
- penetration testing.
- strict governance.
- audit.
- SLO.
- incident drills.

---

# 242. Technology Decision Checklist

قبل إضافة تقنية:

```text
[ ] مشكلة واضحة
[ ] بدائل
[ ] تكلفة تشغيل
[ ] مهارات الفريق
[ ] security
[ ] LTS/support
[ ] vendor lock-in
[ ] migration path
[ ] observability
[ ] testability
```

---

# 243. Framework Decision

لا تستخدم Framework إذا Library صغيرة تكفي.

---

# 244. Provider Abstraction

لا تعمم مبكرًا.

اعمل abstraction فقط إذا:

- multiple providers.
- testability.
- isolation.
- business needs.

---

# 245. YAGNI

لا تبن:

- Kafka.
- Redis.
- Kubernetes.
- Elasticsearch.
- Event Sourcing.
- CQRS كامل.
- Microservices.

بدون Evidence.

---

# 246. Event Sourcing

استخدم فقط عندما:

- history itself is source.
- audit/rebuild projections مهم.
- team قادر على التعقيد.

---

# 247. DDD

استخدم tactical patterns حيث business domain معقد.

لا تجعل كل CRUD bounded context.

---

# 248. Bounded Context

يحدد Business boundary، لا folder فقط.

---

# 249. Anti-Corruption Layer

مفيد مع Legacy/External System.

---

# 250. Legacy Integration

لا تسمح legacy model يتسرب لكل النظام.

---

# 251. Migration from Legacy

خطط:

- data extraction.
- mapping.
- validation.
- dual-run.
- reconciliation.
- cutover.
- rollback.

---

# 252. Strangler Pattern

مفيد لاستبدال نظام قديم تدريجيًا.

---

# 253. Database Migration Safety

- backward compatible first.
- code deploy.
- data migrate.
- cleanup later.

---

# 254. Zero-Downtime Migration

استخدم Expand/Contract.

---

# 255. Feature Deprecation

- mark deprecated.
- communicate.
- migrate.
- remove في major version.

---

# 256. API Deprecation

حدد sunset policy.

---

# 257. Documentation Source of Truth

كل موضوع له Owner.

---

# 258. Generated Docs

إذا يمكن توليدها، لا تعدل يدويًا.

---

# 259. Diagrams

استخدم:

- C4.
- sequence diagrams.
- data flow.
- deployment diagram.

---

# 260. C4 Model

- Context.
- Container.
- Component.
- Code عند الحاجة.

---

# 261. Sequence Diagram

مهم للعمليات الحساسة:

- payment.
- approval.
- login.
- callback.
- reconciliation.

---

# 262. Data Flow Diagram

مفيد للأمن والخصوصية.

---

# 263. Runbooks

Production يحتاج:

- restart.
- rollback.
- rotate secret.
- restore DB.
- investigate incident.

---

# 264. Operational Ownership

كل Service له Owner.

---

# 265. On-call

للأنظمة الحرجة.

---

# 266. Alerts

Alert على User Impact، لا كل metric.

---

# 267. Alert Fatigue

قلل alerts غير القابلة للتصرف.

---

# 268. Dashboards

على الأقل:

- traffic.
- errors.
- latency.
- saturation.
- dependency health.
- business flow.

---

# 269. Cost Observability

Cloud/AI projects تحتاج Cost metrics.

---

# 270. Scaling

ابدأ Vertical غالبًا.

ثم Horizontal عند الحاجة.

---

# 271. Stateless Services

تسهل horizontal scaling.

---

# 272. Session State

تجنب server-local session في multi-instance بدون استراتيجية.

---

# 273. Load Balancer

مع multi-instance.

---

# 274. CDN

للstatic/global content.

---

# 275. Queues as Buffer

مفيدة للspikes.

---

# 276. Capacity Planning

اعتمد على measurements.

---

# 277. Architecture Review

عند milestone كبير:

- boundaries.
- coupling.
- dependencies.
- security.
- performance.
- operations.

---

# 278. Code Review

راجع:

- correctness.
- design.
- security.
- tests.
- maintainability.

---

# 279. Static Analysis != Code Review

كلاهما مطلوب.

---

# 280. Refactoring

لا تنتظر "مرحلة refactor".

اعمل incremental refactoring.

---

# 281. Technical Debt

سجل:

```text
Debt
Impact
Risk
Owner
Priority
```

---

# 282. Performance Debt

سجله منفصلًا.

---

# 283. Security Debt

لا تترك critical security debt ضمن backlog عادي.

---

# 284. Architecture Fitness Functions

حوّل قواعد المعمارية لاختبارات حيث يمكن.

---

# 285. Maturity Review

كل فترة:

- capabilities.
- dependencies.
- providers.
- stale docs.
- stale flags.
- unsupported versions.

---

# 286. Consumer-driven Development

إذا لديك Platform:

لا تضف Core feature إلا عند Evidence من Consumer.

---

# 287. Gap Classification

عند ظهور نقص:

```text
Business-specific?
→ Product

General reusable?
→ Shared layer

Provider-specific?
→ Adapter

Environment-specific?
→ Deployment
```

---

# 288. Production Bug Classification

- code.
- config.
- data.
- infrastructure.
- dependency.
- security.
- external provider.

---

# 289. Root Cause Analysis

لا تقف عند "null reference".

اسأل لماذا سمح النظام بها.

---

# 290. Reliability Patterns

حسب الحاجة:

- timeout.
- retry.
- circuit breaker.
- bulkhead.
- rate limit.
- idempotency.
- queue.
- saga.
- outbox.

---

# 291. Saga

للـDistributed workflow مع compensation.

---

# 292. Reconciliation

مهم عند:

- payments.
- async providers.
- eventual consistency.

---

# 293. Eventual Consistency

وثقها للمستخدمين والـUI.

---

# 294. Pending State

لا تحول timeout تلقائيًا إلى failed.

---

# 295. Unknown State

في العمليات المالية:

```text
Unknown
→ Inquiry/Reconcile
```

ولا تعيد Execute تلقائيًا.

---

# 296. API Client Resilience

Client يجب أن يعرف:

- timeout.
- retry policy.
- idempotency.
- cancellation.

---

# 297. SDK Generation

إذا Public API:

ولد SDKs من contract إذا ذلك عملي.

---

# 298. API Gateway

استخدم عند تعدد الخدمات أو الحاجة:

- auth.
- routing.
- throttling.
- analytics.

---

# 299. BFF

Backend for Frontend مفيد عند اختلاف احتياجات:

- web.
- mobile.
- partner.

---

# 300. GraphQL

استخدم عندما client query flexibility حقيقية.

لا تستخدم فقط لأنه حديث.

---

# 301. gRPC

مناسب لـservice-to-service عالي الأداء وعقود قوية.

---

# 302. REST

أفضل Default في كثير من الحالات.

---

# 303. WebSockets / SignalR

للrealtime الحقيقي.

---

# 304. Localization

حدد:

- language.
- culture.
- formatting.
- timezone.
- RTL/LTR.

---

# 305. Feature Management

Feature Flag contract:

- key.
- default.
- scope.
- provider.
- fallback.

---

# 306. Settings

افصل:

```text
Configuration
Business Settings
User Preferences
Feature Flags
Secrets
```

---

# 307. Settings Precedence

مثال:

```text
User
→ Tenant
→ Project
→ Global
→ Default
```

---

# 308. Notification System

حدد:

- channels.
- template.
- preference.
- retries.
- history.
- localization.

---

# 309. Notification Channels

- Email.
- SMS.
- Push.
- WhatsApp.
- In-app.

---

# 310. Email

استخدم Provider abstraction.

---

# 311. SMS

ضع rate/cost/error handling.

---

# 312. Push

تعامل مع device tokens lifecycle.

---

# 313. Webhook/Event Notifications

لا تخلطها مع User notifications.

---

# 314. Workflow Approvals

حدد:

- maker.
- checker.
- permission.
- comments.
- status.
- audit.

---

# 315. SLA / Business Hours

إذا Process-driven system.

---

# 316. Tasks

افصل Task management عن Workflow engine إذا domains مختلفة.

---

# 317. Comments / Activity

حدد retention/security.

---

# 318. Numbering / Sequences

لا تستخدم `MAX()+1`.

---

# 319. Unique Business IDs

استخدم sequence/provider مناسب.

---

# 320. Import/Export Jobs

شغل async إذا كبير.

---

# 321. Batch Processing

حدد:

- chunk size.
- retries.
- checkpoint.
- partial failure.

---

# 322. Scheduler

استخدم job system عند الحاجة.

---

# 323. Localization of Errors

افصل error code عن display message.

---

# 324. Error Codes

Stable codes مفيدة للclients.

---

# 325. Logging Error Details

لا تعرض stack trace للعميل Production.

---

# 326. Security Incident

لديه Runbook منفصل.

---

# 327. Secret Rotation

يجب أن يكون ممكنًا بدون rebuild.

---

# 328. Key Rotation

للJWT/encryption عند الحاجة.

---

# 329. Certificates

monitor expiry.

---

# 330. Timeouts

كل external call يجب أن يملك timeout.

---

# 331. Cancellation

Propagate cancellation tokens.

---

# 332. Async

لا تستخدم async بلا حاجة، ولا blocking I/O في request path.

---

# 333. Thread Safety

Singletons يجب أن تكون stateless/thread-safe.

---

# 334. Dependency Injection Lifetime

حدد:

- Singleton.
- Scoped.
- Transient.

بعناية.

---

# 335. Memory

راقب:

- allocations.
- leaks.
- cache growth.

---

# 336. API Payload

لا ترسل 20MB JSON بلا حاجة.

---

# 337. Compression

استخدم عند الحاجة.

---

# 338. Pagination Required

لأي list unbounded.

---

# 339. Bulk APIs

إذا high-volume integration.

---

# 340. Partial Failure

Batch APIs تحتاج per-item result.

---

# 341. Concurrency Limits

للjobs/integrations.

---

# 342. Backpressure

مهم في pipelines والqueues.

---

# 343. Data Validation

لا تثق بمزود خارجي.

---

# 344. Provider Mapping

لا تسرب provider enums للDomain إذا يمكن تجنبها.

---

# 345. Anti-Corruption Layer

مرة أخرى مهم جدًا للintegrations.

---

# 346. Testing External Providers

استخدم:

- sandbox.
- mock.
- contract tests.
- replay fixtures.

---

# 347. Network Failure Tests

اختبر:

- timeout.
- reset.
- 500.
- malformed response.
- partial response.

---

# 348. Chaos Testing

للأنظمة المتقدمة فقط.

---

# 349. Release Evidence

كل Release يحتفظ:

- SHA.
- test status.
- security status.
- migrations.
- artifacts.

---

# 350. SBOM

مفيد للمؤسسات والأمن.

---

# 351. Supply Chain Security

- pinned actions.
- dependency checks.
- artifact signing عند الحاجة.

---

# 352. CI Secrets

Least privilege.

---

# 353. CI Permissions

GitHub Actions:

استخدم minimal permissions.

---

# 354. Third-party Actions

Pin to immutable version/SHA إذا سياسة الأمن تتطلب.

---

# 355. Code Signing

لـDesktop/packages في البيئات التي تحتاج.

---

# 356. Artifact Integrity

Hashes/signatures.

---

# 357. Reproducible Build

هدف مهم للمشاريع الحساسة.

---

# 358. Open-source Compliance

إذا المنتج يستخدم OSS:

- licenses.
- notices.
- obligations.

---

# 359. License

حدد License للـRepository.

---

# 360. Data Classification

صنف:

```text
Public
Internal
Confidential
Restricted
```

---

# 361. Access Control

طبق least privilege.

---

# 362. Admin Actions

تحتاج stronger audit/MFA حسب الحساسية.

---

# 363. MFA

للadmins والعمليات الحساسة.

---

# 364. Step-up Authentication

للعمليات عالية الخطورة.

---

# 365. Session Security

- expiration.
- revoke.
- device/session management إذا مهم.

---

# 366. API Keys

- scoped.
- hashed if stored.
- rotation.
- expiry.
- audit.

---

# 367. Service-to-Service Auth

Options:

- OAuth2 client credentials.
- mTLS.
- managed identity.
- signed requests.

---

# 368. Zero Trust

لا تثق بالشبكة وحدها.

---

# 369. Network Segmentation

للأنظمة الحساسة.

---

# 370. Database Permissions

App user لا يكون DBA.

---

# 371. Migration User

يمكن فصله عن Runtime user.

---

# 372. Read Replica

للread-heavy عند الحاجة.

---

# 373. Connection Pool

راقبه.

---

# 374. DB Timeout

حدد command timeout معقول.

---

# 375. Long-running Reports

لا تشغلها داخل request path دائمًا.

---

# 376. Async Export

أفضل للتقارير الكبيرة.

---

# 377. Content Delivery

Static assets عبر CDN عند الحاجة.

---

# 378. Browser Caching

استخدم cache headers للأصول.

---

# 379. Versioned Assets

hash filenames.

---

# 380. Frontend Error Boundary

يجب أن يكون موجودًا.

---

# 381. Client Telemetry

Crash/error reporting بدون تسريب PII.

---

# 382. Mobile Analytics

احترم privacy.

---

# 383. Product Analytics

حدد events بشكل versioned.

---

# 384. Business Metrics

مثال:

- completed orders.
- failed payments.
- approval turnaround.

---

# 385. Technical Metrics ≠ Business Metrics

كلاهما مطلوب.

---

# 386. Documentation Checklist

```text
README
Architecture
Local Dev
Testing
API
DB
Security
Deployment
Operations
Production Readiness
Changelog
```

---

# 387. Team Onboarding

Developer جديد يجب أن يقدر يشغل المشروع خلال وقت معقول.

---

# 388. Ownership Matrix

حدد Owner لكل:

- module.
- DB.
- deployment.
- external integration.
- security.

---

# 389. RACI

مفيد للمؤسسات.

---

# 390. Risk Register

لكل مشروع كبير:

```text
Risk
Probability
Impact
Mitigation
Owner
Status
```

---

# 391. Technical Risks

- vendor lock-in.
- scalability.
- unsupported dependency.
- migration complexity.
- security.

---

# 392. Product Risks

- adoption.
- unclear requirement.
- partner dependency.

---

# 393. Operational Risks

- single point of failure.
- no backup.
- no monitoring.

---

# 394. Release Gate

لا تنشر لأن "كل شيء يبدو تمام".

استخدم Checklist.

---

# 395. Universal Release Gate

```text
Repository hygiene          PASS
Build                       PASS
Unit tests                  PASS
Architecture tests          PASS
Integration tests           PASS
API/Contract tests          PASS
E2E                         PASS
Security scan               PASS
Dependency audit            PASS
Migration review            PASS
Observability               READY
Rollback                    READY
Docs                        CURRENT
Known issues                DOCUMENTED
Product acceptance          PASS
```

---

# 396. Universal Production Gate

```text
Release Gate
+
Protected main
+
Secrets/KMS
+
TLS
+
Least privilege
+
Backup/Restore
+
Load test
+
Monitoring/Alerts
+
Incident plan
+
Security approval
+
Business approval
=
Production
```

---

# 397. Definition of Consumer-ready

```text
Can another developer/team:
clone/use/install
configure
build
run
understand
extend
test
without hidden tribal knowledge?
```

إذا نعم، أنت قريب من Consumer-ready.

---

# 398. Definition of Production-ready

```text
Can the organization:
deploy
operate
observe
recover
secure
audit
support
upgrade
rollback
```

إذا نعم، Production-ready.

---

# 399. Universal Execution Flow

```text
IDEA
  ↓
PROJECT CHARTER
  ↓
REQUIREMENTS
  ↓
ARCHITECTURE
  ↓
TECH STACK
  ↓
REPOSITORY
  ↓
FIRST VERTICAL SLICE
  ↓
AUTH / SECURITY
  ↓
API / CONTRACT
  ↓
DATABASE / RELIABILITY
  ↓
BUSINESS MODULES
  ↓
READ MODELS
  ↓
FRONTEND / MOBILE
  ↓
INTEGRATIONS
  ↓
OBSERVABILITY
  ↓
AUTOMATION / GENERATION
  ↓
CI / SECURITY
  ↓
E2E / PERFORMANCE
  ↓
PRE-PRODUCTION
  ↓
PRODUCTION GOVERNANCE
  ↓
RELEASE
  ↓
OPERATE / LEARN
```

---

# 400. Milestone Template

```markdown
# Milestone X — <Name>

## Goal

## Scope

## Non-goals

## Deliverables

## Technical Decisions

## Risks

## Tests

## Security

## Evidence

## Acceptance Criteria

## Exit Gate
```

---

# 401. Feature Design Template

```markdown
# Feature: <Name>

## Problem

## User / Actor

## Business Rules

## API

## Data Model

## Authorization

## Validation

## Failure Cases

## Concurrency

## Idempotency

## Audit

## Observability

## Tests

## Migration

## Rollout

## Rollback
```

---

# 402. Integration Design Template

```markdown
# Integration: <Provider>

## Purpose

## Authentication

## Endpoints

## Request/Response

## Timeout

## Retry

## Idempotency

## Error Mapping

## Pending/Unknown

## Webhooks

## Reconciliation

## Logging

## Secrets

## Sandbox

## Production Checklist
```

---

# 403. API Design Template

```markdown
# API Contract

## Resource

## Endpoints

## Authentication

## Authorization

## Requests

## Responses

## Errors

## Pagination

## Filtering

## Sorting

## Idempotency

## Concurrency

## Rate Limit

## OpenAPI

## Compatibility
```

---

# 404. Database Design Template

```markdown
# Data Model

## Entities

## Relationships

## Constraints

## Indexes

## Concurrency

## Audit

## Retention

## Encryption

## Migration

## Backup

## Performance
```

---

# 405. Production Readiness Template

```markdown
# Production Readiness

## Release

## Infrastructure

## Security

## Database

## Backup/Restore

## Monitoring

## Alerts

## SLO/SLA

## Load

## Incident

## Rollback

## Compliance

## Approvals
```

---

# 406. PR Template

```markdown
## Purpose

## Scope

## Architecture Impact

## API Impact

## Database/Migration

## Security

## Tests

## Performance

## Compatibility

## Observability

## Deployment

## Rollback

## Exact Head Evidence
```

---

# 407. ADR Template

```markdown
# ADR-XXXX: <Decision>

Status: Proposed / Accepted / Superseded

## Context

## Decision

## Options Considered

## Why

## Consequences

## Risks

## Migration/Reversal
```

---

# 408. Risk Template

```markdown
| Risk | Probability | Impact | Mitigation | Owner | Status |
|---|---:|---:|---|---|---|
```

---

# 409. Technology Evaluation Template

```markdown
# Technology Evaluation: <Technology>

## Problem

## Alternatives

## Benefits

## Risks

## Security

## Operations

## Cost

## Team Skill

## Lock-in

## Migration

## Decision
```

---

# 410. Test Strategy Template

```markdown
# Test Strategy

## Unit

## Architecture

## Integration

## API

## Contract

## E2E

## Performance

## Security

## UAT

## Smoke

## Regression
```

---

# 411. Universal Checklist — بداية المشروع

- [ ] Problem.
- [ ] Users.
- [ ] Scope.
- [ ] Non-goals.
- [ ] Metrics.
- [ ] Risk.
- [ ] Architecture choice.
- [ ] Tech stack.
- [ ] ADR.
- [ ] Repository.

---

# 412. Universal Checklist — المعمارية

- [ ] Domain boundary.
- [ ] Application boundary.
- [ ] Infrastructure boundary.
- [ ] Presentation boundary.
- [ ] Modules.
- [ ] DB ownership.
- [ ] integration boundaries.
- [ ] auth.
- [ ] project/tenant isolation.
- [ ] compatibility.

---

# 413. Universal Checklist — الـAPI

- [ ] DTO ≠ Entity.
- [ ] Problem Details.
- [ ] correlation.
- [ ] auth.
- [ ] authorization.
- [ ] pagination.
- [ ] filtering.
- [ ] sorting.
- [ ] idempotency.
- [ ] concurrency.
- [ ] OpenAPI.
- [ ] versioning.

---

# 414. Universal Checklist — DB

- [ ] FK.
- [ ] indexes.
- [ ] unique constraints.
- [ ] decimal precision.
- [ ] date/time.
- [ ] concurrency.
- [ ] migrations.
- [ ] backup.
- [ ] restore.
- [ ] performance.

---

# 415. Universal Checklist — Frontend

- [ ] typed transport.
- [ ] loading.
- [ ] empty.
- [ ] error.
- [ ] validation.
- [ ] responsive.
- [ ] RTL/LTR.
- [ ] accessibility.
- [ ] no client-side authorization trust.
- [ ] design system.

---

# 416. Universal Checklist — Security

- [ ] auth.
- [ ] authorization.
- [ ] secrets.
- [ ] encryption.
- [ ] input validation.
- [ ] dependency scan.
- [ ] SAST.
- [ ] file safety.
- [ ] audit.
- [ ] least privilege.
- [ ] production review.

---

# 417. Universal Checklist — CI

- [ ] restore.
- [ ] build.
- [ ] tests.
- [ ] architecture.
- [ ] integration.
- [ ] security.
- [ ] artifact.
- [ ] contract.
- [ ] E2E.
- [ ] exact head.

---

# 418. Universal Checklist — Production

- [ ] release.
- [ ] infra.
- [ ] secrets.
- [ ] TLS.
- [ ] DB permissions.
- [ ] backup/restore.
- [ ] monitoring.
- [ ] alerts.
- [ ] performance.
- [ ] rollback.
- [ ] incident.
- [ ] approval.

---

# 419. الأخطاء الشائعة

## الخطأ 1
بدء المشروع من UI.

الصحيح:

```text
Problem
→ Domain
→ Contract
→ Vertical Slice
→ UI
```

---

## الخطأ 2
اختيار Microservices مبكرًا.

---

## الخطأ 3
اختيار NoSQL بدون حاجة.

---

## الخطأ 4
استخدام Redis لكل شيء.

---

## الخطأ 5
الاعتماد على Frontend validation.

---

## الخطأ 6
تعديل Postman يدويًا مع وجود OpenAPI.

---

## الخطأ 7
عدم وجود Error Contract.

---

## الخطأ 8
عدم وجود CorrelationId.

---

## الخطأ 9
عدم وضع Timeout.

---

## الخطأ 10
Retry لعملية غير idempotent.

---

## الخطأ 11
إعادة تنفيذ عملية مالية بعد timeout بدون inquiry.

---

## الخطأ 12
عدم وجود FK/index حقيقي.

---

## الخطأ 13
قراءة كل rows ثم filtering في memory.

---

## الخطأ 14
عدم فصل read/report models.

---

## الخطأ 15
توليد كود قبل تثبيت manual reference.

---

## الخطأ 16
Generator يكتب فوق custom code.

---

## الخطأ 17
كل Feature = Package جديد.

---

## الخطأ 18
كل Provider = Core dependency.

---

## الخطأ 19
كل green CI = Production.

---

## الخطأ 20
Documentation في نهاية المشروع.

---

# 420. المبادئ التي لا تتغير مهما تغيرت التقنية

```text
Boundary before feature
Contract before implementation spread
Evidence before maturity
Runtime before automation
One source of truth
Fail closed
Provider isolation
Consumer ownership
Deterministic generation
Safe customization
Exact-head CI
Production governance separate
```

---

# 421. النسخة المختصرة جدًا

```text
DEFINE
  ↓
ARCHITECT
  ↓
BUILD ONE REAL VERTICAL
  ↓
PROVE IT
  ↓
EXTRACT REUSE
  ↓
STANDARDIZE CONTRACTS
  ↓
ADD SECURITY/RELIABILITY
  ↓
BUILD BUSINESS
  ↓
OPTIMIZE READS
  ↓
BUILD CLIENTS
  ↓
AUTOMATE REPEATABLE WORK
  ↓
HARDEN CI
  ↓
PROVE E2E
  ↓
PREPARE OPERATIONS
  ↓
RELEASE
  ↓
MONITOR
  ↓
LEARN
```

---

# 422. القرار النهائي

أي شخص يريد تنفيذ مشروع قوي، مهما كان نوعه، يجب ألا يبدأ بالسؤال:

> ما Framework الذي سأستخدمه؟

ولا:

> كم شاشة نحتاج؟

ولا:

> هل نستخدم Microservices؟

السؤال الصحيح:

> ما المشكلة؟ ما العقود؟ ما الحدود؟ ما الدليل الذي يثبت أن كل طبقة تعمل؟

ثم:

```text
Problem
→ Requirements
→ Architecture
→ Contracts
→ Vertical Slice
→ Runtime Evidence
→ Security
→ Reliability
→ Business Modules
→ Integration
→ Client
→ Automation
→ CI
→ Production Governance
```

هذه هي المنهجية العامة.

---

# 423. الخلاصة

المشروع الجيد لا يُقاس بعدد:

- الخدمات.
- الحزم.
- الـFrameworks.
- الـmicroservices.
- الـcontainers.
- الـworkflows.

بل بمدى وضوح:

- الحدود.
- العقود.
- الملكية.
- الأدلة.
- التوافق.
- الأمان.
- قابلية التشغيل.
- قابلية التغيير.
- قابلية الاستعادة.
- قابلية التطوير.

إذا التزمت بهذا الدليل، تستطيع تطبيق نفس المنهج على مشروع صغير من 3 شاشات أو Platform ضخمة متعددة الخدمات، مع تغيير الحجم وليس تغيير الفلسفة.

> **Build the simplest correct system, prove it, then generalize only what evidence justifies.**
