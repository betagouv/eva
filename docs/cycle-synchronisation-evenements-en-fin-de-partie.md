# Cycle de synchronisation des événements en fin de partie

Une partie (une situation jouée par le bénéficiaire) ne se termine que lorsque tous ses événements ont été enregistrés sur le serveur. Si la connexion est perdue, le joueur est bloqué sur un écran d'erreur jusqu'à ce que l'envoi réussisse. C'est aussi le cas lors d'un abandon.

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
  │ « Retester la connexion »      │           │ « Retester la connexion »           │
  ▼                                │           ▼                                     │
RELANCE_ENREGISTREMENT ────────────┘         RELANCE_ENREGISTREMENT_ABANDON ─────────┘
  └──ok──▶ RETOUR_ACCUEIL (écran de fin)       └──ok──▶ accueil
```

| État                             | Écran (sablier)             | Si l'envoi réussit | Si l'envoi échoue               |
|----------------------------------|-----------------------------|--------------------|---------------------------------|
| `FINI`                           | « Enregistrement en cours » | `RETOUR_ACCUEIL`   | `ERREUR_ENREGISTREMENT`         |
| `RELANCE_ENREGISTREMENT`         | « Enregistrement en cours » | `RETOUR_ACCUEIL`   | `ERREUR_ENREGISTREMENT`         |
| `STOPPEE`                        | « Enregistrement en cours » | retour à l'accueil | `ERREUR_ENREGISTREMENT_ABANDON` |
| `RELANCE_ENREGISTREMENT_ABANDON` | « Enregistrement en cours » | retour à l'accueil | `ERREUR_ENREGISTREMENT_ABANDON` |

Les écrans d'erreur utilisent `overlay_erreur_enregistrement.vue` (textes : `situation.erreur_enregistrement` dans `src/locales/fr.json`) :

Les deux états d'erreur (`ERREUR_ENREGISTREMENT` et `ERREUR_ENREGISTREMENT_ABANDON`) n'ont qu'un bouton, « Retester la connexion » : le joueur doit rétablir la connexion pour continuer.

Dans les états `RELANCE_*`, le sablier « Enregistrement en cours » reste affiché au moins 1,5 s, même si l'envoi échoue tout de suite : sinon le joueur ne voit pas que son clic a été pris en compte.

`RETOUR_ACCUEIL` affiche l'écran de fin habituel (`VueTerminer`).

## Protection contre la fermeture

Dans les états `FINI`, `ERREUR_ENREGISTREMENT`, `RELANCE_ENREGISTREMENT` et `ERREUR_ENREGISTREMENT_ABANDON`, le navigateur demande confirmation avant de fermer ou recharger la page. `STOPPEE` et `RELANCE_ENREGISTREMENT_ABANDON` ne sont pas protégés : en cas de succès, ils redirigent vers l'accueil, et la protection demanderait alors une confirmation à tort.

Si la page est rechargée malgré tout, la partie recommence et les événements de la partie interrompue sont envoyés par le `Synchronisateur` au prochain affichage de l'accueil.
