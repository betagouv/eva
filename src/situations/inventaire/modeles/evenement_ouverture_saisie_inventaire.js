import Evenement from 'commun/modeles/evenement';

export default class EvenementOuvertureSaisieInventaire extends Evenement {
  nom () {
    return 'ouvertureSaisieInventaire';
  }
}
