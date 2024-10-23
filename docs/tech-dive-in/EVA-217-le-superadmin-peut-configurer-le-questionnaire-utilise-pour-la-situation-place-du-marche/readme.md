<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut configurer le questionnaire utilisé pour la situation Place du marché

> [EVA-217](https://captive-team.atlassian.net/browse/EVA-217)

## Frontend

1. Permettre de jouer avec les variations des questions des questionnaires de numératie

- Modifier la régle de la méthode `questionServeur()` du store place_du_marche qui retrouve la question active

```javascript
  questionServeur(state) {
   const question = state.questions.find(q => q.nom_technique.startsWith(state.questionActive.id));
  },
```
