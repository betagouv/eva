import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import accidentCarine from 'questions/assets/accident_carine.png';
import palette from 'questions/assets/palette.png';

import sonConsigne from 'controle/assets/consigne_demarrage.wav';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.charge([accidentCarine, palette]);
  }

  accidentCarine () {
    return this.ressource(accidentCarine);
  }

  palette () {
    return this.ressource(palette);
  }
}
