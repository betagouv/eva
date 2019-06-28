import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import VueAccesSituation from 'accueil/vues/acces_situation';
import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export default class VueAccueil {
  constructor (accesSituations, registreUtilisateur, depotRessources) {
    this.accesSituations = accesSituations;
    this.registreUtilisateur = registreUtilisateur;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    let niveau = this.registreUtilisateur.progression().niveau();

    const creeListeAcces = (accesSituations) => {
      const $liste = $(`<div class='acces-situations'></div>`);
      $liste.css('background-image', `url('${this.depotRessources.fondAccueil().src}')`);
      const $personnages = $(`<div class='personnages'></div>`);
      $personnages.css('background-image', `url('${this.depotRessources.personnages().src}')`);
      $liste.append($personnages);
      this.vuesAccesSituations = accesSituations.map((accesSituation) => {
        const vue = new VueAccesSituation(accesSituation, this.depotRessources);
        vue.affiche($liste, $);
        return vue;
      });
      return $liste;
    };

    function creeTitre () {
      const $titre = $("<div class='titre'></div>");
      $titre.append('<h1>Compétences pro</h1>');

      return $titre;
    }

    const $titre = creeTitre();
    const $progression = $(`<div class='progression'></div>`);

    const $accesSituations = creeListeAcces(this.accesSituations);

    const formulaireIdentification = new FormulaireIdentification(this.registreUtilisateur);
    const boiteUtilisateur = new VueBoiteUtilisateur(this.registreUtilisateur);

    const metsAJourAccesSituations = (niveau) => {
      this.vuesAccesSituations.forEach((vue) => vue.metsAJourAcces(niveau));
    };

    const basculeAffichageFormulaireIdentification = () => {
      if (!this.registreUtilisateur.estConnecte()) {
        formulaireIdentification.affiche($accesSituations, $);
        boiteUtilisateur.supprime();
      } else {
        niveau = this.registreUtilisateur.progression().niveau();
        metsAJourAccesSituations(niveau);
        formulaireIdentification.supprime();
        boiteUtilisateur.affiche($titre, $);
      }

      $progression.css('background-image', `url('${this.depotRessources.progression(niveau).src}')`);
    };

    this.registreUtilisateur.on(CHANGEMENT_CONNEXION, basculeAffichageFormulaireIdentification);
    basculeAffichageFormulaireIdentification();

    $accesSituations.prepend($progression);
    $(pointInsertion).append($titre, $accesSituations);
    metsAJourAccesSituations(niveau);
  }
}
