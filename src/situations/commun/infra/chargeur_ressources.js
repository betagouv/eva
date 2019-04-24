export default class ChargeurRessources {
  constructor () {
    this.promesses = [];
  }

  charge (contexte) {
    contexte.keys().forEach((key) => {
      const img = new window.Image();
      const promesse = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      this.promesses.push(promesse);
      img.src = contexte(key);
    });
  }

  chargement () {
    return Promise.all(this.promesses);
  }
}
