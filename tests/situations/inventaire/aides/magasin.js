import { Situation } from 'inventaire/modeles/situation';

class MagasinEnDevenir {
  constructor () {
    this.contenants = [];
    this.contenus = {};
  }

  avecCommeReferences (...desContenus) {
    desContenus.forEach(c => {
      this.contenus[c.idProduit] = { nom: c.nom, image: c.image, forme: c.forme, position: c.position };
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
    return new Situation(stock,
      { consigne: 'chemin_son_consigne',
        reussite: 'chemin_son_reussite',
        echec: 'chemin_son_echec' });
  }
}

export function unMagasin () {
  return new MagasinEnDevenir();
}

export function unMagasinVide () {
  return new MagasinEnDevenir().construit();
}
