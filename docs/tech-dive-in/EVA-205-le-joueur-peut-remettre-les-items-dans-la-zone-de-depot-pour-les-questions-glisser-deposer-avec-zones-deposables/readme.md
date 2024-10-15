<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le joueur peut remettre les items dans la zone de dépôt pour les questions glisser deposer avec zones déposables

> [EVA-205](https://captive-team.atlassian.net/browse/EVA-205)

## Frontend

1. Ne pas faire disparaître la zone de dépôt de départ si il y a plusieurs zones de dépôt d'arrivée

- Retirer la config dans `envoiReponseMultiple()`
```javascript
this.afficheZoneDepotDepart = this.reponsesNonClassees.length > 0;
```

2. Restreindre les zones de dépôt d'arrivée à la possibilité d'ajouter un seul élement par zone si `this.zoneDepotMultiple` est true

- ajouter une condition dès que l'évènement `@add` est trigger sur <draggable> d'arrivée
````javascript
limiteItem(event, index) {
  if(!this.zoneDepotMultiple) return;
  if (this.zonesDeClassement[index].length > 1) {
    const elementToMove = this.zonesDeClassement[index].find((item, i) => i !== index);
    this.zonesDeClassement[index] = this.zonesDeClassement[index].filter((item, i) => i === index);
    this.reponsesNonClassees = [...this.reponsesNonClassees, elementToMove];
  }
}
```
