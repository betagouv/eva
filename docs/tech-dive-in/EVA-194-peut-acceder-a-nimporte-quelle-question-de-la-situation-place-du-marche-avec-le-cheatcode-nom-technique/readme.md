<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Peut accéder à n'importe quelle question de la situation place du marché avec le cheatcode #nomTechnique

> [EVA-194](https://captive-team.atlassian.net/browse/EVA-194)

## Frontend

1. Modifier le store commun pour créer une nouvelle action réutilisable dans toute l'app

```javascript
const actionsCommunes = {
  sauteALaCarteDansUnParcours({ state, getters, commit }, { idCarte, parcours }) {
    commit('demarreParcours', parcours);
    while (!state.parcoursTermine) {
      if (getters.estCarteActive(idCarte)) return;
      commit('carteSuivante');
    }
  },
  sauteALaCarte({ dispatch, getters }, idCarte) {
    for (const parcours of NIVEAUX) {
      dispatch('sauteALaCarteDansUnParcours', { idCarte, parcours });
      if (getters.estCarteActive(idCarte)) return;
    }
  }
};
(...)
actions: {
  ...actionsCommunes,
  ...actions
}
```

2. Modifier les fonctions des stores place du marché et café de la place
```vuejs
this.$store.dispatch('sauteALaCarte', idCarte, parcours);
```

3. Retirer le code inutile des stores place du marché et cafe de la place

4. Refactorer la méthode `sauteALaCarte` pour parcourir tous les niveaux du rattrapage également
