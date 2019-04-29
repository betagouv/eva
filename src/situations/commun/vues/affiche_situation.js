import uuidv4 from 'uuid/v4';

import DepotJournal from 'commun/infra/depot_journal';
import ChargeurRessources from 'commun/infra/chargeur_ressources';
import Journal from 'commun/modeles/journal';
import VueCadre from 'commun/vues/cadre';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

export function afficheSituation (nomSituation, modeleSituation, VueSituation, contexte) {
  function affiche (pointInsertion, $) {
    const session = uuidv4();
    const journal = new Journal(Date.now, session, nomSituation, new DepotJournal(), new RegistreUtilisateur());
    const vueSituation = new VueSituation(modeleSituation, journal);

    const chargeurRessources = new ChargeurRessources();
    const contexteRessourcesCommunes = require.context('commun/assets', true, /\.svg$/);
    chargeurRessources.charge(contexteRessourcesCommunes);
    chargeurRessources.charge(contexte);

    const vueCadre = new VueCadre(vueSituation, modeleSituation, journal, chargeurRessources);
    vueCadre.affiche(pointInsertion, $);
  }

  initialiseInternationalisation().then(function () {
    jQuery(function () {
      document.title = traduction(`${nomSituation}.titre`);
      affiche('body', jQuery);
    });
  });
}
