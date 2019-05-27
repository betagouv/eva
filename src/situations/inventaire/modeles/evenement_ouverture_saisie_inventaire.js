import Evenement from 'commun/modeles/evenement';

export default class EvenementOuvertureSaisieInventaire extends Evenement {
  constructor (donnees = {}) {
    super('ouvertureSaisieInventaire', donnees);
  }
}
