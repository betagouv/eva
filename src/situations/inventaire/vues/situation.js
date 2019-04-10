import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';

import { VueEtageres } from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

import sonReussite from 'inventaire/assets/reussite.mp3';
import sonEchec from 'inventaire/assets/echec.mp3';

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

    const reussite = new window.Audio(sonReussite);
    const echec = new window.Audio(sonEchec);

    initialiseFormulaireSaisieInventaire(this.situation,
      pointInsertion,
      $,
      this.journal,
      { reussite, echec }
    );
  }
}
