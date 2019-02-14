import 'inventaire/styles/commun.scss';
import 'inventaire/styles/formulaireDebutJeu.scss';
import 'inventaire/styles/overlay.scss';


const ID_FORMULAIRE_DEBUT = 'formulaire-debut-jeu';


export function initialiseFormulaireCommencer(pointInsertion, $, callbackValidation) {
  
  function creeFormulaire($) {
    let $formulaireSaisie = $(`
      <form id="${ID_FORMULAIRE_DEBUT}" class="formulaire-debut-jeu invisible"></form>
    `);
    return $formulaireSaisie;
  }
  let $formulaireSaisie = creeFormulaire($);

  function creeBoutonCommencer($element, $) {
    let $bouton = $('<button type="button" class="debut-jeu">Commencer le jeu</button>');
    $bouton.click(function () {
      callbackValidation($element);
      $(this).remove();
    });
    return $bouton;
  }

  
  let $boutonSaisie = creeBoutonCommencer(callbackValidation, $);
  $(pointInsertion).append($boutonSaisie, $formulaireSaisie);
}