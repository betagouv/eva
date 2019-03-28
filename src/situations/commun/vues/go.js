import 'commun/styles/go.scss';
import go from 'commun/assets/go.svg';
import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

import { traduction } from 'commun/infra/internationalisation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

export class VueGo {
  constructor (vueConsigne, journal) {
    this.vueConsigne = vueConsigne;
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    this.$message = $("<div class='message'></div>");

    this.$overlay = $('<div id="overlay-go" class="overlay"></div>');

    this.$boutonGo = $('<div id="go" class="invisible bouton-centre bouton-go"></div>');
    this.$boutonGo.append(`<img src='${go}'>`);

    this.$boutonGo.on('click', () => {
      this.$overlay.addClass('invisible');
      this.journal.enregistre(new EvenementDemarrage());
    });

    this.$boutonDemarrerConsigne = $('<div id="demarrer-consigne" class="bouton-centre bouton-lire-consigne-demarrage"></div>');
    this.$boutonDemarrerConsigne.append(`<img src='${play}'>`);

    this.$boutonDemarrerConsigne.on('click', () => {
      this.$boutonDemarrerConsigne.addClass('invisible');
      this.$boutonLectureEnCours.removeClass('invisible');
      this.$message.text('');

      this.vueConsigne.jouerConsigneDemarrage(() => {
        this.$boutonGo.removeClass('invisible');
        this.$message.text(traduction('situation.go'));
      });
    });

    this.$boutonLectureEnCours = $('<div id="lecture-en-cours" class="invisible bouton-centre bouton-lecture-en-cours"></div>');
    this.$boutonLectureEnCours.append(`<img src='${lectureEnCours}'>`);

    this.$message.text(traduction('situation.ecouter-consigne'));
    this.$overlay.append(this.$boutonDemarrerConsigne);
    this.$overlay.append(this.$boutonLectureEnCours);
    this.$overlay.append(this.$boutonGo);
    this.$overlay.append(this.$message);
    $(pointInsertion).append(this.$overlay);
  }
}
