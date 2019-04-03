import { traduction } from 'commun/infra/internationalisation';
import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';
import { VueEtageres } from 'inventaire/vues/etageres';
import { initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import { VueFin } from 'commun/vues/fin.js';

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

    initialiseFormulaireSaisieInventaire(this.situation, pointInsertion, $, (resultatValidation, reponses) => {
      const reussite = Array.from(resultatValidation.values()).every(v => v);
      if (reussite) {
        this.afficheVueFin($);
      }
      this.journal.enregistre(new EvenementSaisieInventaire({ reussite, resultatValidation, reponses }));

      const message = reussite ? traduction('inventaire.resultat.ok') : traduction('inventaire.resultat.echec');
      window.alert(message);
    }, this.journal);
  }

  afficheVueFin () {
    new VueFin().affiche('.actions', $);
    $('.formulaire-saisie-inventaire').addClass('succes-saisie-inventaire');
    $('.validation-inventaire').remove();
  }
}
