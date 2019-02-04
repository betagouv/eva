import { creeMagasin } from '../../src/modeles/magasin.js';

class MagasinEnDevenir {
  constructor () {
    this.contenants = [];
    this.contenus = {};
  }

  avecCommeReferences (...desContenus) {
    desContenus.forEach(c => {
      this.contenus[c.idProduit] = { nom: c.nom };
    });
    return this;
  }

  avecEnStock (...desContenants) {
    desContenants.forEach((c) => {
      this.contenants.push(c);
    });
    return this;
  }

  construit () {
    let stock = { contenants: this.contenants, contenus: this.contenus };
    return creeMagasin(stock);
  }
}

export function unMagasin () {
  return new MagasinEnDevenir();
}

export function unMagasinVide () {
  return new MagasinEnDevenir().construit();
}
