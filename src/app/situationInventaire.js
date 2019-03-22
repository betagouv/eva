import uuidv4 from 'uuid/v4';

import 'inventaire/styles/app.scss';

import { DepotJournal } from 'commun/infra/depot_journal.js';
import { Journal } from 'commun/modeles/journal.js';
import { ActionsCommunesSituation } from 'commun/vues/actions_communes_situation.js';
import { VueCadre } from 'commun/vues/cadre.js';
import { VueConsigne } from 'commun/vues/consigne.js';
import { VueGo } from 'commun/vues/go.js';
import { VueSituation } from 'inventaire/vues/situation.js';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

import sonConsigneDemarrage from 'inventaire/assets/consigne_demarrage.mp3';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, new DepotJournal());
  const vueSituationInventaire = new VueSituation(journal);
  const vueCadre = new VueCadre(vueSituationInventaire);
  vueCadre.affiche(pointInsertion, $);

  new ActionsCommunesSituation(pointInsertion, $, journal).afficheElementEnCommun();

  const vueConsigne = new VueConsigne(pointInsertion, sonConsigneDemarrage);
  new VueGo(pointInsertion, vueConsigne, journal).afficher();
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('inventaire.titre');
    jQuery('body').append(`<div id="magasin" class='conteneur'> </div>`);
    afficheSituation('#magasin', jQuery);
  });
});
