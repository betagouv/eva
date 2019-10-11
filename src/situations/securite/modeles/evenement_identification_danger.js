import Evenement from 'commun/modeles/evenement';

export default class EvenementIdentificationDanger extends Evenement {
  constructor (donnees = {}) {
    super('identificationDanger', donnees);
  }
}
