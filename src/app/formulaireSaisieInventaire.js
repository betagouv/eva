import '../styles/commun.scss';
import '../styles/formulaireSaisieInventaire.scss';
import '../styles/overlay.scss';

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

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}

export function initialiseFormulaireSaisieInventaire (magasin, pointInsertion, $) {
  let $boutonSaisie = $('<div class="affiche-saisie">Saisir inventaire</div>');
  let $overlay = $('<div class="overlay invisible"></div>');
  let $formulaireSaisie = creeFormulaireSaisieInventaire(magasin.produitsEnStock(), $);

  function basculeVisibiliteFormulaire () {
    basculeVisibilite($overlay);
    basculeVisibilite($formulaireSaisie);
  }

  $boutonSaisie.click(basculeVisibiliteFormulaire);
  $overlay.click(basculeVisibiliteFormulaire);

  $boutonSaisie.appendTo(pointInsertion);
  $overlay.appendTo(pointInsertion);
  $formulaireSaisie.appendTo(pointInsertion);
}
