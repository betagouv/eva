import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'livraison/assets/consigne_demarrage_livraison.mp3';
import sonConsigneTransition from 'livraison/assets/consigne_transition_livraison.mp3';

import { illustrationsQuestions } from '../data/illustrations';

export default class DepotRessourcesLivraison extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, {}, {}, null, sonConsigne, sonConsigneTransition);
    this.charge([...new Set(Object.values(illustrationsQuestions))]);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }

  illustrationQuestion (question) {
    if (question.nom_technique && illustrationsQuestions[question.nom_technique]) {
      return this.ressource(illustrationsQuestions[question.nom_technique]);
    } else {
      throw new Error(`La question ${question.id} avec le nom technique "${question.nom_technique}" ne possède pas d'illustration`);
    }
  }
}
