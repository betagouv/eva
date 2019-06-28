import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import VueAccesSituation from 'accueil/vues/acces_situation';
import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export default class VueAccueil {
  constructor (situations, registreUtilisateur, depotRessources) {
    this.situations = situations;
    this.registreUtilisateur = registreUtilisateur;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    let niveau = this.registreUtilisateur.progression().niveau();

    const metsAJourAccesSituations = (niveau) => {
      function estInaccessible (index) { return index + 1 > niveau; }

      $('.situations .situation').each((index, element) => {
        $(element).toggleClass('desactivee', estInaccessible(index));
      });

      $('.situations .situation').css('pointer-events', function (index) {
        return estInaccessible(index) ? 'none' : 'auto';
      });
    };

    const creeElementListe = (situations) => {
      const $liste = $(`<div class='situations'></div>`);
      $liste.css('background-image', `url('${this.depotRessources.fondAccueil().src}')`);
      const $personnages = $(`<div class='personnages'></div>`);
      $personnages.css('background-image', `url('${this.depotRessources.personnages().src}')`);
      $liste.append($personnages);
      situations.forEach((s) => {
        const accesSituation = new VueAccesSituation(s, this.depotRessources);
        accesSituation.affiche($liste, $);
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

    const $situations = creeElementListe(this.situations);

    const formulaireIdentification = new FormulaireIdentification(this.registreUtilisateur);
    const boiteUtilisateur = new VueBoiteUtilisateur(this.registreUtilisateur);

    const basculeAffichageFormulaireIdentification = () => {
      if (!this.registreUtilisateur.estConnecte()) {
        formulaireIdentification.affiche($situations, $);
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

    $situations.prepend($progression);
    $(pointInsertion).append($titre, $situations);
    metsAJourAccesSituations(niveau);
  }
}
