import '../styles/commun.scss';
import '../styles/formulaireSaisieInventaire.scss';
import '../styles/overlay.scss';

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}

export function initialiseFormulaireSaisieInventaire (magasin, pointInsertion, $) {
  let produits = magasin.produitsEnStock();

  function creeItem (nomProduit) {
    return $(`
      <li>
        <label>${nomProduit}</label>
        <input type="text">
      </li>
    `);
  }

  function creeListe () {
    let $liste = $('<ul></ul>');
    let items = produits.map(function (p) { return creeItem(p.nom); });
    $liste.append(items);
    return $liste;
  }

  function creeBoutonValidation () {
    return $('<button type="button" class="valide-saisie">Valider la saisie d\'inventaire</button>');
  }

  function creeZoneValidation () {
    let $zoneValidation = $('<div class="validation-inventaire"></div>');
    let $bouton = creeBoutonValidation();
    $zoneValidation.append($bouton);
    return $zoneValidation;
  }

  function creeFormulaire () {
    let $formulaireSaisie = $('<form class="formulaire-saisie-inventaire invisible"></form>');
    let $liste = creeListe();
    let $zoneValidation = creeZoneValidation();
    $formulaireSaisie.append($liste, $zoneValidation);
    return $formulaireSaisie;
  }

  function creeBoutonSaisie ($formulaireSaisie) {
    let $boutonSaisie = $('<button type="button" class="affiche-saisie">Saisir inventaire</button>');
    let $overlay = $('<div class="overlay invisible"></div>');
    let $elementsCombines = $boutonSaisie.add($overlay);

    function basculeVisibiliteFormulaire () {
      basculeVisibilite($overlay);
      basculeVisibilite($formulaireSaisie);
    }

    $elementsCombines.click(basculeVisibiliteFormulaire);

    return $elementsCombines;
  }

  let $formulaireSaisie = creeFormulaire();
  let $boutonSaisie = creeBoutonSaisie($formulaireSaisie);
  $(pointInsertion).append($boutonSaisie, $formulaireSaisie);
}
