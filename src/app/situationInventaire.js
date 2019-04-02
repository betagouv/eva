import uuidv4 from 'uuid/v4';

import 'inventaire/styles/app.scss';

import { contenants, contenus } from 'inventaire/data/stock';
import { Situation } from 'inventaire/modeles/situation';

import { DepotJournal } from 'commun/infra/depot_journal';
import { Journal } from 'commun/modeles/journal';
import { VueCadre } from 'commun/vues/cadre';
import { VueConsigne } from 'commun/vues/consigne';
import { VueGo } from 'commun/vues/go';
import { VueSituation } from 'inventaire/vues/situation';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

import sonConsigneDemarrage from 'inventaire/assets/consigne_demarrage.mp3';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, 'inventaire', new DepotJournal());
  const situation = new Situation({ contenants, contenus });
  const vueSituationInventaire = new VueSituation(situation, journal);
  const vueCadre = new VueCadre(vueSituationInventaire, journal);
  const vueConsigne = new VueConsigne(sonConsigneDemarrage);
  const vueGo = new VueGo(vueConsigne, situation, journal);

  vueConsigne.affiche(pointInsertion);
  vueCadre.affiche(pointInsertion, $);
  vueGo.affiche(pointInsertion, $);
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('inventaire.titre');
    jQuery('body').append(`<div id="magasin" class='conteneur'> </div>`);
    afficheSituation('#magasin', jQuery);
  });
});
