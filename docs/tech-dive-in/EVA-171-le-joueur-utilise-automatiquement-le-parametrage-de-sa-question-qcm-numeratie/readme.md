<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le joueur utilise automatiquement le paramétrage de sa question QCM numératie

> [EVA-171](https://captive-team.atlassian.net/browse/EVA-171)

## Backend

- Créer quelques questions numératie côté back pour tester la feature dans une migration
- Créer le questionnaire Numératie pour la situation place du marché avec les questions

## Frontend

- Récupérer les questions du back à l'initialisation de la configuration de place du marché

```javascript
import RegistreCampagne from 'commun/infra/registre_campagne';

  configureActe (state, configuration) {
    // Ajout de la ligne suivante
    state.questions = new RegistreCampagne().questions('place_du_marche')

    state.configuration = configuration;
    this.commit('demarreParcours', NIVEAU1);
  },
```

- Surveille la question configuration en cours et render la question du back correspondante
```javascript
<template>
  <transition-fade>
    <defi
      v-if="questionEnCours.id"
      :key="questionEnCours.id"
      :question="questionEnCours"
      @reponse="reponse"
    >
      <pagination
        :indexQuestion="indexCarte"
        :nombreQuestions="nombreCartes"
      />
    </defi>
  </transition-fade>
</template>

  data () {
    return {
      questionEnCours: {}
    };
  },
  computed: {
    ...mapState(['indexCarte', 'carteActive', 'termine', 'questions']),
    ...mapGetters(['nombreCartes']),
  },
  watch: {
    carteActive () {
      this.questionEnCours = this.questions.filter(q => q.nom_technique === this.carteActive.nom_technique)
    }
  },
```

- Retirer les données des questions numératie du front qui sont envoyés par le back à savoir `intitule`, `modalite_reponse`, `type`, `choix`, `metacompetence`
- Retirer les données des choix `intitule`, `bonneReponse`

## Use case pour tester

- Modifier une question côté back, relancer le jeu et voir si la modification est appliquée

## Bonus Refacto

- Utiliser une itération plutôt qu'une réassignation pour réinitialiser les rattrapages
```javascript
export function reinitialiseRattrapagesAPasser(state) {
  Object.keys(state.pourcentageDeReussiteCompetence).forEach(competence => {
    state.pourcentageDeReussiteCompetence[competence] = 100;
  });
};
```
