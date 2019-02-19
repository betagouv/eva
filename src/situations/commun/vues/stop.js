import 'commun/styles/stop.scss';

export class VueStop {
  constructor (pointInsertion, $) {
    this.$pointInsertion = $(pointInsertion);
    this.$boutonStop = $('<a id="stop" href="/" class="bouton-stop"></a>');
  }

  afficher () {
    this.$pointInsertion.append(this.$boutonStop);
  }
}
