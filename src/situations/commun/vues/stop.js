import { traduction } from 'commun/infra/internationalisation';
import EvenementAbandon from 'commun/modeles/evenement_abandon';
import { STOPPEE } from 'commun/modeles/situation';
import stop from 'commun/assets/stop.svg';
import VueBouton from './bouton';

import 'commun/styles/bouton.scss';
import 'commun/styles/stop.scss';

import { afficheFenetreModale } from 'commun/vues/modale';

export default class VueStop {
  constructor (situation, journal, retourAccueil = () => window.location.assign('/')) {
    this.situation = situation;
    this.journal = journal;
    this.retourAccueil = retourAccueil;
  }

  affiche (pointInsertion, $) {
    const boutonStop = new VueBouton('bouton-stop', stop, () => { this.clickSurStop($(pointInsertion).parent(), $); });
    boutonStop.ajouteUneEtiquette(traduction('situation.arreter_mission'));
    boutonStop.affiche(pointInsertion, $);
  }

  clickSurStop (pointInsertion, $) {
    afficheFenetreModale(
      pointInsertion,
      $,
      {
        titre: traduction('situation.stop'),
        actionOk: this.clickSurOk.bind(this)
      }
    );
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
