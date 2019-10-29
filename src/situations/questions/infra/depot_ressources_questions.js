import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'questions/assets/consigne_demarrage.wav';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
  }
}
