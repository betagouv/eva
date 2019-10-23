import { traduction } from 'commun/infra/internationalisation';
import VueBouton from './bouton';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';
import { ENTRAINEMENT_DEMARRE, DEMARRE } from 'commun/modeles/situation';

import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';
import 'commun/styles/bouton.scss';

export default class VueRejoueConsigne {
  constructor (joueurConsigne, journal) {
    this.joueurConsigne = joueurConsigne;
    this.journal = journal;
    this.vueBoutonLire = new VueBouton('bouton-lire-consigne', play, () => this.litConsigne(this.$));
    this.vueBoutonLire.ajouteUneEtiquette(traduction('situation.repeter_consigne'));
    this.vueBoutonLectureEnCours = new VueBouton('bouton-lecture-en-cours', lectureEnCours);
  }

  affiche (pointInsertion, $, situation) {
    this.situation = situation;
    if (this.situation.etat() === DEMARRE) {
      return;
    }
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
    const consigneCommune = ![ENTRAINEMENT_DEMARRE, DEMARRE].includes(this.situation.etat());
    this.joueurConsigne
      .joue(consigneCommune, this.lectureTerminee.bind(this));
  }

  lectureTerminee () {
    this.vueBoutonLectureEnCours.cache();
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, this.$);
  }
}
