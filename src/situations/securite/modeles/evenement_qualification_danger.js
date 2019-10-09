import Evenement from 'commun/modeles/evenement';

export default class EvenementQualificationDanger extends Evenement {
  constructor (donnees = {}) {
    super('qualificationDanger', donnees);
  }
}
