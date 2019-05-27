import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'tri/assets/consigne_demarrage.wav';
import fondSituation from 'tri/assets/fond-situation.jpg';
import sonBonBac from 'tri/assets/bon-bac.wav';
import sonMauvaisBac from 'tri/assets/mauvais-bac.wav';

const bonbons = require.context('tri/assets', false, /bonbon[0-9]+\.png$/);

export default class DepotRessourcesTri extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.charge([fondSituation, sonBonBac, sonMauvaisBac]);
    this.chargeContexte(bonbons);
    this.bonbons = bonbons.keys().reduce((memo, fichier) => {
      memo[fichier.match(/(bonbon[0-9]+).png/)[1]] = bonbons(fichier);
      return memo;
    }, {});
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  piece (type) {
    return this.bonbons[type];
  }

  sonBonBac () {
    return this.ressource(sonBonBac);
  }

  sonMauvaisBac () {
    return this.ressource(sonMauvaisBac);
  }
}
