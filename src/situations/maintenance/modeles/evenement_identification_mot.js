import Evenement from 'commun/modeles/evenement';

export default class EvenementIdentificationMot extends Evenement {
  constructor (donnees = {}) {
    super('identificationMot', donnees);
  }
}
