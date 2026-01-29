# Portfolio Admin + API

<div align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src= "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src= "https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src= "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src= "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src= "https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src= "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src= "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src= "https://img.shields.io/badge/in%20development-yellow?style=for-the-badge" />
  <!-- <img src= "https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white" /> -->
</div>

Projeto fullstack criado para gerenciar dinamicamente as informações exibidas em um portfólio pessoal, utilizando uma **API REST** com **portal admin** e um **frontend SPA** integrado.

A proposta é evitar rebuilds constantes do portfólio sempre que algum dado muda, centralizando tudo em uma API administrável.

---

## 🧱 Arquitetura

```
portfolio-back/
├─ api/        # Backend (Express + Prisma)
├─ client/     # Frontend (React + Vite + Tailwind + HeroUI)
├─ package.json
└─ README.md
```

* **API**: responsável por regras de negócio, autenticação e persistência
* **Client**: portal admin (SPA)

---

## 🚀 Tecnologias

### Backend

* Node.js
* Express
* Prisma ORM
* TypeScript
* tsup

### Frontend

* React
* Vite
* TailwindCSS
* HeroUI

### Banco de dados
* Supabase (storage)
* Prisma / postgres

---

## ⚙️ Variáveis de Ambiente

As variáveis de ambiente **não são versionadas**.

### Backend (`api/`)

```
.env.development   # ambiente local
.env.prod          # simulação de produção local
.env.example       # referência
```

Sua estrutura é um pouco complexa devido aos serviços consumidos.

```
NODE_ENV=#Nome do ambiente

PORT=#Porta da aplicação
JWT_SECRET=#segredo Jwt para a validação do token jwt

SUPABASE_URL=#URL de conexão com o supabase
SUPABASE_ANON_KEY=#Key de acesso ao supabase

DATABASE_URL=#URL de conexão com o bando de dados (postgres)
```

As variáveis são carregadas via `dotenv` **somente nos scripts**.

Em produção real (Railway, Fly.io, Docker, VPS, etc), as variáveis são injetadas diretamente no ambiente.

### Frontend (`client/`)

```
.env           # arquivo principal, usado durante desenvolvimento
.env.example   # referência
```

Sua estrutura é simples, usando somente a `url` da api.
Todas as variáveis precisam ter o prefixo `VITE_`:

```
VITE_API_URL=#endpoint da api da aplicação
```

Em produção, o frontend consome a API via **URL relativa** (`/api`).

---

## 🧪 Desenvolvimento

Rodar backend (no diretório `api/`):

```bash
npm install
npm run dev
```

Rodar frontend (no diretório `client/`):

```bash
npm install
npm run dev
```

---

## 🏗️ Build

Build local (frontend + backend):

```bash
npm run build
```

Build completo (frontend + backend + deploy prisma):

```bash
npm run deploy
```

---

## ▶️ Produção

Após o build:

```bash
npm run server
```

O Express irá:

* Servir a API em `/api/*`
* Servir o frontend buildado (`client/dist`)

---

## 📦 Scripts Principais

```bash
npm run build       # build frontend + backend
npm run deploy      # build + prisma migrate deploy
npm run server      # inicia servidor em produção
```

---

## 🎯 Objetivo do Projeto

* Servir como **projeto de portfólio**
* Demonstrar organização fullstack
* Separação clara de responsabilidades
* Setup pronto para deploy real
* Setup pronto para implementar CI/CD

---

## 📝 Tarefas em aberto
:warning: Melhorar responsividade
:warning: CI/CD
:heavy_check_mark: Múltiplos usuários
:warning: Gerenciamento de múltiplos usuários
:x: Endpoint público para consumir externamente

---

## :octocat: Autor

| [<img src="https://github.com/wectornanime.png" width=115><br><sub>Wectornanime Felipe</sub>](https://github.com/wectornanime) |
| :---: |

---

## ⚖️ Licença

The [MIT License](./LICENSE) (MIT)

Copyright ©️ 2026 - portfolio-back
