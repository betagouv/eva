import { VueEtageres } from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

import VueAudio from 'commun/vues/audio';
import sonBravo from 'inventaire/assets/bravo.mp3';
import sonEssayeEncore from 'inventaire/assets/encore_un_effort.mp3';

export class VueSituation {
  constructor (situation, journal) {
    this.journal = journal;
    this.situation = situation;

    situation.observe(EvenementDemarrage, (evenement) => {
      this.journal.enregistre(evenement);
    });
  }

  affiche (pointInsertion, $) {
    new VueEtageres(pointInsertion, this.journal)
      .affiche(this.situation.contenants);

    const bravo = new VueAudio(sonBravo);
    const essayeEncore = new VueAudio(sonEssayeEncore);
    bravo.affiche(pointInsertion);
    essayeEncore.affiche(pointInsertion);

    initialiseFormulaireSaisieInventaire(this.situation,
      pointInsertion,
      $,
      this.journal,
      { bravo, essayeEncore }
    );
  }
}
