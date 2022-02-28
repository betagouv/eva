import { traduction } from 'commun/infra/internationalisation';
import VueBouton from './bouton';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';

import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';
import 'commun/styles/boutons.scss';

export default class VueRejoueConsigne {
  constructor (situation, joueurConsigne, journal) {
    this.situation = situation;
    this.joueurConsigne = joueurConsigne;
    this.journal = journal;
    this.vueBoutonLire = new VueBouton('bouton-lire-consigne', play, () => this.litConsigne(this.$));
    this.vueBoutonLire.ajouteUneEtiquette(traduction('situation.repeter_consigne'));
    this.vueBoutonLectureEnCours = new VueBouton('bouton-lecture-en-cours', lectureEnCours);
  }

  affiche (pointInsertion, $) {
    this.$ = $;
    this.$boutonRejoueConsigne = $('<div></div>');
    this.pointInsertion = pointInsertion;
    $(pointInsertion).append(this.$boutonRejoueConsigne);
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, $);
  }

  cache () {
    this.vueBoutonLire.cache();
    this.vueBoutonLectureEnCours.cache();
  }

  litConsigne ($) {
    this.journal.enregistre(new EvenementRejoueConsigne());
    this.vueBoutonLire.cache();

    this.vueBoutonLectureEnCours.affiche(this.$boutonRejoueConsigne, $);
    this.joueurConsigne.joue(this.lectureTerminee.bind(this));
  }

  lectureTerminee () {
    this.vueBoutonLectureEnCours.cache();
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, this.$);
  }
}
