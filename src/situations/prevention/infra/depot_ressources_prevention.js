import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'prevention/assets/consigne_demarrage_prevention.mp3';
import sonConsigneTransition from 'prevention/assets/consigne_transition_prevention.mp3';
import fondSituation from '../assets/fond-situation.jpg';
import fondSituationEntrainement from '../assets/fond-situation-entrainement.jpg';
import ok from '../assets/ok.svg';
import danger from '../assets/danger.svg';
import urgence from '../assets/urgence.svg';

const preventionsContext = require.context('../assets', false, /prevention.+\.png$/);

const messagesVideos = {};

export default class DepotRessourcesPrevention extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, {}, fondSituation, sonConsigneDemarrage, sonConsigneTransition);
    this.charge([fondSituationEntrainement, fondSituation, ok, danger, urgence]);
    this.chargeContexte(preventionsContext);
    this.preventions = preventionsContext.keys().reduce((memo, fichier) => {
      memo[fichier.match(/(prevention-.+)\.png/)[1]] = preventionsContext(fichier);
      return memo;
    }, {});
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituationEntrainement);
  }

  ok () {
    return this.ressource(ok);
  }

  danger () {
    return this.ressource(danger);
  }

  urgence () {
    return this.ressource(urgence);
  }

  prevention (prevention) {
    return this.preventions[prevention];
  }
}
