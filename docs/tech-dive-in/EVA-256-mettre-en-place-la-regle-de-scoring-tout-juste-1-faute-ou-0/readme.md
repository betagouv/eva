<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Mettre en place la règle de scoring "tout juste, 1 faute ou 0"

> [EVA-256](https://captive-team.atlassian.net/browse/EVA-256)

## Frontend

1. Si il y a plus d'éléments à placer que de zones de dépots, appliquer le nouveau barème de calcul de points dans `glisser_deposer.vue`
```javascript
 if(this.nombreReponsesAPlacer > this.zoneDeDepots) {
  this.calculeScoreUneFauteAutorisee()
 } else {
    this.calculeScore()
 }
```

```javascript
calculeScoreUneFauteAutorisee() {
  const mauvaisesReponses = this.reponsesPlacees.filter(reponse => !reponse.succes).length;
  // si éléments tous bien placés, score = scoreMax
  if (mauvaisesReponses === 0) {
    return this.question.score;
  // si seulement 1 élément mal placé, score = scoreMax / 2
  } else if (mauvaisesReponses === 1) {
    return this.question.score / 2;
  }
  // sinon score = 0
  return 0;
}
```
