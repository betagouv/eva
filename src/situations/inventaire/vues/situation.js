import 'inventaire/styles/situation.scss';

import VueEtageres from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaire_saisie_inventaire';
import { creeStore } from 'commun/modeles/store';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.store = creeStore();
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
