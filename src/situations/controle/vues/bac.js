import 'controle/styles/bac.scss';

import { PIECE_CONFORME } from 'controle/modeles/piece';
import { CHANGEMENT_ETAT_SURVOLE } from 'controle/modeles/bac';

export class VueBac {
  constructor (bac) {
    this.bac = bac;
  }

  affiche (pointInsertion, $) {
    function creeElementBac (categorie, { x, y }, { largeur, hauteur }, { largeurParent, hauteurParent }) {
      const classeCategorie = categorie === PIECE_CONFORME ? 'pieces-conformes' : 'pieces-defectueuses';
      const $element = $(`<div class="bac ${classeCategorie}"></div>`);
      $element.css('left', x * largeurParent / 100);
      $element.css('top', y * hauteurParent / 100);
      $element.width(largeur * largeurParent / 100).height(hauteur * hauteurParent / 100);
      return $element;
    }

    const $elementParent = $(pointInsertion);
    const dimensionsElementParent = {
      largeurParent: $elementParent.width(),
      hauteurParent: $elementParent.height()
    };
    this.$bac = creeElementBac(
      this.bac.categorie(),
      this.bac.position(),
      this.bac.dimensions(),
      dimensionsElementParent
    );

    $elementParent.append(this.$bac);
    this.bac.on(CHANGEMENT_ETAT_SURVOLE, (etat) => this.changeEtatSurvole(etat));
  }

  changeEtatSurvole (etatSurvole) {
    this.$bac.toggleClass('survole', etatSurvole);
  }
}
