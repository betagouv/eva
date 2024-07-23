<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut consulter le score final du niveau d'un joueur

SPEC EN PLUS : Si mon score final après rattrapage est supérieur à 70% du total, je dois passer au niveau suivant

> [EVA-166](https://captive-team.atlassian.net/browse/EVA-166)

## Context

**Rappel de l'existant**
Le pourcentage de réussite d'un niveau est calculé sur la base d'un set de questions initiales. Si il est > à 70%, l'évalué passes au niveau suivant. Si il est < à 70%, l'évalué passes au rattrapage. À la fin du rattrapage, la situation se termine.

**Comportement attendu**
À la fin d'un niveau avec du rattrapage, on veut pouvoir recalculer le pourcentage de réussite du niveau afin de déterminer si l'évalué termine la situation ou passe au niveau suivant.

**Problèmatique**
L'algo qui détermine le score total d'un niveau avec rattrapage est calculé côté back dans le fichier `/restitution/evacob/score_module.rb`. On a besoin de cette valeur côté front pour recalculer le pourcentage de réussite et rediriger l'évalué en conséquence.

**Solutions envisagées**
1. On garde l'algo côté back et on en duplique une partie de la logique côté front
-> un peu ce qu'on a fait pour café de la place qui calcule le score à mi-chemin du parcours haut mais l'algo de café de la place est moins complexe que celui de place du marché

Exemple de ce qu'on a fait :

```javascript
  enregistreReponse(state, reponse) {
    state.reponses[reponse.question] = reponse;
    (...)
    if(reponse.succes && state.carteActive.score) {
      (...)
      if(state.parcours == PARCOURS_HAUT_1) {
        state.scoreHaut1 += state.carteActive.score;
      }
    }
  },

  carteSuivante(state) {
    this.commit('carteSuivanteParcours');
    if(state.parcoursTermine) {
      (...)
      else if(state.parcours == PARCOURS_HAUT_1) {
        const parcoursSuivant = state.scoreHaut1 <= 5 ? PARCOURS_BAS : PARCOURS_HAUT_2;
        this.commit('demarreParcours', parcoursSuivant);
      }
      (...)
    }
  },
```

2. On fait un appel API au back pour récupérer le score total à la fin de chaque niveau (4 niveaux au total) de la situation place du marche
-> sachant que le résultat n'est pas enregistré en base mais recalculé à chaque fois grâce aux évènements qui sont eux persistés

Exemple de comment on pourrait faire :

## Frontend

- Run la méthode `recalculePourcentageDeReussite` dans le fichier `/place_du_marche/modeles/store.js` à chaque fois qu'un niveau est terminé

```javascript
  carteSuivante(state) {
    this.commit('carteSuivanteParcours');

    if (!state.parcoursTermine) {
      return;
    }

    recalculePourcentageDeReussite(1)

    (...)
  },
```

- Ajouter la méthode `recalculePourcentageDeReussite` pour récupérer le score numératie de la dernière partie de l'évaluation en cours. On utilise actuellement ajax pour faire des appels au serveur.
```javascript
  recalculePourcentageDeReussite(niveau) {
  this.$.ajax({
    type: 'GET',
    url: `${this.urlServeur}/api/evaluations/${id}/score_numeratie_derniere_partie`,
    data: JSON.stringify({ niveau: niveau }),
    contentType: 'application/json; charset=utf-8',
    success: (score) => {
      state.pourcentageDeReussiteGlobal = (score / this.getters.maxScoreNiveauEnCours) * 100
      resolve(score);
    },
    error: (xhr) => {
      reject(xhr);
    }
  });
}
```

## Backend

- Ajouter une nouvelle route
```ruby
  namespace :api do
  resources :evaluations, only: [:create, :update, :show] do
    resource :fin, only: [:create], controller: 'evaluations/fins'
    resource :collections_evenements, only: [:create],
      controller: 'evaluations/collections_evenements'
    ## Add a new route
    resource :score_numeratie_derniere_partie, only: [:show],
    controller: 'evaluations/score_numeratie_derniere_partie'
  end
end
```

- Créer un nouveau controller `evaluations/score_numeratie_derniere_partie.rb`
- Récupérer l'évaluation en cours grâce à son id et la liste des évènements de la dernière partie
- Recalculer le score du niveau et le render
```ruby
module Api
  module Evaluations
    class ScoreNumeratieDernierePartieController < Api::BaseController
      def show
        evenements = Evaluation.find(params[:id]).parties.last.evenements
        @score = Evacob::ScoreModule.new.calcule(evenements, params[:niveau], avec_rattrapage: true)
      end
    end
  end
end
```

- Créer le jbuilder correspondant `/api/evaluations/score_numeratie_derniere_partie/show.jbuilder`
```ruby
json.score @score
```



