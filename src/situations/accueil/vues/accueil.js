import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import { CHANGEMENT_NOM } from 'commun/infra/registre_utilisateur';

export default class VueAccueil {
  constructor (situations, registreUtilisateur, depotRessources) {
    this.situations = situations;
    this.registreUtilisateur = registreUtilisateur;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    const niveau = this.registreUtilisateur.progression().niveau();

    const creeElementSituation = (situation, index) => {
      const desactivee = index + 1 > niveau;
      let $situation = $(`
        <a href="${situation.chemin}" class='situation ${situation.identifiant}'>
          ${situation.nom}
        </a>
      `);

      if (desactivee) {
        $situation = $(`
        <span class='situation ${situation.identifiant} desactivee'>
          ${situation.nom}
        </span>
      `);
      }

      $situation.on('dragstart', (e) => e.preventDefault());
      $situation.css('background-image', `url('${this.depotRessources.batimentSituation(situation.identifiant).src}')`);
      return $situation;
    };

    const creeElementListe = (situations) => {
      const $liste = $(`<div class='situations'></div>`);
      $liste.css('background-image', `url('${this.depotRessources.fondAccueil().src}')`);
      const $personnages = $(`<div class='personnages'></div>`);
      $personnages.css('background-image', `url('${this.depotRessources.personnages().src}')`);
      $liste.append($personnages);
      const $elementsSituation = situations.map((s, index) => { return creeElementSituation(s, index); });
      $liste.append(...$elementsSituation);
      return $liste;
    };

    function creeDeconnexion (registreUtilisateur) {
      const $deconnexion = $("<a class='deconnexion' href='#'><i class='fas fa-sign-out-alt'></i></a>");
      $deconnexion.click(() => {
        registreUtilisateur.deconnecte();
      });
      return $deconnexion;
    }

    function creeTitre (registreUtilisateur) {
      const $titre = $("<div class='titre'></div>");
      $($titre).append('<h1>Compétences pro</h1>');

      const $deconnexion = creeDeconnexion(registreUtilisateur);
      $titre.append($deconnexion);
      return $titre;
    }

    const $progression = $(`<div class='progression'></div>`);
    $progression.css('background-image', `url('${this.depotRessources.progression(niveau).src}')`);

    const $situations = creeElementListe(this.situations);
    const formulaireIdentification = new FormulaireIdentification(this.registreUtilisateur);
    const basculeAffichageFormulaireIdentification = () => {
      if (!this.registreUtilisateur.estConnecte()) {
        formulaireIdentification.affiche($situations, $);
      } else {
        formulaireIdentification.supprime();
      }
    };
    this.registreUtilisateur.on(CHANGEMENT_NOM, basculeAffichageFormulaireIdentification);
    basculeAffichageFormulaireIdentification();

    $situations.prepend($progression);

    const $titre = creeTitre(this.registreUtilisateur);
    $(pointInsertion).append($titre, $situations);
  }
}
