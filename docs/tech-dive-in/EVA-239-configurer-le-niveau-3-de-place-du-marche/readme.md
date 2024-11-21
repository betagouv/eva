<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Configurer le niveau 3 de Place du marché

> [EVA-239](https://captive-team.atlassian.net/browse/EVA-239)

## Frontend

1. Implémenter les questions du niveau 3 avec les paramètres : id, nom_technique, metacompetence et score dans les fichiers `numeratie.js` et `rattrapage.js`

2. Ajouter les nouvelles compétences dans `store.js` pour calculer le pourcentage de réussite de chaque compétence et permettre la passsation du rattrapage quand nécessaire
```javascript
// Modifier la const
export const numeratieMetriques = {
  'N1Pse': null,
  'N1Prn': 'N1Rrn',
  'N1Pde': 'N1Rde',
  'N1Pes': 'N1Res',
  'N1Pon': 'N1Ron',
  'N1Poa': 'N1Roa',
  'N1Pos': 'N1Ros',
  'N1Pvn': null
};
// Modifier le state
  pourcentageDeReussiteCompetence: {
    'N1Prn': 100,
    'N1Pde': 100,
    'N1Pes': 100,
    'N1Pon': 100,
    'N1Poa': 100,
    'N1Pos': 100,
    'N2Plp': 100,
    'N2Ppe': 100,
    'N2Psu': 100,
    'N2Pom': 100,
    'N2Pon': 100,
    'N2Pod': 100,
    'N2Put': 100,
    'N2Prh': 100,
    'N2Ptg': 100,
    'N2Ppl': 100,
  },
```

## Backend

1. Créer les questions sur le serveur dans une migration de données avec la bonne interaction. Les ajouter aux questionnaires numeratie_2024.

2. Associer chaque metacompétence au bon code_clea dans le fichier `evenement.rb` en enrichissant la constante `CODECLEA_METACOMPETENCE`

