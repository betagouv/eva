import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';
import 'commun/styles/bouton.scss';

export default class VueRejoueConsigne {
  constructor (consigne) {
    this.consigne = consigne;
  }

  affiche (pointInsertion, $) {
    this.$boutonRejoueConsigne = $(`<a id="rejoue-consigne" class="bouton-lire-consigne"><img src="${play}"></a>`);
    this.$boutonRejoueConsigne.on('click', () => this.click($));

    $(pointInsertion).append(this.$boutonRejoueConsigne);
  }

  click ($) {
    this.joueConsigne($);
    this.$boutonRejoueConsigne.addClass('bouton-lecture-en-cours');
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
    this.$boutonRejoueConsigne.removeClass('bouton-lecture-en-cours');
    this.$boutonRejoueConsigne.children().attr('src', play);
  }
}
