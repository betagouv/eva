import { traduction } from 'commun/infra/internationalisation';
import EvenementStop from 'commun/modeles/evenement_stop';
import { STOPPEE } from 'commun/modeles/situation';
import stop from 'commun/assets/stop.svg';
import VueBouton from './bouton';

import 'commun/styles/stop.scss';
import { afficheFenetreModale } from 'commun/vues/modale';

export default class VueStop {
  constructor (situation, journal, retourAccueil = () => {
    window.location.assign('/');
  }) {
    this.situation = situation;
    this.journal = journal;
    this.retourAccueil = retourAccueil;
  }

  affiche (pointInsertion, $) {
    const boutonStop = new VueBouton('bouton-stop', stop, () => { this.clickSurStop($(pointInsertion).parent(), $); });
    boutonStop.ajouteUneEtiquette(traduction('situation.arreter_mission'), true);
    boutonStop.affiche(pointInsertion, $);
  }

  clickSurStop (pointInsertion, $) {
    afficheFenetreModale(
      pointInsertion,
      $,
      traduction('situation.stop'),
      this.clickSurOk.bind(this)
    );
  }

  clickSurOk () {
    this.situation.modifieEtat(STOPPEE);
    return this.journal
      .enregistre(new EvenementStop(), 1000)
      .finally(() => {
        this.retourAccueil();
      });
  }
}
