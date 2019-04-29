import 'commun/styles/action_overlay.scss';

export default class VueActionOverlay {
  constructor (image, message, classe) {
    this.image = image;
    this.message = message;
    this.classe = classe;
  }

  affiche (pointInsertion, $) {
    this.$message = $(`<div class='message'>${this.message}</div>`);
    const $conteneurBouton = $('<div class="bouton-centre"></div>');
    this.$bouton = $(`<div class="${this.classe}"><img src="${this.image}"></div>`);
    $conteneurBouton.append(this.$bouton);
    this.$overlay = $('<div class="overlay"></div>');

    this.$overlay.append($conteneurBouton);
    this.$overlay.append(this.$message);

    this.$bouton.on('click', () => this.click());

    $(pointInsertion).append(this.$overlay);
  }

  cache ($) {
    this.$overlay.remove();
  }

  click () {}
}
