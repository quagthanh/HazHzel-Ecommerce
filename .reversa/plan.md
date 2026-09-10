# Plano de Exploração — HazHzel-Ecommerce

> Criado pelo Reversa em 2026-09-10
> Marque cada tarefa com ✅ quando concluída.
> Você pode editar este plano antes de iniciar: adicione, remova ou reordene tarefas conforme necessário.

---

## Fase 1: Reconhecimento 🔍

- [x] ✅ **Scout** — Mapeamento de estrutura de pastas e tecnologias
- [x] ✅ **Scout** — Análise de dependências e gerenciadores de pacotes
- [x] ✅ **Scout** — Identificação de entry points, CI/CD e configurações

## Decisão de organização das specs 🗂️

> Entre o Scout e o Arqueólogo, o Reversa pergunta como você quer organizar as specs (por módulo, caso de uso, endpoint, híbrida, por features ou customizada). A escolha fica persistida em `.reversa/config.toml` na seção `[specs]` e não será reperguntada em execuções futuras. Para reapresentar o menu, remova manualmente a seção.

## Fase 2: Escavação 🏗️

> Módulos identificados pelo Scout em 2026-09-10.

- [x] ✅ **Archaeologist** — Análise do módulo `auth`
- [x] ✅ **Archaeologist** — Análise do módulo `address`
- [x] ✅ **Archaeologist** — Análise do módulo `admin`
- [x] ✅ **Archaeologist** — Análise do módulo `analytics`
- [ ] **Archaeologist** — Análise do módulo `cart`
- [ ] **Archaeologist** — Análise do módulo `cart-item`
- [ ] **Archaeologist** — Análise do módulo `category`
- [ ] **Archaeologist** — Análise do módulo `cloudinary`
- [ ] **Archaeologist** — Análise do módulo `collection`
- [ ] **Archaeologist** — Análise do módulo `discount`
- [ ] **Archaeologist** — Análise do módulo `inventory`
- [ ] **Archaeologist** — Análise do módulo `order`
- [ ] **Archaeologist** — Análise do módulo `payment`
- [ ] **Archaeologist** — Análise do módulo `permission`
- [ ] **Archaeologist** — Análise do módulo `product`
- [ ] **Archaeologist** — Análise do módulo `role`
- [ ] **Archaeologist** — Análise do módulo `supplier`
- [ ] **Archaeologist** — Análise do módulo `title-aggregation`
- [ ] **Archaeologist** — Análise do módulo `users`
- [ ] **Archaeologist** — Análise do módulo `variant`

## Fase 3: Interpretação 🧠

- [ ] **Detetive** — Arqueologia Git e ADRs retroativos
- [ ] **Detetive** — Regras de negócio implícitas e máquinas de estado
- [ ] **Detetive** — Matriz de permissões (RBAC/ACL)
- [ ] **Arquiteto** — Diagramas C4 (Contexto, Containers, Componentes)
- [ ] **Arquiteto** — ERD completo e integrações externas
- [ ] **Arquiteto** — Spec Impact Matrix

## Fase 4: Geração 📝

- [ ] **Redator** — Specs SDD por componente
- [ ] **Redator** — OpenAPI (se aplicável)
- [ ] **Redator** — User Stories (se aplicável)
- [ ] **Redator** — Code/Spec Matrix

## Fase 5: Revisão ✅

- [ ] **Revisor** — Revisão cruzada de specs
- [ ] **Revisor** — Resolução de lacunas com o usuário
- [ ] **Revisor** — Relatório de confiança final

---

## Agentes Independentes

> Execute estes agentes quando os recursos estiverem disponíveis — podem rodar em qualquer fase.

- [ ] **Visor** — Análise de interface via screenshots
- [ ] **Data Master** — Análise completa do banco de dados
- [ ] **Design System** — Extração de tokens de design
- [ ] **Tracer** — Análise dinâmica (requer sistema acessível)

---

## Próximo passo

Após o Time de Descoberta concluir e o `_reversa_sdd/` estar populado, você pode disparar um dos fluxos seguintes:

- `/reversa-migrate`: orquestrador do **Time de Migração** (Paradigm Advisor → Curator → Strategist → Designer → Screen Translator → Inspector). Gera as specs do sistema novo. Saída em `_reversa_sdd/migration/` e `_reversa_sdd/screens/`.
- `/reversa-reconstructor`: gera plano bottom-up para reimplementar o software a partir das specs do legado (uma tarefa por sessão).
