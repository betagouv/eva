import $ from 'jquery';

import VueActions from 'commun/vues/actions';
import { creeStore } from 'commun/modeles/store';
import SituationCommune, { DEMARRE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI } from 'commun/modeles/situation';

describe('Affiche les éléments communs aux situations', function () {
  let vueActions;
  let situation;
  let store;

  beforeEach(function () {
    store = creeStore();
    $('body').append('<div id="magasin"></div>');
    situation = new SituationCommune();

    vueActions = new VueActions(situation, {}, new class {}(), store);
  });

  it('regroupe les éléments dans un conteneur', function () {
    vueActions.affiche('#magasin', $);
    expect($('.actions').length).toBe(1);
  });

  it("N'affiche pas les éléments communs aux situations par défaut (bouton stop, bouton rejoue consigne)", function () {
    vueActions.affiche('#magasin', $);
    expect($('.bouton-stop').length).toBe(0);
    expect($('.bouton-lire-consigne', '.actions').length).toBe(0);
  });

  it("Affiche bouton stop, rejoue consigne et aide une fois que l'utilisateur a démarré", function () {
    situation.aideDisponible = () => true;
    vueActions.affiche('#magasin', $);
    situation.modifieEtat(DEMARRE);
    expect($('.bouton-stop').length).toBe(1);
    expect($('.bouton-lire-consigne', '.actions').length).toBe(1);
    expect($('.bouton-aide', '.actions').length).toBe(1);
  });

  it("n'affiche pas le bouton rejoue consigne une fois l'entrainement terminé", function () {
    vueActions.affiche('#magasin', $);
    situation._entrainementDisponible = true;
    situation.modifieEtat(ENTRAINEMENT_DEMARRE);
    expect($('.bouton-lire-consigne', '.actions').length).toBe(1);
    situation.modifieEtat(ENTRAINEMENT_FINI);
    expect($('.bouton-lire-consigne', '.actions').length).toBe(0);
    situation.modifieEtat(DEMARRE);
    expect($('.bouton-lire-consigne', '.actions').length).toBe(0);
  });

  it("affiche le bouton stop une fois l'entrainement démarré", function () {
    situation.entrainementDisponible = () => true;
    vueActions.affiche('#magasin', $);
    situation.modifieEtat(ENTRAINEMENT_DEMARRE);
    expect($('.bouton-stop').length).toBe(1);
    situation.modifieEtat(ENTRAINEMENT_FINI);
    expect($('.bouton-stop').length).toBe(1);
    situation.modifieEtat(DEMARRE);
    expect($('.bouton-stop').length).toBe(1);
  });

  it("n'affiche pas le bouton aide dans l'entrainement", function () {
    situation.aideDisponible = () => true;
    situation.entrainementDisponible = () => true;
    vueActions.affiche('#magasin', $);
    situation.modifieEtat(ENTRAINEMENT_DEMARRE);
    expect($('.bouton-aide').length).toBe(0);
    situation.modifieEtat(ENTRAINEMENT_FINI);
    expect($('.bouton-aide').length).toBe(0);
    situation.modifieEtat(DEMARRE);
    expect($('.bouton-aide').length).toBe(1);
  });

  it("n'affiche pas le bouton d'aide lorsqu'elle n'est pas disponible", function () {
    vueActions.affiche('#magasin', $);
    situation.modifieEtat(DEMARRE);
    expect($('.bouton-aide').length).toBe(0);
  });
});
