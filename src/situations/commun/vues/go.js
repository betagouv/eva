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
    this.$ = $;
    this.$message = $("<div class='message'></div>");
    this.$overlay = $('<div id="overlay-go" class="overlay"></div>');

    this.$boutonGo = this.$bouton({
      id: 'go', classe: 'bouton-go', image: go, visibilite: 'invisible',
      click: () => {
        this.$overlay.addClass('invisible');
        this.journal.enregistre(new EvenementDemarrage());
      }
    });

    this.$boutonLectureEnCours = this.$bouton({
      id: 'lecture-en-cours', classe: 'bouton-lecture-en-cours',
      image: lectureEnCours, visibilite: 'invisible'
    });

    this.$boutonDemarrerConsigne = this.$bouton({
      id: 'demarrer-consigne', classe: 'bouton-lire-consigne-demarrage',
      image: play, visibilite: 'visible',
      click: () => {
        this.$boutonDemarrerConsigne.addClass('invisible');
        this.$boutonLectureEnCours.removeClass('invisible');
        this.$message.text('');

        this.vueConsigne.jouerConsigneDemarrage(() => {
          this.$boutonGo.removeClass('invisible');
          this.$message.text(traduction('situation.go'));
        });
      }
    });

    this.$message.text(traduction('situation.ecouter-consigne'));
    this.$overlay.append(this.$boutonDemarrerConsigne);
    this.$overlay.append(this.$boutonLectureEnCours);
    this.$overlay.append(this.$boutonGo);
    this.$overlay.append(this.$message);
    $(pointInsertion).append(this.$overlay);
  }

  $bouton (parametres) {
    const $ = this.$;
    const $bouton = $(`<div id="${parametres.id}" class="${parametres.visibilite} bouton-centre ${parametres.classe}"></div>`);
    $bouton.append(`<img src='${parametres.image}'>`);
    $bouton.on('click', parametres.click);
    return $bouton;
  }
}
