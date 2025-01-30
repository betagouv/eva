# EVA-315: Le jeu utilise automatiquement la zone de prélèvement configurée sur le serveur

[Lien du ticket](https://captive-team.atlassian.net/browse/EVA-315)

J'ai l'impression que dans le fichier: `place_du_marche/commun/vues/components/glisser_deposer.vue`

```Javascript
<glisser-deposer
    :question="question"
    :class="`glisser-deposer--marche glisser-deposer--${statut}`"
    :zones-depot="zonesDepotPositions"
    :aide-depot="!this.question.zone_depot_url"
    :style-container-depart="styleContainerDepart"
    // rajout de cette props
    :disposition="dispositionReponses"
    //
    @ordonne-item="envoiReponsesOrdonnees"
    @deplace-item="envoiReponsesPlacees"
  >

  data() {
    return {
      reponsesPlacees: [],
      nombreReponsesAPlacer: this.question.reponsesNonClassees.length,
      statut: this.question.zone_depot_url ? 'personnalise' : 'default'
    };
  },

  computed: {
    dispositionReponses() {
      return this.nombreReponsesAPlacer > 4 ? 'horizontal' : 'vertical';
    }
  },
};
```

je rajouterai un peu de css (en plus du css pour le placement) pour gérer la verticalité/horizontalité:

.glisser-deposer--vertical .container-depart {
  flex-direction: column;
  align-items: flex-start;
}

.glisser-deposer--horizontal .container-depart {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.glisser-deposer--vertical .zone-depot {
  flex-direction: column;
}

.glisser-deposer--horizontal .zone-depot {
  flex-direction: row;
}
