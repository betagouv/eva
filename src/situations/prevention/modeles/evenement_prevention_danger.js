import Evenement from 'commun/modeles/evenement';

export default class EvenementPreventionDanger extends Evenement {
  constructor (donnees = {}) {
    super('preventionDanger', donnees);
  }
}
