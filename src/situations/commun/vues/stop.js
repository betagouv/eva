import { traduction } from 'commun/infra/internationalisation';
import { STOPPEE } from 'commun/modeles/situation';
import stop from 'commun/assets/stop.svg';
import VueBouton from './bouton';
import { afficheFenetreModale } from 'commun/vues/modale';

import 'commun/styles/boutons.scss';
import 'commun/styles/stop.scss';

export default class VueStop {
  constructor (situation, journal) {
    this.situation = situation;
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    const boutonStop = new VueBouton('bouton-stop', stop, () => { this.clickSurStop($('#cadre'), $); });
    boutonStop.ajouteUneEtiquette(traduction('situation.abandonner_situation'));
    boutonStop.affiche(pointInsertion, $);
  }

  clickSurStop (pointInsertion, $) {
    afficheFenetreModale(
      pointInsertion,
      $,
      {
        titre: traduction(this.cleMessageConfirmation()),
        boutonOk: traduction('abandon.oui'),
        boutonAnnuler: traduction('abandon.non'),
        actionOk: this.clickSurOk.bind(this)
      }
    );
  }

  cleMessageConfirmation () {
    if (this.situation.abandonImpacteResultat()) {
      return 'abandon.confirmation';
    }
    return 'abandon.confirmation_sans_impact';
  }

  clickSurOk () {
    this.situation.modifieEtat(STOPPEE);
  }
}
