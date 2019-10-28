import VueBouton from './bouton';
import 'commun/styles/action_overlay.scss';
import 'commun/styles/bouton.scss';

export default class VueActionOverlay {
  constructor (image, message, classe, classeBouton, dimensionOverlay = '') {
    this.image = image;
    this.message = message;
    this.classe = classe;
    this.classeBouton = classeBouton;
    this.dimensionOverlay = dimensionOverlay;
    this.vueBouton = new VueBouton(this.classe, this.image, () => this.click());
  }

  affiche (pointInsertion, $) {
    this.$message = $(`<div class='overlay-action-message'>${this.message}</div>`);
    const $conteneurBouton = $(`<div class=${this.classeBouton}></div>`);

    this.vueBouton.affiche($conteneurBouton, $);

    this.$overlay = $(`<div class="overlay ${this.dimensionOverlay} overlay-action"></div>`);

    this.$overlay.append($conteneurBouton);
    this.$overlay.append(this.$message);
    $(pointInsertion).append(this.$overlay);
  }

  cache ($) {
    this.$overlay.remove();
  }

  click () {}
}
