<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut paramétrer une question QCM de Café de la place

> [EVA-227](https://captive-team.atlassian.net/browse/EVA-227)

## Frontend

1. Créer un script pour extraire les données présentes dans `defi.js` et créer un document .xlsx en utilisant la librairie `xlsx` à importer par la suite dans l'admin

Le script ressemblerait à un truc comme ça :

```javascript
  const XLSX = require('xlsx');
  const { configurationNormale } = require('./cafe_de_la_place/data/defi.js');

  function convertirEnJSON(configuration) {
    const donnees = [];

    Object.keys(configuration.questions).forEach((key) => {
      const parcours = configuration.questions[key];

      parcours.series.forEach((serie, serieIndex) => {
        serie.cartes.forEach((carte, carteIndex) => {
          donnees.push({
            "nom_technique": carte.nom_technique,
            "type": carte.type,
            "illustration": carte.illustration,
            "intitule": carte.intitule
            (...)
          });
        });
      });
    });

    return donnees;
  }

  const donnees = convertirEnJSON(configurationNormale);
  const worksheet = XLSX.utils.json_to_sheet(donnees);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Configuration");
  XLSX.writeFile(workbook, 'export_cafe_de_la_place.xlsx');
```

2. Configurer le dépot ressource de café de la place pour qu'il puisse récupérer les questionServeur de la campagne

3. Extraire la fonction `question()` et créer un utils pour qu'elle puisse être utilisée dans les deux dépots ressources

```javascript
  questions () {
    this.questionsServeur?.forEach(question => {
      if (question.choix) {
        question.choix.forEach(choix => {
          choix.bonneReponse = choix.type_choix === 'bon';
          delete choix.type_choix;
        });
      }
      if(question.type === 'clic-dans-image' || question.type === 'glisser-deposer') {
        question.extensionVue = question.type;
        delete question.type;
      }
    });
    return this.questionsServeur;
  }
```

3. Configurer la vue pour qu'elle utilise soit la question configurée dans le front soit la question serveur

```javascript
questionActive() {
  this.question = this.questionServeur ?? this.questionActive;
},
```


## Backend

1. Créer le questionnaire `litteratie_2024` dans une migration de données

2. Pour pouvoir démontrer le ticket avant d'avoir la fonctionnalité d'import d'une liste de questions implémentée, créer les trois premières questions de l'orientation dans une migration de données et les attribuer au questionnaire `litteratie_2024`

## Import des assets

1. Rapatrier le dossier `cafe_de_la_place/assets` du front (audios et images) sur eva-serveur temporairement

2. Créer un script avec une tâche rake pour créer les ressources et les enregistrer avec active storage

- Déterminer le content_type d'une fichier grâce au chemin du fichier (ex: si chemin_du_fichier_suffix == 'mp3' then content_type = "audio/mp3")
- Extraire le nom technique de la question dans le chemin du fichier qui sera par ex: "Lodi3.mp3" pour retrouver la question correspondante

Exemple de script rails :

```ruby
namespace :assets_cafe_de_la_place do
  desc "Attache les assets aux instances de Question correpondantes"
  task attach_to_questions: :environment do
    assets_path = Rails.root.join("app", "assets")
    fichiers_audios = Dir.glob(assets_path.join("*.mp3"))
    fichiers_images = Dir.glob(assets_path.join("*.png"))

    fichiers_audios.each do |mp3_file|
      attach_file_to_question(mp3_file, :audio)
    end

    fichiers_images.each do |png_file|
      attach_file_to_question(png_file, :illustration)
    end

    puts "Création des assets complétée."
  end

  def attach_file_to_question(chemin_du_fichier, attachment_type)
    nom_technique = File.basename(chemin_du_fichier, ".*")
    question = Question.find_by(nom_technique: nom_technique)

    if question
      question.send(attachment_type).attach(
        io: File.open(chemin_du_fichier),
        filename: File.basename(chemin_du_fichier),
        content_type: content_type_for(chemin_du_fichier)
      )
      puts "#{File.basename(chemin_du_fichier)} rattaché à la question ##{question.id} (#{attachment_type})"
    else
      puts "Pas de question trouvée pour le nom_technique '#{nom_technique}'"
    end
  end

  def content_type_for(chemin_du_fichier)
    case File.extname(chemin_du_fichier).downcase
    when ".mp3" then "audio/mpeg"
    when ".png" then "image/png"
    else "application/octet-stream"
    end
  end
end
```
