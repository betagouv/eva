# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Common Development Commands

### Development Workflow
```bash
# Install dependencies and start development server
npm install && npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter (can auto-fix with --fix)
npm run lint
npm run lint -- --fix

# Start local server only
npm run start

# Development build with watch mode
npm run build-dev
```

### Required Environment Variables
Set `URL_API=http://localhost:3000/pro` for local development (typically via .env file or export).

## Architecture Overview

### Situation-Based Modular Design
EVA is an educational assessment platform built around "situations" - workplace simulation scenarios. Each situation is a self-contained module with its own:

- **Entry point**: `src/app/situation_{name}.js`
- **Assets**: `src/situations/{name}/assets/` (images, audio, etc.)
- **Data**: `src/situations/{name}/data/` (scenario configurations)
- **Infrastructure**: `src/situations/{name}/infra/` (resource loaders)
- **Models**: `src/situations/{name}/modeles/` (business logic, events, stores)
- **Styles**: `src/situations/{name}/styles/` (SCSS)
- **Views**: `src/situations/{name}/vues/` (Vue components)

### Current Situations
`controle`, `inventaire`, `tri`, `questions`, `securite`, `prevention`, `maintenance`, `livraison`, `objets_trouves`, `bienvenue`, `plan_de_la_ville`, `cafe_de_la_place`, `place_du_marche`

### Shared Infrastructure (`src/situations/commun/`)
- **Models**: Base `Situation` class, event system, piece/bac mechanics
- **Infrastructure**: `DepotRessources` (asset loading), registries, internationalization
- **Views**: Reusable Vue components, adapters
- **Styles**: Common SCSS variables, mixins, typography

## Key Development Patterns

### Resource Loading Pattern
Use `DepotRessources` class for async asset loading:
```javascript
const depot = new DepotRessources();
// Supports: .mp3, .png, .jpg, .svg, .mp4, .json
```

### Event-Driven Architecture
Situations extend EventEmitter with standardized events:
- `CHARGEMENT`, `DEMARRE`, `FINI`, `CHANGEMENT_ETAT`
- Custom game events: `PIECE_BIEN_PLACEE`, `PIECE_MAL_PLACEE`, etc.

### State Management
- Each situation can have Vuex store extending common base
- State flow: Vue store ↔ business models
- Consistent state lifecycle: `CHARGEMENT` → `ATTENTE_DEMARRAGE` → `DEMARRE` → `FINI`

### Testing Conventions
- **Jest + Vue Test Utils**: Component and unit testing
- **Mocks**: Comprehensive mocks in `tests/situations/*/aides/`
- **Structure**: Mirror source structure in `tests/`
- **Audio/Assets**: Always mock external dependencies

### Internationalization
- All text in `src/locales/fr.json`
- Access via `$traduction` global property
- Use i18next interpolation and pluralization

### French Typography
- Use a narrow non-breaking space (U+202F) before `:` `!` `?` `;`, after `«` and before `»`, in `src/locales/fr.json` and in any French text written in Vue templates. Do not use a regular space, U+00A0 or `&nbsp;`.
- `tests/locales/typographie.test.js` checks `fr.json` (it runs with `npm test`).

## Webpack Configuration Notes

- **Code Splitting**: Each situation gets its own bundle
- **Aliases**: `commun`, `accueil`, `src`, and all situation names
- **Asset Handling**: Images, audio, fonts bundled as resources
- **Environment Variables**: Injected via `EnvironmentPlugin`

## Adding New Situations

1. Add situation name to `webpack.config.js` situations array
2. Create directory structure: `src/situations/{name}/`
3. Create entry point: `src/app/situation_{name}.js`
4. Follow established patterns for assets, data, models, views
5. Extend base `Situation` class and implement required lifecycle methods

## Technical Stack

- **Vue 3** with Vuex 4 for state management
- **GSAP** for animations
- **Web Audio API** for sound (use `JoueurAudioBuffer`)
- **SCSS** for styling with modular architecture
- **Jest** for testing with jsdom environment
