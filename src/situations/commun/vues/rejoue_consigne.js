import 'commun/styles/rejoue_consigne.scss';
import play from 'commun/assets/play.svg';

export default class VueRejoueConsigne {
  constructor (pointInsertion, $) {
    this.$pointInsertion = $(pointInsertion);
    this.$boutonRejoueConsigne = $(`<a id="rejoue-consigne" class="bouton-relecture-consigne"><img src="${play}"></a>`);
  }

  affiche () {
    this.$pointInsertion.append(this.$boutonRejoueConsigne);
  }
}
