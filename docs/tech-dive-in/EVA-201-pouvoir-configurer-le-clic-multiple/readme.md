<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Pouvoir configurer le clic multiple

> [EVA-201](https://captive-team.atlassian.net/browse/EVA-201)

## Frontend

1. Créer une nouvelle propriété computed `nombreDeBonnesReponses()` qui retourne le nombre de fois que la classe `bonne-reponse` est présente dans le svg

2. Créer une nouvelle data `nombreDeReponsesSelectionnees` par défaut à 0

3. Modifier la méthode `selectionneReponse()`pour gérer la selection multiple
```javascript
if(!selectionMultiple) {
  this.deselectionneReponse();
  this.selectionneNouvelleReponse(event.target);
} else {
  if (this.nombreDeReponsesSelectionnees < this.nombreDeBonnesReponses) {
    this.selectionneNouvelleReponse(event.target)
  } else if (event.target.classList.contains('reponse--selectionnee')) {
    this.deselectionneReponse();
  }
}
```

4. Modifier la méthode `deselectionneReponse()` pour gérer le cas où on veut désélectionner une réponse donnée
```javascript
deselectionneReponse(selection) {
  this.nombreDeReponsesSelectionnees -= 1
  if (selection) {
    selection.classList.remove('reponse--selectionnee')
  } else {
    const reponseDejaSelectionnee = document.querySelector('.reponse--selectionnee');
    if (reponseDejaSelectionnee) {
      reponseDejaSelectionnee.classList.remove('reponse--selectionnee');
    }
  }
},
```

5. Modifier la méthode `selectionneNouvelleReponse()` pour ajouter `this.nombreDeReponsesSelectionnees += 1` à chaque fois qu'elle est déclenchée

6. Modifier `envoiReponse` pour recalculer le score si le clic est multiple

## Backend

1. Ajouter un champ à la show d'une question clic dans image `clic_multiple` qui affiche dans un input de type boolean la valeur de question.clic_multiple?

2. Créer la fonction `clic_multiple?` dans le modèle QuestionClicDansImage
```ruby
def clic_multiple?
  return unless zone_cliquable.attached?

  doc = Nokogiri::XML(zone_cliquable.attachable, nil, 'UTF-8')
  elements_cliquables = doc.css('.bonne-reponse')

  return unless elements_cliquables.empty?

  elements_cliquables.size > 1
end
```
