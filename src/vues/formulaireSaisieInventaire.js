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

  function creeFormulaire () {
    let $formulaireSaisie = $('<form class="formulaire-saisie-inventaire invisible"></form>');
    let $liste = creeListe();
    $formulaireSaisie.append($liste);
    return $formulaireSaisie;
  }

  function creeBoutonSaisie ($formulaireSaisie) {
    let $boutonSaisie = $('<div class="affiche-saisie">Saisir inventaire</div>');
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
