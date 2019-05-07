export default class VueBouton {
  constructor (classe, image, click = () => { }) {
    this.classe = classe;
    this.image = image;
    this.click = click;
  }

  ajouteUneEtiquette (etiquette, aGauche = false) {
    this.etiquette = etiquette;
    this.aGauche = aGauche;
  }

  affiche (pointInsertion, $) {
    const $bouton = $(`<a class="${this.classe}"><img src="${this.image}"></a>`);
    $bouton.on('click', this.click);
    this.$element = $bouton;
    if (this.etiquette) {
      const $boutonEtEtiquette = $('<div class="bouton-et-etiquette"></div>');
      if (this.aGauche) {
        $boutonEtEtiquette.addClass('gauche');
      }
      $boutonEtEtiquette.append($bouton);
      $boutonEtEtiquette.append(`<span>${this.etiquette}</span>`);
      this.$element = $boutonEtEtiquette;
    }
    $(pointInsertion).append(this.$element);
  }

  cache () {
    this.$element.remove();
  }
}
