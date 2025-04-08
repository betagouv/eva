import { traduction } from 'commun/infra/internationalisation';
import aide from 'commun/assets/aide.svg';
import VueBouton from './bouton.js';
import { creeAdaptateur } from './adaptateur_vue';
import EvenementActivationAide from 'commun/modeles/evenement_activation_aide';
import VueFenetreAide from 'commun/vues/fenetre_aide';

import 'commun/styles/boutons.scss';
import 'commun/styles/aide.scss';

const AdapteurFenetreAide = creeAdaptateur(VueFenetreAide);

export default class VueAide {
  constructor (situation, depotRessources, journal) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    const store = null;
    this.fenetreAide = new AdapteurFenetreAide(
      this.situation,
      this.depotRessources,
      store,
      {
        contexte: this.journal.situation
      }
    );
    const boutonAide = new VueBouton('bouton-aide', aide, () => {
      this.activeAide(pointInsertion, $);
    });
    boutonAide.ajouteUneEtiquette(traduction('situation.activer_aide'));
    boutonAide.affiche(pointInsertion, $);
  }

  activeAide (pointInsertion, $) {
    if (!this.situation.aideActivee) {
      this.journal.enregistre(new EvenementActivationAide());
    }
    this.situation.activeAide();
    this.fenetreAide.affiche(pointInsertion, $);
  }
}
