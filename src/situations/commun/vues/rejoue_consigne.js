import 'commun/styles/rejoue_consigne.scss';
import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueRejoueConsigne {
  constructor (consigne) {
    this.consigne = consigne;
  }

  affiche (pointInsertion, $) {
    this.$boutonRejoueConsigne = $(`<a id="rejoue-consigne" class="bouton-relecture-consigne"><img src="${play}"></a>`);
    this.$boutonRejoueConsigne.on('click', () => this.click($));

    $(pointInsertion).append(this.$boutonRejoueConsigne);
  }

  click ($) {
    this.joueConsigne($);
    this.$boutonRejoueConsigne.children().attr('src', lectureEnCours);
  }

  joueConsigne ($) {
    $(this.consigne).on('ended', this.lectureTermine.bind(this));
    return Promise.resolve(this.consigne.play())
      .catch(e => {
        this.lectureTermine();
      });
  }

  lectureTermine () {
    this.$boutonRejoueConsigne.children().attr('src', play);
  }
}
