<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut paramétrer une question saisie pour litteratie

> [EVA-229](https://captive-team.atlassian.net/browse/EVA-229)

## Backend

1. Rajouter un champs `texte_a_trou` de type `:text` au modèle Question dans une migration qui sera un block html qu'on rempliera dans le formulaire de QuestionSaisie

2. Rajouter le champs `texte_a_trou` dans le formulaire et la show de QuestionSaisie

3. Rajouter `texte_a_trou` dans le json envoyé au front dans le modèle `question_saisie.rb`

## Frontend

1. Intercepter le paramètre `texte_a_trou` d'une question serveur

2. Récupérer la variation de design paramétré dans le front pour chaque question serveur grâce au paramètre `extensionVue`
```javascript
  {
    nom_technique: 'aplc_4',
    type: 'saisie',
    extensionVue: 'email-HPfb-a-trous'
  },
  {
    nom_technique: 'hpar_2',
    type: 'saisie',
    extensionVue: 'liste-courses-a-trous'
  }
```
-> on ne permet donc pas à l'admin de changer de template de design, cela nécessite une intervention en dev

3. Adapter le template `liste_courses_a_trous.vue` pour retourner `question.texte_a_trou` si le paramètre est dans la question. Sinon utiliser le template en dur (car il faut que ça continue de fonctionner si la question ne vient pas du serveur).

```javascript
<template>
  <div v-if="question.texte_a_trou" :v-html="question.texte_a_trou" class="liste-de-courses">
  <div v-else class="liste-de-courses">
    <h1 class="liste-de-courses__titre">Courses pour la <trou-a-completer idQuestion="APlc1"/></h1>
    <ul class="liste-de-courses__liste">
      <li>2 <trou-a-completer idQuestion="APlc2"/> en <trou-a-completer idQuestion="APlc3"/></li>
      <li>1 pot de <trou-a-completer idQuestion="APlc4"/></li>
      <li>Du <trou-a-completer idQuestion="APlc5"/></li>
      <li>2 kilos de <trou-a-completer idQuestion="APlc6"/> de <trou-a-completer idQuestion="APlc7"/></li>
      <li>4 <trou-a-completer idQuestion="APlc8"/></li>
      <li>Des <trou-a-completer idQuestion="APlc9"/> qui <trou-a-completer idQuestion="APlc10"/> du goût</li>
      <li>2 <trou-a-completer idQuestion="APlc11"/> d'<trou-a-completer idQuestion="APlc12"/></li>
      <li>2 <trou-a-completer idQuestion="APlc13"/></li>
      <li>1 <trou-a-completer idQuestion="APlc14"/></li>
      <li>1 <trou-a-completer idQuestion="APlc15"/></li>
      <li>1 <trou-a-completer idQuestion="APlc16"/> de <trou-a-completer idQuestion="APlc17"/></li>
      <li>1 <trou-a-completer idQuestion="APlc18"/> qui n'<trou-a-completer idQuestion="APlc19"/> pas</li>
      <li>1 solution <trou-a-completer idQuestion="APlc20"/></li>
    </ul>
  </div>
</template>
```

4. Parser `question.texte_a_trou` avant de le retourner pour injecter le composant `TrouACompleter` à la place des balises html `trou-a-completer`

5. Adapter le template de `email_HPfb_a_trous.vue` pour retourner `question.texte_a_trou` si le paramètre est dans la question. Sinon utiliser le template en dur.

```javascript
  <div class="zone-scroll">
    <div v-if="question.texte_a_trou" :v-html="question.texte_a_trou" class="email-fleurs-bibelots">
    <div v-else class="email-fleurs-bibelots">
      <email-partie-1 v-if="question.numero_page == 1"/>
      <email-partie-2 v-else />
    </div>
  </div>
```

6. Parser `question.texte_a_trou` avant de le retourner pour injecter le composant `TrouACompleter` à la place des balises html `trou-a-completer`

## Extraction des données

1. Lancer le script js pour récupérer un xls des questions saisies avec dans l'ordre les headers suivants et leurs valeurs :libelle, :nom_technique, :illustration, :intitule_ecrit, :intitule_audio, :consigne_ecrit, :consigne_audio, :description, :suffix_reponse, :reponse_placeholder, :type_saisie, :bonne_reponse_intitule, :bonne_reponse_nom_technique

2. Rajouter un header :texte_a_trou à la fin et modifier l'export/import des questions pour rajouter ce champs
```ruby
HEADERS_SAISIE = %i[suffix_reponse reponse_placeholder type_saisie bonne_reponse_intitule
                    bonne_reponse_nom_technique texte_a_trou].freeze

## Export
def remplis_champs_saisie
  @sheet[@ligne, 8] = @question.suffix_reponse
  @sheet[@ligne, 9] = @question.reponse_placeholder
  @sheet[@ligne, 10] = @question.type_saisie
  return unless @question.bonne_reponse

  @sheet[@ligne, 11] = @question.bonne_reponse.intitule
  @sheet[@ligne, 12] = @question.bonne_reponse.nom_technique
  @sheet[@ligne, 13] = @question.texte_a_trou
end

## Import
def update_saisie
  @question.update!(suffix_reponse: @row[8], reponse_placeholder: @row[9],
                    type_saisie: @row[10], texte_a_trou: row[13])
  cree_reponse_generique(@row[11], @row[12], 'bon')

end
```

3. Importer la liste des questions dans l'admin

4. Modifier la tâche rake pour attacher les assets des questions saisies

5. Ajouter les questions au questionnaire littaratie_2024

## Calcul des scores

On a une règle différente sur les scores des questions saisies café de la place. À la différence des autres questions où une question ramène tant de point si la réponse est bonne, 0 si elle est fausse. Ici chaque réponse ramène un certain nombre de point.
Ex: APlc9 a comme réponses possibles avec respectivement le nombre de points que ça rapporte:

['épice', 'epice', 'èpice', 'êpice', 'ëpice', 'épices', 'epices', 'èpices', 'êpices', 'ëpices'],
[1, 0.75, 0.75, 0.75, 0.75, 1.25, 1, 1, 1, 1]

On a pris le partie pour l'instant de ne pas rendre administrable les scores.

1. Permettre à une QuestionSaisie d'avoir plusieurs bonnes réponses.
```ruby
## à changer en has_many
has_one :bonne_reponse, class_name: 'Choix', foreign_key: :question_id, dependent: :destroy
```

2. Modifier le formulaire et la show d'une QuestionSaisie pour accepter plusieurs bonnes réponses

3. Modifier les valeurs acceptées par le champs :type_choix pour ajouter 'acceptable' et 'bonus'

4. Modifer les données des questions saisies du front. Ajouter les paramètres à chaque question:
- score
- score_acceptable
- score_bonus
- Retirer le champs :scores
- modifier l'objet :reponse pour affilier à chaque réponse le type_reponse 'bon', 'mauvais', 'acceptable', ou 'bonus'

5. Modifier le calcul du score dans le composant `champ_saisie.vue``
```javascript
emetReponse (valeur) {
  const reponse = valeur.trim();
  let succes;
  let score;
  let scoreMax;
  if(this.question.reponse) {
    // parcourir le tableau this.question.reponses et trouver où reponse.intitule === reponseSaisie.toLowerCase()
    // retourner reponse.type_reponse et retouner le score attendue pour le type de réponse
    const indexReponse = this.question.reponse.textes.indexOf(reponse.toLowerCase());
    succes = indexReponse != -1;
    const scores = this.question.reponse.scores;
    if (scores) {
      score = scores[indexReponse] ?? 0;
      scoreMax = scores.reduce((max, score) => {
        if (!max) return score;
        return (score > max) ? score : max;
      });
    } else if (this.question.score) {
      scoreMax = this.question.score;
    }
  }
  this.$emit('reponse', { reponse, succes, score, scoreMax });
},
```

6. Modifier l'objet json de QuestionSaisie envoyé au front pour les question saisie de place du marché pour correspondre à la nouvelle modalisation de données.
