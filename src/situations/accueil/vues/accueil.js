import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import VueAccesSituation from 'accueil/vues/acces_situation';
import VueProgression from 'accueil/vues/progression';
import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';

export default class VueAccueil {
  constructor (accesSituations, registreUtilisateur, depotRessources) {
    this.accesSituations = accesSituations;
    this.registreUtilisateur = registreUtilisateur;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    const creeListeAcces = (accesSituations) => {
      const $liste = $(`<div class='acces-situations'></div>`);
      $liste.css('background-image', `url('${this.depotRessources.fondAccueil().src}')`);

      const progression = new VueProgression(this.depotRessources, this.registreUtilisateur);
      progression.affiche($liste, $);

      const $personnages = $(`<div class='personnages'></div>`);
      $personnages.css('background-image', `url('${this.depotRessources.personnages().src}')`);
      $liste.append($personnages);
      accesSituations.forEach((accesSituation) => {
        const vue = new VueAccesSituation(accesSituation, this.depotRessources, this.registreUtilisateur);
        vue.affiche($liste, $);
      });
      return $liste;
    };

    function creeTitre () {
      const $titre = $("<div class='titre'></div>");
      $titre.append('<h1>Compétences pro</h1>');

      return $titre;
    }

    const $titre = creeTitre();

    const $accesSituations = creeListeAcces(this.accesSituations);

    const formulaireIdentification = new FormulaireIdentification(this.registreUtilisateur);
    formulaireIdentification.affiche($accesSituations, $);

    const boiteUtilisateur = new VueBoiteUtilisateur(this.registreUtilisateur);
    boiteUtilisateur.affiche($titre, $);

    $(pointInsertion).append($titre, $accesSituations);
  }
}
