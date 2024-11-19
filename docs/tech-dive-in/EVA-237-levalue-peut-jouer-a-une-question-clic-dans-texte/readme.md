<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# L'évalué peut jouer à une question clic dans texte

> [EVA-237](https://captive-team.atlassian.net/browse/EVA-237)

## Frontend

1. Récupérer les markdown du serveur avec la clé `texte_sur_illustration` d'une questionServeur

2. Modifier le composant `clicSurMots.vue` pour retourner `this.question.texte_sur_illustration` si il existe sinon continuer avec les données front de `this.texteCliquable`

```javascript
  htmlTexteCliquable() {
    return marked(this.texteCliquable);
  },
```

3. Aligner les données du front et du back pour avoir une modélisation de données identique :
```javascript
// celle-ci à une réponse avec un nom_technique
const alrd14 = {
  extensionVue: 'clic-sur-mots',
  zone_cliquable: 'liste-chansons',
  score: 1,
  retranscription_audio: 'Sélectionnez le mot Soupçons',
  reponse: {
    texte: 'Soupçon',
    nom_technique: 'ALrd/soupcon',
  }
};

// celle-ci est une question qcm mais n'est pas cliquable même si elle utilise le composant clic sur mots
const ACrd6 = {
  extensionVue: 'clic-sur-mots',
  zone_cliquable: 'article article--disque',
  type: 'qcm',
  choix: [
    {
      id: 'membreDuGroupe',
      nom_technique: 'ACrd/membre_du_groupe',
      bonneReponse: false,
      intitule: 'Un membre du groupe Rick Duxol et Mori Morino'
    },
    {
      id: 'producteur',
      nom_technique: 'ACrd/producteur',
      bonneReponse: false,
      intitule: 'Un producteur de disque'
    },
    {
      id: 'critiqueMusical',
      nom_technique: 'ACrd/critique_musical',
      bonneReponse: true,
      intitule: 'Un critique musical'
    }
  ]
};

// celle-ci à un attribut `bonne_reponse`
const HCvf2 = {
  extensionVue: 'clic-sur-mots',
  reponses_multiples: true,
  zone_cliquable: 'article article--villes-fleuries',
  illustration: rubriqueEnvironnement,
  score: 1,
  intitule: "Choisissez la phrase ou les phrases qui montrent que la commune permet à la nature de reprendre ses droits dans les espaces verts.",
  reponse: {
    bonne_reponse: [
      "Cette technique, qui permet à la nature de se réapproprier l'espace en ville",
      "« Dans le centre, où l'on tond moins",
      "par exemple, nous travaillons avec des graminées, qui sont fauchées deux fois par an seulement »"
    ],
  }
};

// celle-ci n'a pas de reponse.nom_technique
const HCvf1 = {
  extensionVue: 'clic-sur-mots',
  zone_cliquable: 'article article--villes-fleuries',
  reponse: {
    texte: 'les membres du jury du concours régional des villes fleuries',
  }
};
```

```ruby
## pour l'instant le json renvoyé par le back ne correspond pas
json['bonnesReponses'] = bonnes_reponses_json
```

3. Récupérer  `zone_cliquable` du paramètrage front pour définir le design

4. Lancer le script js pour récupérer les données de front des questions 'clic-sur-mots' avec dans l'ordre les headers et valeurs suivantes :
libelle nom_technique illustration intitule_ecrit intitule_audio consigne_ecrit consigne_audio description texte_sur_illustration

## Backend

1. Modifier la tâche rake qui permet d'attacher les assets des questions clicDansTexte
