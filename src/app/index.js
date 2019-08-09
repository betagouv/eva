import Vue from 'vue';
import 'commun/styles/conteneur.scss';
import 'commun/styles/commun.scss';

import { creeStore } from 'accueil/modeles/store';
import Accueil from 'accueil/vues/accueil';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';
import 'commun/infra/report_erreurs';

function afficheAccueil (pointInsertion) {
  const registreUtilisateur = new RegistreUtilisateur();

  const depotRessources = new DepotRessourcesAccueil();

  Vue.prototype.depotRessources = depotRessources;
  Vue.prototype.traduction = traduction;

  const store = creeStore(registreUtilisateur);

  depotRessources.chargement().then(() => {
    new Vue({
      store,
      render: createEle => createEle(Accueil)
    }).$mount(pointInsertion);
  });
}

initialiseInternationalisation().then(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.title = traduction('accueil.titre');
    const div = document.createElement('div');
    div.setAttribute('class', 'conteneur');
    document.body.appendChild(div);
    afficheAccueil(div);
  });
});
