# Cycle de synchronisation des événements en fin de partie

Une partie (une situation jouée par le bénéficiaire) ne se termine que lorsque tous ses événements ont été enregistrés sur le serveur. Si la connexion est perdue, le joueur est bloqué sur un écran d'erreur jusqu'à ce que l'envoi réussisse. En cas d'abandon, il peut aussi abandonner sans attendre.

## Pendant la partie

Aucun événement n'est envoyé au serveur. `RegistreEvenements#enregistre` (`src/situations/commun/infra/registre_evenements.js`) ajoute chaque événement dans le localStorage, sous la clé `evenements_{idClient}`. Si le localStorage est plein, l'événement est gardé en mémoire (`evenementsEnMemoire`).

## Envoi des événements

`RegistreEvenements#envoieEvenements` envoie en une seule requête les événements du localStorage puis ceux gardés en mémoire :

```
POST /api/evaluations/:id/collections_evenements
{ "evenements": [...], "synchrone": true }
```

- Avec `synchrone`, le serveur enregistre les événements avant de répondre. Ainsi, `POST /api/evaluations/:id/fin` voit la dernière partie quand il calcule les compétences fortes.
- La requête est abandonnée au bout de 15 s et traitée comme un échec, pour ne pas laisser le joueur indéfiniment sur le sablier.
- Succès : le localStorage et la mémoire sont vidés.
- Échec : les événements restent stockés et la promesse est rejetée.
- Mode hors ligne sans réseau, ou évaluation sans `id` serveur : rien n'est vidé et la promesse est résolue. Le `Synchronisateur` enverra les événements du localStorage au retour du réseau, sans `synchrone` (le serveur passe alors par un job). Les événements gardés en mémoire sont perdus dans ce cas.

Les événements en double sont ignorés par le serveur (`position` unique par `session_id`) : un renvoi après une réponse perdue est sans risque.

## Cycle des états

Le cycle est piloté par `VueCadre` (`src/situations/commun/vues/cadre.js`). Les états sont définis dans `src/situations/commun/modeles/situation.js`.

```
Fin de partie                                Abandon (bouton stop)

FINI                                         STOPPEE
  │ enregistre finSituation, envoie            │ enregistre abandon, envoie
  ├──ok──▶ RETOUR_ACCUEIL (écran de fin)       ├──ok──▶ accueil
  └─échec                                      └─échec
     ▼                                            ▼
ERREUR_ENREGISTREMENT ◀─────échec──┐         ERREUR_ENREGISTREMENT_ABANDON ◀──échec──┐
  │ « Retester la connexion »      │           │ « Retester »                        │
  ▼                                │           ├─ « Abandonner » ──▶ accueil         │
RELANCE_ENREGISTREMENT ────────────┘           ▼                                     │
  └──ok──▶ RETOUR_ACCUEIL (écran de fin)     RELANCE_ENREGISTREMENT_ABANDON ─────────┘
                                               └──ok──▶ accueil
```

| État                             | Écran (sablier)             | Si l'envoi réussit | Si l'envoi échoue               |
|----------------------------------|-----------------------------|--------------------|---------------------------------|
| `FINI`                           | « Enregistrement en cours » | `RETOUR_ACCUEIL`   | `ERREUR_ENREGISTREMENT`         |
| `RELANCE_ENREGISTREMENT`         | « Enregistrement en cours » | `RETOUR_ACCUEIL`   | `ERREUR_ENREGISTREMENT`         |
| `STOPPEE`                        | « Enregistrement en cours » | retour à l'accueil | `ERREUR_ENREGISTREMENT_ABANDON` |
| `RELANCE_ENREGISTREMENT_ABANDON` | « Enregistrement en cours » | retour à l'accueil | `ERREUR_ENREGISTREMENT_ABANDON` |

Les écrans d'erreur utilisent `overlay_erreur_enregistrement.vue` (textes : `situation.erreur_enregistrement` dans `src/locales/fr.json`) :

- `ERREUR_ENREGISTREMENT` : bouton « Retester la connexion » ;
- `ERREUR_ENREGISTREMENT_ABANDON` : boutons « Retester la connexion » et « Abandonner ». « Abandonner » retourne à l'accueil ; les événements restent dans le localStorage pour le `Synchronisateur`.

Dans les états `RELANCE_*`, le sablier « Enregistrement en cours » reste affiché au moins 1,5 s, même si l'envoi échoue tout de suite : sinon le joueur ne voit pas que son clic a été pris en compte.

`RETOUR_ACCUEIL` affiche l'écran de fin habituel (`VueTerminer`).

## Protection contre la fermeture

Dans les états `FINI`, `ERREUR_ENREGISTREMENT` et `RELANCE_ENREGISTREMENT`, le navigateur demande confirmation avant de fermer ou recharger la page. Les états de l'abandon ne sont pas protégés : quitter la page ne perd rien, les événements étant dans le localStorage.

Si la page est rechargée malgré tout, la partie recommence et les événements de la partie interrompue sont envoyés par le `Synchronisateur` au prochain affichage de l'accueil.
