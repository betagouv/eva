<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le joueur utilise automatiquement le paramétrage de sa question Clic dans image

> [EVA-181](https://captive-team.atlassian.net/browse/EVA-181)

## Backend

- Ajouter le svg `zone_cliquable` à l'objet json envoyé au client

## Frontend

1. Paramétrer la question `N1Pse4` côté client pour être de type 'clic-dans-image` et permettre de recevoir le paramétrage du serveur.

2. Rajouter la propriété `extensionVue: 'clic-dans-image` aux questions de type clic_dans_image et créer un nouveau composant `ClicDansImage.vue`

3. Changer la valeur de la propriété type en `action` pour garder la logique du composant défi
```javascript
  composantContenu () {
    switch(this.question.type) {
    case 'action':
    case 'sous-consigne':
      return undefined;
    case 'qcm':
      return this.question.type_qcm === 'jauge' ? Jauge : Qcm;
    case 'saisie':
      return this.question.sous_type == 'redaction' ? RedactionNote : ChampSaisie;
    default:
      return this.question.type;
    }
  },
```

4. Créer un container `.avant-plan` dans la vue `ClicDansImage` avec les mêmes dimensions que l'élément `.scene` et y intégrer question.zone_cliquable en position absolute
```scss
.avant-plan {
  width: 1008px;
  height: 566px;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
```

5. Ajouter une animation au hover et au click sur un des éléments enfant du svg
-> Reprendre le style de .contenant dans `situation.scss` pour le hover
-> Reprendre le style de graphique-barre--selectionnee dans `graphique.scss`

6. Ajouter un addEventListener au click sur un des éléments enfant du svg.
```javascript
if(element.classList.contains('.bonne-reponse')) {
  this.bonneReponse = true
}
```

7. Envoyer un emit avec la réponse lorsqu'on clique sur valider

