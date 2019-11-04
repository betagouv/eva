import 'inventaire/styles/situation.scss';

import VueEtageres from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaire_saisie_inventaire';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    new VueEtageres(this.situation, this.journal)
      .affiche(pointInsertion);

    initialiseFormulaireSaisieInventaire(this.situation,
      pointInsertion,
      $,
      this.journal,
      this.depotRessources
    );
  }
}
