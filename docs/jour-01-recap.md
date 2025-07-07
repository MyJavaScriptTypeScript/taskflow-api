# Formation Hono - Jour 1 : Introduction et Écosystème

**Date** : Formation Module 1, Jour 1  
**Version TaskFlow** : v0.1 - Serveur Hello World  
**Objectif accompli** : ✅ API REST basique avec Hono

## 📚 Concepts Appris

### 1. API REST
- Architecture utilisant HTTP comme protocole
- URLs pour identifier les ressources
- Verbes HTTP pour les actions (GET, POST, PUT, DELETE)
- JSON pour l'échange de données

### 2. Pourquoi Hono
- **Performance** : 3x plus rapide qu'Express (~150k req/s)
- **Multi-runtime** : Node.js, Bun, Cloudflare Workers, Deno
- **TypeScript natif** : Inférence de types automatique
- **Zero dependencies** : Bundle size minimal (18KB)

### 3. Architecture Multi-Runtime
- Un seul code qui fonctionne partout
- Web Standard APIs (Request/Response)
- Parfait pour l'edge computing

## 🛠️ Setup Réalisé

### Installation
```bash
mkdir taskflow-api
cd taskflow-api
npm init -y
npm install hono
npm install -D @types/node tsx typescript
npx tsc --init
```

### Configuration TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

### Scripts NPM (`package.json`)
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "tsx src/index.ts"
  }
}
```

## 💻 Code TaskFlow v0.1

### `src/index.ts`
```typescript
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// Route racine
app.get('/', (c) => {
  return c.text('Bienvenue sur TaskFlow API!')
})

// Route avec paramètre
app.get('/hello/:name?', (c) => {
  const name = c.req.param('name') || 'World'
  return c.text(`Hello ${name}!`)
})

// Route JSON
app.get('/api/info', (c) => {
  return c.json({
    name: 'TaskFlow API',
    version: '0.1',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

const port = 3000
console.log(`🚀 TaskFlow API démarre sur http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
```

## 🔑 Points Clés Appris

1. **Context Object (c)** : Objet central contenant request et response
2. **Méthodes de réponse** : `c.text()`, `c.json()`
3. **Paramètres d'URL** : `c.req.param()`
4. **Structure Hono** : Instance → Routes → Serveur

## 🎯 Exercice Complété

Ajout de la route `/api/version` :
```typescript
app.get('/api/version', (c) => {
  return c.json({
    major: 0,
    minor: 1,
    patch: 0
  })
})
```

## 📊 Tests Effectués

```bash
# Test route racine
curl http://localhost:3000
# → Bienvenue sur TaskFlow API!

# Test route paramètre
curl http://localhost:3000/hello/Jean
# → Hello Jean!

# Test route JSON
curl http://localhost:3000/api/info
# → {"name":"TaskFlow API","version":"0.1","status":"running",...}

# Test exercice
curl http://localhost:3000/api/version
# → {"major":0,"minor":1,"patch":0}
```

## 🌟 Extra : Histoire des Frameworks JS

- **Express (2010)** : Pioneer, ~50k req/s
- **Koa (2013)** : Async/await, ~70k req/s
- **Fastify (2016)** : Schema validation, ~80k req/s
- **Hono (2022)** : Edge-first, ~150k req/s

### Évolution vers l'Edge
- Exécution proche des utilisateurs (200+ datacenters)
- Latence <50ms globalement
- Cold start <10ms
- Web Standard APIs

## 📁 Structure du Projet

```
taskflow-api/
├── node_modules/
├── src/
│   └── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── docs/
    └── jour-01-recap.md (ce fichier)
```

## 🚀 Prochaine Étape

**Jour 2** : Routes et Méthodes HTTP
- Implémenter les verbes HTTP (GET, POST, PUT, DELETE)
- Créer les routes CRUD pour `/tasks`
- Organisation modulaire des routes
- Approfondir le Context object

## 💡 Notes Personnelles

- Hono est vraiment simple à démarrer
- La syntaxe est moderne et intuitive
- Le support TypeScript est excellent
- La performance promise est impressionnante
- L'approche multi-runtime ouvre des possibilités

---

**Commit message suggestion** :
```
feat: TaskFlow v0.1 - Initial Hono server setup

- Setup TypeScript project with Hono
- Created basic Hello World server
- Added routes: /, /hello/:name, /api/info, /api/version
- Configured development environment
- Documentation: Day 1 introduction and ecosystem

First milestone of 40-day Hono training achieved ✅
```