import { Situation } from 'inventaire/modeles/situation.js';

class MagasinEnDevenir {
  constructor () {
    this.contenants = [];
    this.contenus = {};
  }

  avecCommeReferences (...desContenus) {
    desContenus.forEach(c => {
      this.contenus[c.idProduit] = { nom: c.nom, image: c.image };
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
    return new Situation(stock);
  }
}

export function unMagasin () {
  return new MagasinEnDevenir();
}

export function unMagasinVide () {
  return new MagasinEnDevenir().construit();
}
