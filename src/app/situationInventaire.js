import uuidv4 from 'uuid/v4';

import 'inventaire/styles/app.scss';

import { DepotJournal } from 'commun/infra/depot_journal.js';
import { Journal } from 'commun/modeles/journal.js';
import { VueActions } from 'commun/vues/actions.js';
import { VueCadre } from 'commun/vues/cadre.js';
import { VueConsigne } from 'commun/vues/consigne.js';
import { VueGo } from 'commun/vues/go.js';
import { VueSituation } from 'inventaire/vues/situation.js';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

import sonConsigneDemarrage from 'inventaire/assets/consigne_demarrage.mp3';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, 'inventaire', new DepotJournal());
  const vueSituationInventaire = new VueSituation(journal);
  const vueCadre = new VueCadre(vueSituationInventaire);
  const vueActions = new VueActions(journal);
  const vueConsigne = new VueConsigne(pointInsertion, sonConsigneDemarrage);
  const vueGo = new VueGo(vueConsigne, journal);

  vueCadre.affiche(pointInsertion, $);
  vueActions.affiche(pointInsertion, $);
  vueGo.affiche(pointInsertion);
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('inventaire.titre');
    jQuery('body').append(`<div id="magasin" class='conteneur'> </div>`);
    afficheSituation('#magasin', jQuery);
  });
});
