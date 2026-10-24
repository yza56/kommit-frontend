# kommit-frontend

Frontend de Kommit : une application React en TypeScript, construite avec Vite, Tailwind et shadcn/ui.

## Arborescence

Mets à jour cette arborescence à chaque fois qu'un fichier ou un dossier est créé, ajouté, modifié, renommé ou supprimé.

```
kommit-frontend/
├── .claude/
│   ├── rules/          # règles de l'équipe
│   └── skills/         # skills du projet
├── .vscode/
├── docs/
│   └── TECH.md         # stack technique
├── src/
│   ├── main.tsx        # point d'entrée
│   ├── App.tsx         # providers et routes
│   ├── index.css
│   ├── assets/         # logo Kommit
│   ├── components/
│   │   ├── ui/         # composants génériques (shadcn + Logo, NavBar, Footer, PageShell, TextField, AuthCard, SubmitButton)
│   │   └── pages/
│   │       ├── HealthCheck/  # boutons de vérification du backend
│   │       ├── Home/         # accueil visiteur et connecté
│   │       ├── Signup/       # inscription
│   │       └── Signin/       # connexion
│   ├── logic/          # logique métier pure (auth, home) et ses tests
│   ├── lib/
│   │   ├── api/        # appels réseau (client, auth, health, queryKeys)
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── data/           # textes des écrans
│   └── types/          # contrat d'API
├── e2e/                # tests Playwright (un par smoke) et leurs helpers
├── testing/            # inventaire des tests et scénarios de smoke par ticket
├── maquettes/          # code brut, assets et FLOW.md des maquettes Figma
├── eslint.config.js
├── .mcp.json           # serveur MCP Figma
├── CLAUDE.md
├── components.json     # config shadcn
├── index.html
├── playwright.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig*.json
└── vite.config.ts
```
