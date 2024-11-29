<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# L'évalué peut saisir sans erreur un prix avec des décimales

> [EVA-246](https://captive-team.atlassian.net/browse/EVA-246)

## Résultat attendus

- On limite le nbre de caractère à saisir à 4
- Le joueur voit le champs saisie pré rempli à 0,00
- il peut saisir uniquement des chiffres, des virgules et des points
- Le champs se remplie de droite à gauche
Si l’utilisateur écrit :
01,50 → 1,50
1.50 → 1,50
1.5 → 1,50
1 → 1,00

## Backend

1. Ajouter une valeur au champs `type_saisie` qui est `prix_avec_centimes`

2. Au moment d'envoyer l'objet json au front, si QuestionSaisie est de type `prix_avec_centimes`, parser la valeur de `intitule` pour envoyer et correspondre au format interprété par le front.
Par exemple si l'admin à enregistrer la valeur `8.9` retourner `8,90`.

## Frontend

1. Rajouter une computed dans `champ_saisie.vue`
```javascript
  estPrixAvecCentimes () {
    return this.question.sous_type === 'prix_avec_centimes';
  },
```

2. si `estPrixAvecCentimes()` est true :
- Limiter `maxLength()` à 4
- ajouter l'attribut `inputmode="decimal"` pour les tablettes
- attribuer la valeur `0,00` au placeholder
- Attribuer la valeur entré par l'utilisateur à `event.target.value` à chaque fois que l'utilisateur déclenche l'évènement `@input="emetReponse($event)`
```javascript
  emetReponse (event) {
    event.target.value = event.target.value.trim().replace(/[^0-9.,]/g, '');
    (...)
  }
```

- Formate la valeur rentrée par l'utilisateur une fois qu'il clique en dehors de l'input en utilisant l'évènement `@blur="formatePrix($event)"`
L'algo ressemblerait à un truc dans le genre :
```javascript
formatePrix(event) {
  // on remplace les . par des ,
  const input = event.target.value.trim().replace('.', ',');

  // on récupére les entiers et les décimaux
  let [intPart, decimalPart] = input.split(',');

  // On rajoute ou enlève les 0 si besoin
  intPart = intPart.replace(/^0+/, '') || '0';
  if (decimalPart !== undefined) {
    decimalPart = decimalPart.padEnd(2, '0').slice(0, 2);
  } else {
    decimalPart = '00';
  }

  // on reconstruit le prix au format attendu
  event.target.value = `${intPart},${decimalPart}`;
},
```

3. Modifier la `reponseSaisie` et envoyer l'emit une fois le prix formaté

4. Ajouter par défaut le suffix `€`
```javascript
<span v-if="estPrixAvecCentimes" class="suffix">
  €
</span>
<span v-else-if="question.suffix_reponse" class="suffix">
  {{ question.suffix_reponse }}
</span>
```
