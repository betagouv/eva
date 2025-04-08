import 'core-js/stable';
import queryString from 'query-string';
import { createApp } from 'vue';
import 'commun/styles/conteneur.scss';
import 'commun/styles/commun.scss';

import { creeStore } from 'accueil/modeles/store';
import Index from 'accueil/vues/index';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import RegistreEvenements from 'commun/infra/registre_evenements';
import RegistreCampagne from 'commun/infra/registre_campagne';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';
import { erreurVue } from 'commun/infra/report_erreurs';
import Synchronisateur from 'commun/infra/synchronisateur';

function afficheAccueil (pointInsertion) {
  const registreUtilisateur = new RegistreUtilisateur();
  const registreEvenements = new RegistreEvenements(registreUtilisateur);

  const synchronisateur = new Synchronisateur(registreUtilisateur, registreEvenements);
  if (navigator.onLine) { synchronisateur.recupereReseau(); }
  window.addEventListener('online', () => { synchronisateur.recupereReseau(); });

  const registreCampagne = new RegistreCampagne();

  const depotRessources = new DepotRessourcesAccueil();

  const parametresUrl = queryString.parse(location.search);
  if (parametresUrl.horsligne) {
    registreUtilisateur.enregistreModeHorsLigne(parametresUrl.horsligne === 'true');
  }

  const store = creeStore(registreUtilisateur, registreCampagne);
  console.log('--- configure le store ---');

  const app = createApp(Index);
  app.config.globalProperties.$depotRessources = depotRessources;
  app.config.globalProperties.$traduction = traduction;
  app.config.errorHandler = erreurVue;
  app.use(store);
  app.mount(pointInsertion);
}

initialiseInternationalisation().then(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.title = traduction('accueil.titre');
    const div = document.createElement('div');
    div.setAttribute('class', 'conteneur');
    document.body.insertBefore(div, document.body.firstChild);
    afficheAccueil(div);
  });
});
