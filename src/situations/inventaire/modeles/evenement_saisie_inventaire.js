import Evenement from 'commun/modeles/evenement';

export default class EvenementSaisieInventaire extends Evenement {
  constructor (donnees = {}) {
    super('saisieInventaire', donnees);
  }

  donnees () {
    const reponses = {};
    this._donnees.reponses.forEach((reponse, produit) => {
      reponses[produit] = { ...reponse, reussite: this._donnees.resultatValidation.get(produit) };
    });
    return {
      reussite: this._donnees.reussite,
      reponses
    };
  }
}
