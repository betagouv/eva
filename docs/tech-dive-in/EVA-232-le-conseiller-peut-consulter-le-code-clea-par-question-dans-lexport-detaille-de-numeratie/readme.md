<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le conseiller peut consulter le code cléa par question dans l'export détaillé de numératie

> [EVA-232](https://captive-team.atlassian.net/browse/EVA-232)

## Frontend

1. Ajouter un champs `code_clea` aux données questions de numératie avec leurs valeurs

2. Envoyer `this.question.code_clea` au serveur lors de l'envoi de la réponse dans `defi.vue` sous condition de si `this.question.code_clea` est présent

## Backend

1. Modifier l'export et ajouter une entête dans `export_positionnement.rb`

```ruby
def remplis_la_ligne(sheet, ligne, evenement)
  sheet[ligne, 0] = evenement.donnees['question']
  sheet[ligne, 1] = evenement.donnees['intitule']
  sheet[ligne, 2] = evenement.reponse_intitule
  sheet[ligne, 3] = evenement.donnees['score']
  sheet[ligne, 4] = evenement.donnees['scoreMax']
  sheet[ligne, 5] = evenement.donnees['metacompetence']

  ## Ajouter la ligne ci dessous
  sheet[ligne, 6] = evenement.donnees['code_clea']

  sheet
end
```
