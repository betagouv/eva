<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# L'évalué peut afficher une aide pour réussir son exercice

> [EVA-249](https://captive-team.atlassian.net/browse/EVA-249)

## Frontend

1. Permettre l'affichage du bouton d'aide au moment de l'initialisation de la situation dans `situation_place_du_marche.js`
```javascript
const situation = new Situation({ modeEntrainement: false, aideDisponible: true })
```

2. Modifier la props du composant `fenetre_aide.vue` pour recevoir directement le texte d'aide

3. Modifier `commun/vues/aide.js` pour récupérer le texte d'aide depuis le dépot ressource si il existe sinon renvoyer la trad par défaut
```javascript
  this.fenetreAide = new AdapteurFenetreAide(this.situation, this.depotRessources, {
    // Envoyer this.depotRessources.texteAide() si il existe sinon envoyer la trad par défaut
    texteAide: this.depotRessources.texteAide() ?? $traduction(`${this.journal.situation}.texte_aide`),
  });
```

4. Rajouter une fonction `texteAide()` au dépot ressource de place du marche qui récupére dynamiquement le texte d'aide en fonction de la question
```javascript
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, null, sonConsigne);
    this.consigneEnCours = null;
    this.charge([fondSituation]);
    this.texteAide = null;
  }

  texteAide () {
    return this.texteAide;
  }
```

5. Envoyer le texte d'aide dynamiquement depuis la vue `place_du_marche.vue` à chaque fois que la question change
```javascript
questionActive() {
  this.question = this.questionServeur(this.questionActive) ?? this.questionActive;
  this.enregistreConsigneEnCours();
  this.enregistreTexteAideEnCours();
},

enregistreTexteAideEnCours() {
  this.$depotRessources.texteAide = this.question.aide;
}
```

6. Récupérer la situation dans la vue pour pouvoir utiliser `this.situation.aideActivee` et affecter à 0.5 le scoreMax et le score si le succes est true

7. N'afficher le bouton d'aide que sur une partie des questions d'une situation. Rajouter une condition à l'affichage du bouton et la fonction `texteAide()` aux depots ressources des situations "inventaire" et "securite" pour lesquelles une aide est déjà disponible.

Dans `actions.js`
```javascript
afficheBoutons (etat, $) {
  (...)
  if (this.situation.aideDisponible() && this.depotRessource.texteAide()) {
    this.aide.affiche(this.$aide, $);
  }
}
```
