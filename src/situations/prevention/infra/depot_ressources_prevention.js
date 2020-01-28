import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'commun/assets/consigne_blanche.wav';
import fondSituation from '../assets/fond-situation.jpg';
import ok from '../assets/ok.svg';
import danger from '../assets/danger.svg';
import urgence from '../assets/urgence.svg';

const preventionsContext = require.context('prevention/assets', false, /prevention.+\.png$/);

export default class DepotRessourcesPrevention extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage);
    this.charge([fondSituation, ok, danger, urgence]);
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
    return this.ressource(fondSituation);
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
