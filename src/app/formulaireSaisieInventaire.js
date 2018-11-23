import '../styles/formulaireSaisieInventaire.scss';

export function creeFormulaireSaisieInventaire (produits, $) {
  let $formulaireSaisie = $('<div class="formulaire-saisie-inventaire"></div>');
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
  let $formulaireSaisie = creeFormulaireSaisieInventaire(magasin.produitsEnStock(), $);
  $boutonSaisie.click(function () { $formulaireSaisie.toggleClass('visible'); });

  $formulaireSaisie.appendTo(pointInsertion);
  $boutonSaisie.appendTo(pointInsertion);
}
