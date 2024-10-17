<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# L'admin peut paramétrer l'audio du bouton "Répéter la consigne" de chaque question

> [EVA-208](https://captive-team.atlassian.net/browse/EVA-208)

## Frontend

1. À l'initialisation, récupérer toutes les sous consignes audios

- Modifier la méthode qui extrait les audios et la renommer plus génériquement avec `extraitAudios`

```javascript
function extraitQuestionsReponsesAudios(questions) {
  return questions.reduce((acc, question) => {
    (...)
    // rajouter la ligne suivante
    if (consigne_audio) acc[`${nom_technique}_consigne_audio`] = consigne_audio;

    (...)

    return acc;
  }, {});
}
```

2. Récupérer la consigne de la question en cours dans le dépot ressource de place du marché

- Dans la vue `place_du_marche.vue` écouter le changement de question
```javascript
  watch: {
    questionActive() {
      this.question = this.questionServeur ?? this.questionActive;
      this.$depotRessources.consigneDemarrage(this.question.nom_technique);
    },
  }
```

- Dans le depot ressource `depot_ressources_place_du_marche.js` renvoie la consigne de la question si elle existe sinon la consigneDemarrage par défaut
```javascript
  consigneDemarrage (nomTechnique) {
    if (existeMessageAudio(nomTechnique)) {
      return this.ressource(this.messagesAudios[`${nomTechnique}_consigne_audio`]);
    }
    return this.ressource(sonConsigne)
  }
```

## Backend

1. Permet d'ajouter un audio consigne à une question

- Modifie le modèle Question
```ruby
  has_one :transcription_consigne, lambda {
                                     where(categorie: :consigne)
                                   }, class_name: 'Transcription', dependent: :destroy
```

- Ajoute la categorie `:consigne` au modèle Transcription
```ruby
  enum :categorie, { intitule: 0, modalite_reponse: 1, consigne: 2 }
```

- Ajout du nouveau champ audio à tous les formulaires des différents types de Question dans la partial `inputs_avec_transcriptions_audios`
Pour la création :
```ruby
f.has_many :transcriptions, allow_destroy: false, new_record: false, heading: false do |t|
  t.input :id, as: :hidden
  t.input :audio, as: :file, label: t(".label.consigne_audio"),
                  input_html: { accept: Transcription::AUDIOS_CONTENT_TYPES.join(',') }
  t.input :categorie, as: :hidden, input_html: { value: :consigne }
end
```
Pour l'édition :
```ruby
  if f.object.transcription_consigne.nil?
    f.object.transcriptions.build(categorie: :consigne)
  end
  f.has_many :transcriptions, allow_destroy: false, new_record: false, heading: false do |t|
    if t.object.consigne?
      t.input :id, as: :hidden
      t.input :audio, as: :file, label: t('.label.consigne_audio'),
                      input_html: { accept: Transcription::AUDIOS_CONTENT_TYPES.join(',') }
      t.input :categorie, as: :hidden, input_html: { value: :consigne }
    end
  end
```

- Créer une partial pour rafactorer le formulaire d'édition dans `inputs_avec_transcriptions_audios`

- Permettre d'écouter et de supprimer l'audio de la consigne dans le formulaire d'édition si il y en a un

2. Affiche l'audio de la consigne dans les différentes show

3. Envoi l'audio de la consigne au client

- Met à jour la méthode `includes_association(type)`du QuestionnaireController pour include l'attachment du nouvel audio

- Modifie le json des différents types de question pour rajouté la clé `consigne_audio`

