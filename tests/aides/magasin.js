import { creeMagasin } from '../../src/modeles/magasin.js';

class MagasinEnDevenir {
  constructor () {
    this.contenants = [];
  }

  avecEnStock (...desContenants) {
    desContenants.forEach((c) => {
      this.contenants.push(c);
    });
    return this;
  }

  construit () {
    let stock = { contenants: this.contenants };
    return creeMagasin(stock);
  }
}

export function unMagasin () {
  return new MagasinEnDevenir();
}

export function desContenantsUnitaires (nom, quantite) {
  return { nom: nom, type: 'ContenantUnitaire', quantite: quantite };
}

export function desContenantsVrac (nom, quantite) {
  return { nom: nom, type: 'ContenantVrac', quantite: quantite };
}
