import 'inventaire/styles/situation.scss';

import VueEtageres from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaire_saisie_inventaire';

export default class VueSituation {
  constructor (situation, journal) {
    this.journal = journal;
    this.situation = situation;
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
