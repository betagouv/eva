import 'commun/styles/commun.scss';
import 'inventaire/styles/commun.scss';
import 'inventaire/styles/formulaireSaisieInventaire.scss';
import 'inventaire/styles/overlay.scss';

const ID_FORMULAIRE_SAISIE = 'formulaire-saisie-inventaire';

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}

export function afficheCorrection ([idProduit, reponseCorrecte], $) {
  let $marque = reponseCorrecte
    ? $('<span class="reponse-correcte">✓</span>')
    : $('<span class="reponse-incorrecte">✗</span>');
  let selecteurEmplacementMarque = `#${ID_FORMULAIRE_SAISIE} input#${idProduit}`;

  $(`${selecteurEmplacementMarque} + span[class^="reponse-"]`).remove();
  $marque.insertAfter($(selecteurEmplacementMarque));
}

export function initialiseFormulaireSaisieInventaire (magasin, pointInsertion, $, callbackValidation) {
  let produits = magasin.produitsEnStock();
  let inventaireReference = magasin.inventaireReference();

  function creeItem (idProduit, produit) {
    return $(`
      <li>
        <span class="image-produit" style="background-image: url(${produit.image})"></span>
        <label>${produit.nom}</label>
        <input id="${idProduit}" type="text">
      </li>
    `);
  }

  function creeListe () {
    let $liste = $('<ul></ul>');
    let items = Array.from(produits, ([id, p]) => { return creeItem(id, p); });
    $liste.append(items);
    return $liste;
  }

  function extraisReponses () {
    var reponses = new Map();

    $(`#${ID_FORMULAIRE_SAISIE} input`).each(function () {
      let $input = $(this);
      reponses.set($input.attr('id'), { quantite: $input.val() });
    });

    return reponses;
  }

  function creeBoutonValidation () {
    let $bouton = $('<button type="button" class="valide-saisie">Valider la saisie d\'inventaire</button>');
    $bouton.click(function () {
      let reponses = extraisReponses();
      let saisieValide = inventaireReference.valide(reponses);
      callbackValidation(saisieValide);
    });

    return $bouton;
  }

  function creeZoneValidation () {
    let $zoneValidation = $('<div class="validation-inventaire"></div>');
    let $bouton = creeBoutonValidation();
    $zoneValidation.append($bouton);
    return $zoneValidation;
  }

  function creeFormulaire () {
    let $formulaireSaisie = $(`
      <form id="${ID_FORMULAIRE_SAISIE}" class="formulaire-saisie-inventaire invisible"></form>
    `);
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
