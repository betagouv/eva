import Evenement from 'commun/modeles/evenement';

export default class EvenementReponseEnvoyee extends Evenement {
  constructor (donnees = {}) {
    super('evenement_reponse_envoyee', donnees);
  }
}
