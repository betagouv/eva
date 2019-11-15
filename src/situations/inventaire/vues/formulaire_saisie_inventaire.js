import { traduction } from 'commun/infra/internationalisation';
import { FINI } from 'commun/modeles/situation';
import EvenementOuvertureSaisieInventaire from 'inventaire/modeles/evenement_ouverture_saisie_inventaire';
import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';

import 'commun/styles/commun.scss';
import 'commun/styles/font_awesome.scss';
import 'commun/styles/bouton.scss';
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

  function creeCroixRetourStock () {
    const $croixRetourStock = $(`<img class="croix-retour-stock" src="${depotRessources.croixRetourStock().src}">`);
    $croixRetourStock.click(function () {
      basculeVisibilite($formulaireSaisie);
      basculeVisibilite($formulaireSaisie.parent());
    });

    return $croixRetourStock;
  }

  function creeBouton (icone, texte) {
    return $(`<button type="button" class="bouton-arrondi"><img class="bouton-arrondi-icone" src="${icone}" /> <span class="bouton-arrondi-texte">${texte}</span></button>`);
  }

  function creeBoutonValidation () {
    const $bouton = creeBouton(depotRessources.loupe().src, traduction('inventaire.valider_saisie'));
    $bouton.addClass('valide-saisie');
    $bouton.click(function () {
      const reponses = extraisReponses();
      const saisieValide = inventaireReference.valide(reponses);

      Array.from(saisieValide).forEach(correction => afficheCorrection(correction, $));

      const reussite = Array.from(saisieValide.values()).every(v => v);
      journal.enregistre(new EvenementSaisieInventaire({ reussite, resultatValidation: saisieValide, reponses }));
      $('.erreur-saisie').toggleClass('invisible', reussite);
      if (reussite) {
        situation.audios.reussite.play();
        situation.modifieEtat(FINI);
      } else {
        situation.audios.echec.play();
      }
    });

    return $bouton;
  }

  function creeBoutonRetour () {
    const $bouton = creeBouton(depotRessources.retourStock().src, traduction('inventaire.retour'));
    $bouton.addClass('bouton-retour-stock');
    $bouton.click(function () {
      basculeVisibilite($formulaireSaisie);
      basculeVisibilite($formulaireSaisie.parent());
    });
    return $bouton;
  }

  function creeZoneValidation () {
    const $zoneValidation = $('<div class="validation-inventaire"></div>');
    const $boutonValidation = creeBoutonValidation();
    const $boutonRetour = creeBoutonRetour();
    const $span = $('<span class="erreur-saisie invisible"></span>').text(traduction('inventaire.erreur_saisie'));
    $zoneValidation.append($boutonRetour, $span, $boutonValidation);
    return $zoneValidation;
  }

  function creeFormulaire () {
    const $formulaireSaisie = $(`
      <form id="${ID_FORMULAIRE_SAISIE}" autocomplete="off" class="formulaire-saisie-inventaire invisible"></form>
    `);
    const $liste = creeListe();
    const $zoneValidation = creeZoneValidation();
    const $croixRetour = creeCroixRetourStock();

    $formulaireSaisie.append($croixRetour, $liste, $zoneValidation);
    return $formulaireSaisie;
  }

  function creeBoutonSaisie ($formulaireSaisie) {
    const $boutonSaisie = creeBouton(depotRessources.boutonSaisie().src, traduction('inventaire.saisie_inventaire'));
    $boutonSaisie.addClass('affiche-saisie');
    const $overlay = $('<div class="overlay invisible"></div>');
    const $elementsCombines = $boutonSaisie.add($overlay);
    $overlay.append($formulaireSaisie);

    function basculeVisibiliteFormulaire () {
      if ($overlay.hasClass('invisible')) {
        journal.enregistre(new EvenementOuvertureSaisieInventaire());
        $('.erreur-saisie').addClass('invisible');
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
