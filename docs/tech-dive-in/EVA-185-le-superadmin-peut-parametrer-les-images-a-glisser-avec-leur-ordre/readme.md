<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut paramétrer les images à glisser (avec leur ordre)

> [EVA-185](https://captive-team.atlassian.net/browse/EVA-185)

## Frontend

1. Configurer une question de type `glisser-deposer` côté client avec les données nécessaires en attendant que le back soit fait :
- reponse : illustration, position
- nom technique : `N1Pon1`
- type : `action`
- extensionVue: `glisser-deposer`

2. Initialiser un nouveau composant `glisser_deposer.vue` à `Defi.vue`

3. Créer le nouveau composant générique `glisser_deposer.vue` en utilisant la librairie `vuedraggable` et extraire la logique du composant `puzzle.vue`
```javascript
<template>
  <div class="puzzle-container">
    <draggable
      class="puzzle-gauche"
      :list="zonesDeClassement"
      item-key="id"
      group="puzzle"
      draggable=".puzzle-item"
      @end="envoiReponse"
      :sort="true"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="puzzle-item"
        >
          <poignee-puzzle/>
          <span>{{element.contenu}}</span>
        </div>
      </template>
      <template #footer>
        <div v-if="affichePuzzleDroite"
            class="zone-de-depot">
            {{ $traduction('cafe_de_la_place.puzzle.texte_zone_depot') }}
        </div>
      </template>
    </draggable>
    <draggable
      v-if="affichePuzzleDroite"
      class="puzzle-droite"
      :list="reponsesNonClassees"
      item-key="id"
      group="puzzle"
      @end="envoiReponse"
      :sort="false"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="puzzle-item"
        >
          <poignee-puzzle/>
          <span>{{element.contenu}}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>
```

4. Créer un composant spécifique `/place_du_marche/vues/components/puzzle.vue` qui utilise `/commun/vues/components/glisser_deposer.vue`

5. Refactorer `/cafe_de_la_place/vues/components/puzzle.vue` pour utiliser le composant commun `/commun/vues/components/glisser_deposer.vue`
