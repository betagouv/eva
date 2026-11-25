# Cycle de synchronisation des événements en fin de partie

Une partie (une situation jouée par le bénéficiaire) ne se termine que lorsque tous ses événements ont été enregistrés sur le serveur. Si la connexion est perdue, le joueur est bloqué sur un écran d'erreur jusqu'à ce que l'envoi réussisse.

## Pendant la partie

Chaque événement est envoyé par `RegistreEvenements#enregistre` (`src/situations/commun/infra/registre_evenements.js`). En cas d'erreur :

- l'envoi est retenté avec un délai croissant (100 ms, doublé à chaque essai, plafonné à 2 s), pendant 60 s au plus ;
- si l'erreur active le mode hors ligne, l'événement est enregistré dans le localStorage et considéré comme réussi ;
- au-delà de 60 s, l'événement est ajouté à `evenementsEnEchec` et sa promesse est rejetée.

Rien n'est affiché au joueur pendant la partie.

## À la fin de la partie

Le cycle est piloté par `VueCadre` (`src/situations/commun/vues/cadre.js`).

```
┌─ FINI : « Enregistrement en cours » ──────────────────────────┐
│                                                               │
│  attente des envois en cours                                  │
│        │                                                      │
│  aucun événement en échec ? ──oui──────────────────────────────────▶ RETOUR_ACCUEIL
│        │                                                      │
│       non                                                     │
│        ▼                                                      │
│  relance automatique ──ok──────────────────────────────────────────▶ RETOUR_ACCUEIL
│        │                                                      │
└────────┼──────────────────────────────────────────────────────┘
       échec
         ▼
ERREUR_ENREGISTREMENT : « La passation est interrompue » ◀──échec──┐
         │ clic « Retester la connexion »                          │
         ▼                                                         │
RELANCE_ENREGISTREMENT : « Test de la connexion en cours » ────────┘
         └──ok─────────────────────────────────────────────────────────▶ RETOUR_ACCUEIL
```

### 1. `FINI`

- Écran : sablier « Enregistrement en cours ».
- L'événement de fin de situation est envoyé.
- `Journal#attendFinEnregistrement` attend tous les envois en cours, puis échoue s'il reste des événements en échec, y compris quand tous les envois en cours ont réussi (événements tombés en échec plus tôt dans la partie).
- Dans ce cas, les événements en échec sont relancés automatiquement (`relanceEnregistrementsEnEchec`, timeout de 10 s), sans afficher d'erreur.
- Succès → `RETOUR_ACCUEIL` ; nouvel échec → `ERREUR_ENREGISTREMENT`.

### 2. `ERREUR_ENREGISTREMENT`

- Écran : `overlay_erreur_enregistrement.vue`, qui explique que la passation est interrompue faute de connexion et propose le bouton « Retester la connexion ».
- Textes : `situation.erreur_enregistrement` dans `src/locales/fr.json`.

### 3. `RELANCE_ENREGISTREMENT`

- Écran : sablier « Test de la connexion en cours ».
- Les événements en échec sont renvoyés avec un timeout de 10 s.
- Succès → `RETOUR_ACCUEIL` ; échec → retour à `ERREUR_ENREGISTREMENT`. Le joueur peut réessayer autant de fois que nécessaire.

### 4. `RETOUR_ACCUEIL`

Écran de fin habituel (`VueTerminer`).

## Protection contre la fermeture

Dans les états `FINI`, `ERREUR_ENREGISTREMENT` et `RELANCE_ENREGISTREMENT`, le navigateur demande confirmation avant de fermer ou recharger la page.

## Limite actuelle

Les événements en échec ne sont conservés qu'en mémoire : un rechargement de la page sur l'écran d'erreur les fait perdre. Leur sauvegarde dans le localStorage est prévue dans une étape suivante.
