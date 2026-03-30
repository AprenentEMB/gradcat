# Desplegament de Strapi — Guia pas a pas

## Estructura del repositori

**Mantén `cms/` dins del mateix repo** (monorepo). És la solució més senzilla per a un projecte d'aquesta mida: un sol repositori, un sol historial de git, fàcil de gestionar.

```
gradcat/
├── src/              ← Astro (frontend)
├── cms/              ← Strapi (CMS)
├── .env
└── ...
```

---

## Stack de desplegament (gratuït)

| Servei | Què fa | Preu |
|--------|--------|------|
| **Vercel** | Frontend Astro | Gratuït |
| **Render** | Strapi (Node.js) | Gratuït (amb cold starts ~1 min) |
| **Neon.tech** | PostgreSQL | Gratuït permanent |

> **Per què no Strapi Cloud?** El free trial dura 30 dies, després costa ~29$/mes.
> **Per què no Railway?** Té $5/mes de crèdit gratuït, suficient però limitat. Render + Neon és més sostenible.
> **Cold start a Render:** El pla gratuït atura el servidor després de 15 min d'inactivitat. La primera petició triga ~1 minut a arrencar. Per a un CMS d'ús esporàdic és acceptable.

---

## Pas 1 — Configurar PostgreSQL a Neon.tech

1. Crea un compte a [neon.tech](https://neon.tech)
2. Crea un nou projecte → dona-li un nom (ex: `graduacions-cms`)
3. Copia la **Connection string** que té aquest format:
   ```
   postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Guarda-la, la necessitaràs als passos següents.

---

## Pas 2 — Preparar Strapi per a producció

### 2.1 Instal·lar el client PostgreSQL

```bash
cd cms
npm install pg
```

### 2.2 Crear el fitxer de configuració de base de dades

Crea `cms/config/database.ts` amb aquest contingut:

```ts
export default ({ env }: { env: (key: string, fallback?: string) => string }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 5 },
  },
});
```

> En local, Strapi continuarà usant SQLite (sense `DATABASE_URL` al `.env` local).
> A producció, Render injectarà `DATABASE_URL` i usarà PostgreSQL.

### 2.3 Variables d'entorn de producció

Crea `cms/.env.example` per documentar les variables necessàries:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=clau1,clau2,clau3,clau4
API_TOKEN_SALT=salt_aleatori
ADMIN_JWT_SECRET=secret_aleatori
TRANSFER_TOKEN_SALT=salt_aleatori
JWT_SECRET=secret_aleatori
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
```

Per generar valors aleatoris segurs:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2.4 Assegurar-se que `cms/.gitignore` ignora els fitxers sensibles

Comprova que `cms/.gitignore` conté:
```
.env
*.db
.tmp/
dist/
build/
```

---

## Pas 3 — Desplegar Strapi a Render

1. Ves a [render.com](https://render.com) → Sign up amb GitHub
2. **New → Web Service** → connecta el teu repositori
3. Configura el servei:

| Camp | Valor |
|------|-------|
| **Name** | `graduacions-cms` |
| **Root Directory** | `cms` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |
| **Instance Type** | Free |

4. A **Environment Variables** afegeix totes les variables de `cms/.env.example` amb els teus valors reals. La més important:
   ```
   DATABASE_URL = (la connection string de Neon)
   NODE_ENV = production
   ```

5. Clica **Create Web Service** → espera que faci el primer deploy (~5 min)

6. Render et donarà una URL com: `https://graduacions-cms.onrender.com`

---

## Pas 4 — Actualitzar el frontend Astro

### En local (`.env`)
```env
PUBLIC_STRAPI_URL=https://graduacions-cms.onrender.com
```

### A Vercel
**Project Settings → Environment Variables** → afegeix:
```
PUBLIC_STRAPI_URL = https://graduacions-cms.onrender.com
STRAPI_TOKEN     = (el token de l'API de Strapi en producció)
```

> Recorda: el token de l'API de producció de Strapi el has de generar un cop Strapi estigui desplegat: **Settings → API Tokens → Create new token**.

---

## Pas 5 — Crear el perfil de creador de contingut

### 5.1 Crear un rol "Editor"

A Strapi admin (`https://graduacions-cms.onrender.com/admin`):

1. **Settings → Administration Panel → Roles → Add new role**
2. Nom: `Editor`
3. Activa els permisos **només** per als content types que ha de gestionar:
   - `Article` → `create`, `read`, `update`, `delete`, `publish`
   - **No** li donis accés a Settings, Roles, API Tokens, etc.
4. Guarda.

### 5.2 Convidar l'usuari editor

1. **Settings → Administration Panel → Users → Invite new user**
2. Omple el correu de l'editor
3. Selecciona el rol `Editor`
4. Clica **Send invitation**

L'editor rebrà un correu per establir la seva contrasenya i accedir directament a **Content Manager** per crear i editar articles.

---

## Resum del flux final

```
Editor           →  Strapi Admin (Render)  →  PostgreSQL (Neon)
                         ↓
               API REST /api/articles
                         ↓
              Astro build (Vercel) → web pública
```

> **Nota sobre SSG:** Com que el blog usa `prerender = true`, cal fer un nou deploy a Vercel cada cop que es publiqui un article nou. Pots automatitzar-ho amb un **Deploy Hook** de Vercel: Settings → Git → Deploy Hooks → crea un hook i afegeix-lo com a webhook a Strapi (Settings → Webhooks → `Entry.publish`).
