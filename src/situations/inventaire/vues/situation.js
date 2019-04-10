import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';

import { VueEtageres } from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

export class VueSituation {
  constructor (situation, journal) {
    this.journal = journal;
    this.situation = situation;

    situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === DEMARRE) {
        this.journal.enregistre(new EvenementDemarrage());
      }
    });
  }

  affiche (pointInsertion, $) {
    new VueEtageres(pointInsertion, this.journal)
      .affiche(this.situation.contenants);

    initialiseFormulaireSaisieInventaire(this.situation,
      pointInsertion,
      $,
      this.journal
    );
  }
}
