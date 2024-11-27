<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# L'évalué peut valider un exercice glisser-déposer dès son premier déplacement

> [EVA-248](https://captive-team.atlassian.net/browse/EVA-248)

## 🎯 Résultat à atteindre

Dans les questions glisser-déposer, le bouton “Valider” s’active dès lors que le joueur a déplacé 1 item:

- Le joueur arrive sur la question glisser déposer
- Le joueur ne peut pas cliquer sur “Valider”
- Le joueur déplace 1 item
- Le joueur peut cliquer sur “Valider” pour valider sa réponse et passer à la question suivante

### Étapes:

1. Dans le composant glisser_deposer.vue, il faut modifier la méthode envoiReponsesPlacees pour émettre la réponse dès qu'un élément est déposé :
qqch comme:
```javascript
  envoiReponsesPlacees(reponse) {
    this.ajouteNouvelleReponse(reponse);
    
    // On émet la réponse dès qu'il y a au moins un élément placé
    if (this.reponsesPlacees.length > 0) {
      const score = this.calculeScore();
      const reponseFinale = {
        score,
        scoreMax: this.question.score,
        succes: score === this.question.score,
        reponse: this.reponsesPlacees.map(reponse => reponse.reponse)
      };
      this.$emit('reponse', reponseFinale);
    }
  }
```

2. De même pour la méthode envoiReponsesOrdonnees :
qqch comme:
```javascript
  envoiReponsesOrdonnees(reponse) {
    this.reponsesPlacees = reponse.reponse;
    // On émet la réponse dès qu'il y a au moins un élément placé
    if (this.reponsesPlacees.length > 0) {
      const score = reponse.succes ? this.question.score : 0;
      const reponseFinale = {
        score,
        scoreMax: this.question.score,
        succes: reponse.succes,
        reponse: this.reponsesPlacees
      };
      this.$emit('reponse', reponseFinale);
    }
  }
```

3. On peut supprimer la méthode `sontToutesPlacees` qui n'est donc plus utilisée
4. Peut-être refacto `this.reponsesPlacees.length > 0` en une methode `AuMoinsUneReponsePlacee` ?