import { traduction } from 'commun/infra/internationalisation';
import VueBouton from './bouton';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';

import play from 'commun/assets/play.svg';
import enPause from 'commun/assets/en-pause.svg';
import 'commun/styles/boutons.scss';

export default class VueRejoueConsigne {
  constructor (situation, joueurConsigne, journal) {
    this.situation = situation;
    this.joueurConsigne = joueurConsigne;
    this.journal = journal;

    this.vueBoutonLire = new VueBouton('bouton-lire-consigne', play, () => this.litConsigne(this.$));
    this.vueBoutonLire.ajouteUneEtiquette(traduction('situation.repeter_consigne'));

    this.vueBoutonArret = new VueBouton('bouton-en-pause', enPause, () => this.arreteConsigne());
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
    this.vueBoutonArret.cache();
  }

  litConsigne ($) {
    this.journal.enregistre(new EvenementRejoueConsigne());
    this.vueBoutonLire.cache();
    this.vueBoutonArret.affiche(this.$boutonRejoueConsigne, $);
    this.joueurConsigne.joue(this.lectureTerminee.bind(this));
  }

  arreteConsigne () {
    this.joueurConsigne.stop();
    this.vueBoutonArret.cache();
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, this.$);
  }

  lectureTerminee () {
    this.vueBoutonArret.cache();
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, this.$);
  }
}
