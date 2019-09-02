import { traduction } from 'commun/infra/internationalisation';
import { FINI } from 'commun/modeles/situation';
import EvenementOuvertureSaisieInventaire from 'inventaire/modeles/evenement_ouverture_saisie_inventaire';
import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';

import 'commun/styles/commun.scss';
import 'commun/styles/font_awesome.scss';
import 'commun/styles/overlay.scss';
import 'inventaire/styles/formulaire_saisie_inventaire.scss';

const ID_FORMULAIRE_SAISIE = 'formulaire-saisie-inventaire';

function basculeVisibilite ($element) {
  $element.toggleClass('invisible');
}

export function afficheCorrection ([idProduit, reponseCorrecte], $) {
  const $champSaisie = $(`#${ID_FORMULAIRE_SAISIE} input#${idProduit}`);
  const $marque = $('<span class="marque-correcte">✓</span>');

  $champSaisie.siblings('.marque-correcte').remove();
  if (reponseCorrecte) {
    $champSaisie.addClass('reponse-correcte');
    $champSaisie.removeClass('reponse-incorrecte');
    $marque.insertAfter($champSaisie);
  } else {
    $champSaisie.addClass('reponse-incorrecte');
    $champSaisie.removeClass('reponse-correcte');
  }
}

export function initialiseFormulaireSaisieInventaire (situation, pointInsertion, $, journal, depotRessources) {
  const produits = situation.produitsEnStock();
  const inventaireReference = situation.inventaireReference();
  let reussite = false;

  function creeItem (idProduit, produit) {
    const unite = produit.forme === 'bidon' ? `<span class="unite">${traduction('inventaire.unite_vrac')}</span>` : '';
    return $(`
      <li>
        <label>${produit.nom}</label>
        <span class='saisie'>
          <input id="${idProduit}" type="text" maxlength="2">
          ${unite}
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
      reponses.set($input.attr('id'), { quantite: parseInput($input) });
    });

    return reponses;
  }

  function parseInput (input) {
    const reponse = input.val();
    return parseInt(reponse, 10);
  }

  function creeZoneRetourStock () {
    const $croixRetourStock = $(`<img class="croix-retour-stock" src="${depotRessources.croixRetourStock().src}">`);
    $croixRetourStock.click(function () {
      basculeVisibilite($formulaireSaisie);
      basculeVisibilite($formulaireSaisie.parent());
    });

    return $croixRetourStock;
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
        situation.audios.reussite.play();
        afficheVueSucces();
        situation.modifieEtat(FINI);
      } else {
        situation.audios.echec.play();
      }
    });

    return $bouton;
  }

  function afficheVueSucces () {
    $('.valide-saisie').remove();
    $('.croix-retour-stock').remove();
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
    const $formulaireSaisie = $(`
      <form id="${ID_FORMULAIRE_SAISIE}" autocomplete="off" class="formulaire-saisie-inventaire invisible"></form>
    `);
    const $liste = creeListe();
    const $zoneValidation = creeZoneValidation();
    const $zoneRetour = creeZoneRetourStock();

    $formulaireSaisie.append($zoneRetour, $liste, $zoneValidation);
    return $formulaireSaisie;
  }

  function creeBoutonSaisie ($formulaireSaisie) {
    const $boutonSaisie = $(`<button class="affiche-saisie"><img src="${depotRessources.boutonSaisie().src}"></button>`);
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
}
