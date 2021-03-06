export default class VueBouton {
  constructor (classe, image, click = () => { }) {
    this.classe = classe;
    this.image = image;
    this.click = click;
  }

  ajouteUneEtiquette (etiquette) {
    this.etiquette = etiquette;
  }

  affiche (pointInsertion, $) {
    const $bouton = $(`<a class="${this.classe}"><img src="${this.image}"></a>`);
    if (this.etiquette) {
      const $boutonEtEtiquette = $('<div class="bouton-et-etiquette"></div>');
      $boutonEtEtiquette.append($bouton);
      $boutonEtEtiquette.append(`<span>${this.etiquette}</span>`);
      $boutonEtEtiquette.on('click', this.click);
      this.$element = $boutonEtEtiquette;
    } else {
      $bouton.on('click', this.click);
      this.$element = $bouton;
    }
    $(pointInsertion).append(this.$element);
  }

  cache () {
    if (this.$element) {
      this.$element.remove();
    }
  }
}
