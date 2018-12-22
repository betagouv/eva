import '../styles/commun.scss';
import '../styles/formulaireSaisieInventaire.scss';
import '../styles/overlay.scss';

function creeFormulaireSaisieInventaire (produits, $) {
  let $formulaireSaisie = $('<div class="formulaire-saisie-inventaire invisible"></div>');
  let $liste = $('<ul></ul>');

  produits.forEach(function (p) {
    let $ligneProduit = $('<li></li>').text(p.nom);
    $liste.append($ligneProduit);
  });

  $formulaireSaisie.append($liste);
  return $formulaireSaisie;
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

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}
