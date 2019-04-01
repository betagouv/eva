import { traduction } from 'commun/infra/internationalisation';
import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';
import { VueEtageres } from 'inventaire/vues/etageres.js';
import { afficheCorrection, initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire.js';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

export class VueSituation {
  constructor (situation, journal) {
    this.journal = journal;
    this.situation = situation;

    situation.observe(new EvenementDemarrage(), (evenement) => {
      this.journal.enregistre(evenement);
    });
  }

  affiche (pointInsertion, $) {
    new VueEtageres(pointInsertion, this.journal)
      .affiche(this.situation.contenants);

    initialiseFormulaireSaisieInventaire(this.situation, pointInsertion, $, (resultatValidation, reponses) => {
      const toutCorrect = Array.from(resultatValidation.values()).every(v => v);
      const message = toutCorrect ? traduction('inventaire.resultat.ok') : traduction('inventaire.resultat.echec');

      this.journal.enregistre(new EvenementSaisieInventaire({ resultat: toutCorrect, reponses }));

      Array.from(resultatValidation).forEach((correction) => { afficheCorrection(correction, $); });
      window.alert(message);
    }, this.journal);
  }
}
