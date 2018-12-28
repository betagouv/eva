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
  return $('<li></li>').text(nomProduit);
}

function creeListe (produits, $) {
  let $liste = $('<ul></ul>');
  let items = produits.map(function (p) { return creeItem(p.nom, $); });
  $liste.append(items);

  return $liste;
}

function creeFormulaireSaisieInventaire (produits, $) {
  let $formulaireSaisie = $('<div class="formulaire-saisie-inventaire invisible"></div>');
  let $liste = creeListe(produits, $);
  $formulaireSaisie.append($liste);
  return $formulaireSaisie;
}

export function initialiseFormulaireSaisieInventaire (magasin, pointInsertion, $) {
  let $formulaireSaisie = creeFormulaireSaisieInventaire(magasin.produitsEnStock(), $);
  let $boutonSaisie = creeBoutonSaisie($formulaireSaisie, $);

  $boutonSaisie.appendTo(pointInsertion);
  $formulaireSaisie.appendTo(pointInsertion);
}
