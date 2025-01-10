# EVA-115 : Le conseiller peut connaitre le temps de passation par exercice

[Lien du ticket](https://captive-team.atlassian.net/browse/EVA-115?atlOrigin=eyJpIjoiZmU1MDU4MmFmZmExNGFmNzk5ZDE0NDg4MGE0MmRlZGYiLCJwIjoiaiJ9)


## Etape 1 : Recuperer l'heure de debut de la question

Dans la fonction `questionServeur` on va pouvoir definir un temps de debut a la question.

```js
questionServeur() {
  ...
  // Ici on stock la donnée au passage de la nouvelle question.
  question.start_time = new Date();
  ...
},
```

## Etape 2 : Recuperer l'heure de fin de la question.

Dans la fonction `enregistreReponse`, on va pouvoir recuperer l'heure de debut et assigner l'heure de fin de la question.

```js
enregistreReponse(state, reponse) {
  ...
    // Ici on ajoute une heure de fin
    reponse.end_time = new Date();
    // Ici on recupere egalement l'heure de debut pour pouvoir la commit
  ...
},
```

Ce qui va nous permettre de recuperer les infos dans le back 

```bash
#<Evenement:0x000000010bb0f020
nom: "reponse",
donnees:
  {"score"=>0, "succes"=>false, "reponse"=>"", "end_time"=>"2025-01-09T16:59:13.107Z", "intitule"=>"Cliquez sur la personne placée entre le jeune homme à la casquette et le monsieur au chapeau.", "question"=>"N1Pse1", "scoreMax"=>0.5, "start_time"=>"2025-01-09T16:58:50.316Z", "metacompetence"=>"situation_dans_lespace"},
date: "2025-01-09 17:59:13.108000000 +0100",
created_at: "2025-01-09 17:59:13.148449000 +0100",
updated_at: "2025-01-09 17:59:13.148449000 +0100",
session_id: "168da29c-318d-4ad0-b679-db6859aa20cf",
id: "457d93d4-762f-4c67-9292-07ca2210afb1",
position: 2,
deleted_at: nil>,
```



