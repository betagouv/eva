import 'commun/styles/cadre.scss';
import { NON_DEMARRE, LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, FINI, CHANGEMENT_ETAT } from 'commun/modeles/situation';
import VueActions from 'commun/vues/actions';
import VueJoue from 'commun/vues/joue';
import VueConsigne from 'commun/vues/consigne';
import VueGo from 'commun/vues/go';
import VueTerminer from 'commun/vues/terminer';

export default class VueCadre {
  constructor (vueSituation, situation, journal) {
    this.vueSituation = vueSituation;
    this.situation = situation;
    this.vueActions = new VueActions(situation, journal);
    this.etats = new Map();
    this.etats.set(NON_DEMARRE, VueJoue);
    this.etats.set(LECTURE_CONSIGNE, VueConsigne);
    this.etats.set(CONSIGNE_ECOUTEE, VueGo);
    this.etats.set(FINI, VueTerminer);
  }

  affiche (pointInsertion, $) {
    const $cadre = $('<div id="cadre" class="conteneur"></div>');
    $(pointInsertion).prepend($cadre);

    $cadre.append($('<div class="scene"></div>'));
    this.vueSituation.affiche('.scene', $);

    this.selecteurCadre = '#cadre';
    this.vueActions.affiche(this.selecteurCadre, $);

    this.$ = $;
    this.afficheEtat(this.situation.etat());
    this.situation.on(CHANGEMENT_ETAT, this.afficheEtat.bind(this));
    this.previentLaFermetureDeLaSituation($);
  }

  afficheEtat (etat) {
    if (this.etat) {
      this.etat.cache();
      this.etat = null;
    }
    const Classe = this.etats.get(etat);
    if (Classe) {
      this.etat = new Classe(this.situation);
      this.etat.affiche(this.selecteurCadre, this.$);
    }
    if (etat === FINI) {
      this.vueActions.cache();
    }
  }

  previentLaFermetureDeLaSituation ($) {
    $(window).on('beforeunload', (e) => {
      if (![NON_DEMARRE, FINI].includes(this.situation.etat())) {
        e.preventDefault();
        return '';
      }
    });
  }
}
