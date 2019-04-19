import uuidv4 from 'uuid/v4';

import 'inventaire/styles/app.scss';

import { contenants, contenus } from 'inventaire/data/stock';
import Situation from 'inventaire/modeles/situation';

import DepotJournal from 'commun/infra/depot_journal';
import Journal from 'commun/modeles/journal';
import VueCadre from 'commun/vues/cadre';
import { VueSituation } from 'inventaire/vues/situation';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

import consigne from 'inventaire/assets/consigne_demarrage.mp3';
import reussite from 'inventaire/assets/reussite.mp3';
import echec from 'inventaire/assets/echec.mp3';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, 'inventaire', new DepotJournal(), new RegistreUtilisateur());

  const situation = new Situation({ contenants, contenus },
    { consigne, reussite, echec });

  const vueSituation = new VueSituation(situation, journal);
  const vueCadre = new VueCadre(vueSituation, situation, journal);

  vueCadre.affiche(pointInsertion, $);
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('inventaire.titre');
    afficheSituation('body', jQuery);
  });
});
