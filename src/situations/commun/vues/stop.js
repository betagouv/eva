import { traduction } from 'commun/infra/internationalisation';
import EvenementAbandon from 'commun/modeles/evenement_abandon';
import { STOPPEE } from 'commun/modeles/situation';
import stop from 'commun/assets/stop.svg';
import VueBouton from './bouton';
import { afficheFenetreModale } from 'commun/vues/modale';
import { SCOPE_URL } from 'commun/vues/affiche_situation';

import 'commun/styles/boutons.scss';
import 'commun/styles/stop.scss';

export default class VueStop {
  constructor (situation, journal, retourAccueil = () => window.location.assign(SCOPE_URL)) {
    this.situation = situation;
    this.journal = journal;
    this.retourAccueil = retourAccueil;
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
    return this.journal
      .enregistre(new EvenementAbandon(), 1000)
      .finally(() => {
        this.retourAccueil();
      });
  }
}
