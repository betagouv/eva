import { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import VueActionOverlay from './action_overlay';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueConsigne extends VueActionOverlay {
  constructor (situation, depot) {
    super(lectureEnCours, '', 'bouton-lecture-en-cours', 'bouton-centre-visible');
    this.situation = situation;
    this.consigne = depot.consigne();
    this.consigneCommune = depot.consigneCommune();
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.joueConsigne($);
  }

  lectureTermine () {
    this.situation.modifieEtat(CONSIGNE_ECOUTEE);
  }

  joueConsigne ($) {
    this.joueSon($, this.consigne, () => this.joueConsigneCommune($));
  }

  joueConsigneCommune ($) {
    this.joueSon($, this.consigneCommune, () => this.lectureTermine());
  }

  joueSon ($, son, callbackFin) {
    $(son).on('ended', callbackFin);
    son.play();
  }
}
