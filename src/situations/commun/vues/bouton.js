export default class VueBouton {
  constructor (classe, image, click = () => { }) {
    this.classe = classe;
    this.image = image;
    this.click = click;
  }

  affiche (pointInsertion, $) {
    this.$bouton = $(`<a class="${this.classe}"><img src="${this.image}"></a>`);
    this.$bouton.on('click', this.click);
    $(pointInsertion).append(this.$bouton);
  }

  cache () {
    this.$bouton.remove();
  }
}
