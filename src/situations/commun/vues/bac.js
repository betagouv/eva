import 'commun/styles/bac.scss';

import { CHANGEMENT_ETAT_SURVOLE } from 'commun/modeles/bac';

export default class VueBac {
  constructor (bac) {
    this.bac = bac;
  }

  affiche (pointInsertion, $) {
    function creeElementBac ({ x, y }, { largeur, hauteur }) {
      const $element = $('<div class="bac"></div>');
      $element.css({
        left: `${x}%`,
        top: `${y}%`,
        width: `${largeur}%`,
        height: `${hauteur}%`
      });
      return $element;
    }

    this.$bac = creeElementBac(
      this.bac.position(),
      this.bac.dimensions()
    );

    $(pointInsertion).append(this.$bac);
    this.bac.on(CHANGEMENT_ETAT_SURVOLE, (etat) => this.changeEtatSurvole(etat));
  }

  changeEtatSurvole (etatSurvole) {
    this.$bac.toggleClass('survole', etatSurvole);
  }
}
