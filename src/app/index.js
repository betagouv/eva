import Vue from 'vue';
import 'accueil/styles/app.scss';

import { accesSituations } from 'accueil/data/acces_situations';
import { creeStore } from 'accueil/modeles/store';
import Accueil from 'accueil/vues/accueil';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';
import 'commun/infra/report_erreurs';

function afficheAccueil (pointInsertion) {
  const _accesSituations = accesSituations();
  const identifiantsSituationsAccessibles = _accesSituations.map((acces) => acces.identifiant);
  const registreUtilisateur = new RegistreUtilisateur(identifiantsSituationsAccessibles);

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
