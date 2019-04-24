export default class ChargeurRessources {
  constructor () {
    this.images = {};
    this.promesses = [];
  }

  charge (contexte, identifiant) {
    contexte.keys().forEach((key) => {
      const img = new window.Image();
      const promesse = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      this.promesses.push(promesse);
      img.src = contexte(key);
      this.images[`${identifiant}/${key.substring(2)}`] = img;
    });
  }

  chargement () {
    return Promise.all(this.promesses);
  }

  image (nom) {
    const image = new window.Image();
    image.src = this.images[nom].src;
    return image;
  }
}
