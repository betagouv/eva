import { traduction } from 'commun/infra/internationalisation';
import { FINI } from 'commun/modeles/situation';
import boutonSaisie from 'inventaire/assets/saisie-reponse.svg';
import EvenementOuvertureSaisieInventaire from 'inventaire/modeles/evenement_ouverture_saisie_inventaire';
import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';

import 'commun/styles/commun.scss';
import 'commun/styles/overlay.scss';
import 'inventaire/styles/commun.scss';
import 'inventaire/styles/formulaireSaisieInventaire.scss';

const ID_FORMULAIRE_SAISIE = 'formulaire-saisie-inventaire';

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}

export function afficheCorrection ([idProduit, reponseCorrecte], $) {
  const $marque = reponseCorrecte
    ? $('<span class="reponse reponse-correcte">✓</span>')
    : $('<span class="reponse reponse-incorrecte">✗</span>');
  const selecteurEmplacementMarque = `#${ID_FORMULAIRE_SAISIE} input#${idProduit}`;

  $(`${selecteurEmplacementMarque} + .reponse`).remove();
  $marque.insertAfter($(selecteurEmplacementMarque));
}

export function initialiseFormulaireSaisieInventaire (situation, pointInsertion, $, journal) {
  const produits = situation.produitsEnStock();
  const inventaireReference = situation.inventaireReference();
  let reussite = false;

  function creeItem (idProduit, produit) {
    return $(`
      <li>
        <label>${produit.nom}</label>
        <span class='saisie'>
          <input id="${idProduit}" type="text" placeholder= "${traduction('inventaire.placeholder')}">
        </span>
        <div class="image-produit">
          <img src='${produit.image}' class="${produit.forme}">
        </div>
      </li>
    `);
  }

  function creeListe () {
    const $liste = $('<ul></ul>');
    const items = Array.from(produits, ([id, p]) => { return creeItem(id, p); });
    $liste.append(items);
    return $liste;
  }

  function extraisReponses () {
    var reponses = new Map();

    $(`#${ID_FORMULAIRE_SAISIE} input`).each(function () {
      const $input = $(this);
      reponses.set($input.attr('id'), { quantite: $input.val() });
    });

    return reponses;
  }

  function creeBoutonRetourStock () {
    let $zoneRetour = $('<div class="retour-stock"></div>');
    const $bouton = $(`<button type="button" class="bouton-retour-stock">${traduction('inventaire.retour_stock')}</button>`);
    $zoneRetour.append($bouton);
    return $zoneRetour;
  }

  function creeBoutonValidation () {
    const $bouton = $(`<button type="button" class="valide-saisie">${traduction('inventaire.valider_saisie')}</button>`);
    $bouton.click(function () {
      const reponses = extraisReponses();
      const saisieValide = inventaireReference.valide(reponses);

      Array.from(saisieValide).forEach(correction => afficheCorrection(correction, $));

      reussite = Array.from(saisieValide.values()).every(v => v);
      journal.enregistre(new EvenementSaisieInventaire({ reussite, resultatValidation: saisieValide, reponses }));
      if (reussite) {
        situation.reussite.play();
        afficheVueSucces();
        situation.modifieEtat(FINI);
      } else {
        situation.echec.play();
      }
    });

    return $bouton;
  }

  function afficheVueSucces () {
    $('.valide-saisie').remove();
    $('.formulaire-saisie-inventaire').addClass('succes-saisie-inventaire');
    $('input').prop('disabled', true);
  }

  function creeZoneValidation () {
    const $zoneValidation = $('<div class="validation-inventaire"></div>');
    const $bouton = creeBoutonValidation();
    $zoneValidation.append($bouton);
    return $zoneValidation;
  }

  function creeFormulaire () {
    let $formulaireSaisie = $(`
      <form id="${ID_FORMULAIRE_SAISIE}" autocomplete="off" class="formulaire-saisie-inventaire invisible"></form>
    `);
    const $liste = creeListe();
    const $zoneValidation = creeZoneValidation();
    $formulaireSaisie.append($liste, $zoneValidation);
    return $formulaireSaisie;
  }

  function creeBoutonSaisie ($formulaireSaisie) {
    const $boutonSaisie = $(`<img class="affiche-saisie" src="${boutonSaisie}">`);
    const $overlay = $('<div class="overlay invisible"></div>');
    const $elementsCombines = $boutonSaisie.add($overlay);
    $overlay.append($formulaireSaisie);

    function basculeVisibiliteFormulaire () {
      if (reussite) return;
      if ($overlay.hasClass('invisible')) {
        journal.enregistre(new EvenementOuvertureSaisieInventaire());
      }
      basculeVisibilite($overlay);
      basculeVisibilite($formulaireSaisie);
    }

    $elementsCombines.click(basculeVisibiliteFormulaire);
    $formulaireSaisie.click((e) => { e.stopPropagation(); });

    return $elementsCombines;
  }

  const $formulaireSaisie = creeFormulaire();
  const $boutonSaisie = creeBoutonSaisie($formulaireSaisie);
  $(pointInsertion).append($boutonSaisie);
  $('.formulaire-saisie-inventaire').append(creeBoutonRetourStock());
}
