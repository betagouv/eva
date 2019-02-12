import { VueContenuVrac } from './contenu_vrac.js';
import { VueContenuUnitaire } from './contenu_unitaire.js';

export class FabriqueVuesContenus {
  constructor (pointInsertion) {
    this.mapVues = new Map();
    this.mapVues.set('ContenantVrac', new VueContenuVrac(pointInsertion));
    this.mapVues.set('ContenantUnitaire', new VueContenuUnitaire(pointInsertion));
  }

  affiche (contenant) {
    this.mapVues.get(contenant.type).affiche(contenant);
  }
}
