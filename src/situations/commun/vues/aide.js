import { traduction } from 'commun/infra/internationalisation';
import aide from 'commun/assets/aide.svg';
import VueBouton from './bouton';
import { creeAdapteur } from './adapteur_vue';
import VueFenetreAide, { FERME } from 'commun/vues/fenetre_aide';

import 'commun/styles/bouton.scss';
import 'commun/styles/aide.scss';

const AdapteurFenetreAide = creeAdapteur(VueFenetreAide);

export default class VueAide {
  constructor (situation, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    this.fenetreAide = new AdapteurFenetreAide(this.situation, this.depotRessources);
    const boutonAide = new VueBouton('bouton-aide', aide, () => {
      this.activeAide(pointInsertion, $);
    });
    boutonAide.ajouteUneEtiquette(traduction('situation.activer_aide'));
    boutonAide.affiche(pointInsertion, $);
  }

  activeAide (pointInsertion, $) {
    this.situation.activeAide();
    this.fenetreAide.affiche(pointInsertion, $);
    this.fenetreAide.vm.$children[0].$on(FERME, () => {
      this.fenetreAide.cache();
    });
  }
}
