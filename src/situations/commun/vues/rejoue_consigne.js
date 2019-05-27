import { traduction } from 'commun/infra/internationalisation';
import VueBouton from './bouton';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';
import { DEMARRE } from 'commun/modeles/situation';

import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';
import 'commun/styles/bouton.scss';

export default class VueRejoueConsigne {
  constructor (depotResources, journal) {
    this.depotResources = depotResources;
    this.journal = journal;
    this.vueBoutonLire = new VueBouton('bouton-lire-consigne', play, () => this.joueConsigne(this.$));
    this.vueBoutonLire.ajouteUneEtiquette(traduction('situation.repeter_consigne'));
    this.vueBoutonLectureEnCours = new VueBouton('bouton-lecture-en-cours', lectureEnCours);
  }

  affiche (pointInsertion, $, situation) {
    this.etat = situation._etat;
    if (this.etat === DEMARRE) {
      return;
    }
    this.$ = $;
    this.$boutonRejoueConsigne = $('<div></div>');
    this.pointInsertion = pointInsertion;
    $(pointInsertion).append(this.$boutonRejoueConsigne);
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, $);
  }

  joueConsigne ($) {
    this.journal.enregistre(new EvenementRejoueConsigne());
    this.vueBoutonLire.cache();

    this.vueBoutonLectureEnCours.affiche(this.$boutonRejoueConsigne, $);
    this.definisConsigneAJouer($);
  }

  definisConsigneAJouer ($) {
    const consigne = this.depotResources.consigne();
    if (this.etat !== DEMARRE) {
      this.joueSon($, consigne, () => this.joueConsigneCommune($));
    } else {
      this.joueSon($, consigne, () => this.lectureTermine($));
    }
  }

  joueConsigneCommune ($) {
    const consigneCommune = this.depotResources.consigneCommune();
    this.joueSon($, consigneCommune, () => this.lectureTermine());
  }

  lectureTermine () {
    this.vueBoutonLectureEnCours.cache();
    this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, this.$);
  }

  joueSon ($, son, callbackFin) {
    $(son).on('ended', callbackFin);
    son.start();
  }
}
