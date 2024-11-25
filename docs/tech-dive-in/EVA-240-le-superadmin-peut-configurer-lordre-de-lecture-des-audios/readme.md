<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut configurer l'ordre de lecture des audios

> [EVA-240](https://captive-team.atlassian.net/browse/EVA-240)

## Frontend

1. Modifier la logique du démarrage des audios du composant `question_entete.vue`

4 use cases :
- démarre `boutonLectureQuestionAudio` en premier puis `boutonLectureTexteEntete`
-> si `this.question.intitule` n'existe pas, `this.afficheLectureQuestionAudio` est true et `this.question.demarreIntituleEnPremier` est true

- démarre `boutonLectureTexteEntete` en premier puis `boutonLectureQuestionAudio`
-> si `this.question.intitule` n'existe pas, `this.afficheLectureQuestionAudio` est true et `this.question.demarreIntituleEnPremier` est false

- démarre `boutonLectureTexteEntete` tout seul car pas de `boutonLectureQuestionAudio`
-> si `this.question.intitule` existe, `this.afficheLectureQuestionAudio` est false et `this.question.demarreIntituleEnPremier` est true

- démarre `boutonLectureQuestionAudio` tout seul car pas `boutonLectureTexteEntete`
-> si `this.question.intitule` n'existe pas, `this.afficheLectureQuestionAudio` est true et `afficheLectureTexteEntete` est false

```javascript
  demarreSon () {
    if (!this.question.intitule && this.afficheLectureQuestionAudio) {
      this.demarreSonBouton('boutonLectureQuestionAudio', () => {
        this.demarreSonBouton('boutonLectureTexteEntete');
      });
    } else {
      this.demarreSonBouton('boutonLectureTexteEntete');
    }
  }
```

2. Mettre la computed `demarreIntituleEnPremier` à true par défaut pour ne pas alterer les données de café de la place

## Backend

1. Ajouter au modèle Transcription un champs de type boolean `demarrage_audio`

2. Ajouter à tous les formulaires de question l'input
```ruby
f.input :demarrage_audio, as: :boolean, label: 'Lire cet audio en premier'
```

3. Gérer en javascript le fait que l'input de l'intitulé se décoche si celui de la consigne est checked et inversement

4. Checked par défaut l'input de l'intitulé

5. Rajouter la clé json `demarreIntituleEnPremier` dans les modèles de chaque type de question

## Rattrapage des données

1. Rattraper les données des questions pour lesquelles la consigne doit être lu en premier.

