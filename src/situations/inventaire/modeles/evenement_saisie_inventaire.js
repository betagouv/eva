import Evenement from 'commun/modeles/evenement';

function mapToObj (map) {
  const obj = {};
  for (let [clef, valeur] of map) {
    obj[clef] = valeur;
  }
  return obj;
}

export default class EvenementSaisieInventaire extends Evenement {
  nom () {
    return 'saisieInventaire';
  }

  donnees () {
    return {
      resultat: this._donnees.resultat,
      reponses: mapToObj(this._donnees.reponses)
    };
  }
}
