import Evenement from 'commun/modeles/evenement';

export default class EvenementOuvertureContenant extends Evenement {
  nom () {
    return 'ouvertureContenant';
  }
}
