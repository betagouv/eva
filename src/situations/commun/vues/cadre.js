import 'commun/styles/cadre.scss';
import { NON_DEMARRE, LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, FINI, CHANGEMENT_ETAT, STOPPEE } from 'commun/modeles/situation';
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
    this.vuesEtats = new Map();
    this.vuesEtats.set(NON_DEMARRE, VueJoue);
    this.vuesEtats.set(LECTURE_CONSIGNE, VueConsigne);
    this.vuesEtats.set(CONSIGNE_ECOUTEE, VueGo);
    this.vuesEtats.set(FINI, VueTerminer);
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
    this.previensLaFermetureDeLaSituation($);
  }

  afficheEtat (etat) {
    if (this.vueCourante) {
      this.vueCourante.cache();
      this.vueCourante = null;
    }
    const ClasseVue = this.vuesEtats.get(etat);
    if (ClasseVue) {
      this.vueCourante = new ClasseVue(this.situation);
      this.vueCourante.affiche(this.selecteurCadre, this.$);
    }
    if (etat === FINI) {
      this.vueActions.cache();
    }
  }

  previensLaFermetureDeLaSituation ($) {
    $(window).on('beforeunload', (e) => {
      if (![NON_DEMARRE, FINI, STOPPEE].includes(this.situation.etat())) {
        e.preventDefault();
        return '';
      }
    });
  }
}
