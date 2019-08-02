import Vue from 'vue';

import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import { creeStore } from '../modeles/store';
import AccesSituation from 'accueil/vues/acces_situation';
import VueProgression from 'accueil/vues/progression';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import { traduction } from 'commun/infra/internationalisation';

Vue.prototype.traduction = traduction;

export default class VueAccueil {
  constructor (accesSituations, registreUtilisateur, depotRessources) {
    this.accesSituations = accesSituations;
    this.registreUtilisateur = registreUtilisateur;
    this.depotRessources = depotRessources;
    Vue.prototype.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    const store = creeStore(this.registreUtilisateur);
    store.commit('metsAJourSituations', this.accesSituations.map((accesSituation) => {
      return {
        nom: accesSituation.nom,
        chemin: accesSituation.chemin,
        identifiant: accesSituation.identifiant,
        niveauMinimum: accesSituation.niveauMinimum
      };
    }));

    const $gabarit = $(`
      <div>
        <div class="titre">
          <h1>Compétences pro</h1>
        </div>
        <div style="background-image: url(${this.depotRessources.fondAccueil().src});"
             class="acces-situations">

          <div id="progression"></div>
          <div style="background-image: url(${this.depotRessources.personnages().src});"
               class="personnages"></div>

        </div>
      </div>
    `);
    const $accesSituations = $gabarit.find('.acces-situations');

    const progression = new VueProgression(this.depotRessources, this.registreUtilisateur);
    progression.affiche($gabarit.find('#progression'), $);

    store.state.situations.forEach((situation) => {
      const div = document.createElement('div');
      $accesSituations.append(div);
      new Vue({
        store,
        render: createEle => createEle(AccesSituation, {
          props: { situation }
        })
      }).$mount(div);
    });

    const div = document.createElement('div');
    $accesSituations.append(div);

    new Vue({
      store,
      render: createEle => createEle(FormulaireIdentification)
    }).$mount(div);

    const div2 = document.createElement('div');
    $gabarit.find('.titre').append(div2);

    new Vue({
      store,
      render: createEle => createEle(BoiteUtilisateur)
    }).$mount(div2);

    $(pointInsertion).append($gabarit);
  }
}
