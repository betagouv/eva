import 'commun/styles/cadre.scss';

export class VueCadre {
  constructor (vueSituation) {
    this.vueSituation = vueSituation;
  }

  affiche (pointInsertion, $) {
    const $cadre = $('<div class="cadre"></div>');
    $(pointInsertion).append($cadre);
    this.vueSituation.affiche('.cadre', $);
  }
}
