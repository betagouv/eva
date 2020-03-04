import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import Vue from 'vue';
import { creeStore } from '../modeles/store';
import ActeObjetsTrouves from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActeObjetsTrouves, {}, {});
  }
}
