import 'commun/styles/go.scss';
import go from 'commun/assets/go.svg';
import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

import { traduction } from 'commun/infra/internationalisation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

export class VueGo {
  constructor (vueConsigne, situation) {
    this.vueConsigne = vueConsigne;

    this.etats = {
      aDemarrer: {
        image: play,
        texte: traduction('situation.ecouter-consigne'),
        classe: 'bouton-lire-consigne-demarrage',
        click: () => {
          this.afficheEtat(this.etats.lectureEnCours);

          this.vueConsigne.jouerConsigneDemarrage(() => {
            this.afficheEtat(this.etats.go);
          });
        }
      },

      lectureEnCours: {
        image: lectureEnCours,
        texte: '',
        classe: 'bouton-lecture-en-cours'
      },

      go: {
        image: go,
        texte: traduction('situation.go'),
        classe: 'bouton-go',
        click: () => {
          this.$overlay.addClass('invisible');
          situation.notifie(new EvenementDemarrage());
        }
      }
    };
  }

  affiche (pointInsertion, $) {
    this.$message = $("<div class='message'></div>");
    this.$bouton = $(`<div class="bouton-centre"></div>`);
    this.$overlay = $('<div id="overlay-go" class="overlay"></div>');

    this.afficheEtat(this.etats.aDemarrer);

    this.$overlay.append(this.$bouton);
    this.$overlay.append(this.$message);

    $(pointInsertion).append(this.$overlay);
    this.afficheEtatGoSiAppuiToucheS();
  }

  afficheEtat (parametres) {
    this.$bouton.attr('class', `bouton-centre ${parametres.classe}`);
    this.$bouton.html(`<img src='${parametres.image}'>`);
    this.$bouton.off('click');
    this.$bouton.on('click', parametres.click);
    this.$message.text(parametres.texte);
  }

  afficheEtatGoSiAppuiToucheS () {
    this.$overlay.attr('tabindex', 0);
    this.$overlay.keydown((event) => {
      if (event.which === 'S'.charCodeAt()) {
        this.afficheEtat(this.etats.go);
      }
    });
    this.$overlay.focus();
  }
}
