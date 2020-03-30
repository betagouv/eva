import Evenement from 'commun/modeles/evenement';

export default class EvenementAffichageQuestionQCM extends Evenement {
  constructor (donnees = {}) {
    super('affichageQuestionQCM', donnees);
  }
}
