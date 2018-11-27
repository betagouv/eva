import '../styles/commun.scss';
import '../styles/formulaireSaisieInventaire.scss';
import '../styles/overlay.scss';

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}

function creeBoutonSaisie ($formulaireSaisie, $) {
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

function creeItem (nomProduit, $) {
  return $(`
    <li>
      <label>${nomProduit}</label>
      <input type="text">
    </li>
  `);
}

function creeListe (produits, $) {
  let $liste = $('<ul></ul>');
  let items = produits.map(function (p) { return creeItem(p.nom, $); });
  $liste.append(items);
  return $liste;
}

function creeFormulaire (produits, $) {
  let $formulaireSaisie = $('<form class="formulaire-saisie-inventaire invisible"></form>');
  let $liste = creeListe(produits, $);
  $formulaireSaisie.append($liste);
  return $formulaireSaisie;
}

export function initialiseFormulaireSaisieInventaire (magasin, pointInsertion, $) {
  let $formulaireSaisie = creeFormulaire(magasin.produitsEnStock(), $);
  let $boutonSaisie = creeBoutonSaisie($formulaireSaisie, $);
  $(pointInsertion).append($boutonSaisie, $formulaireSaisie);
}
