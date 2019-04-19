export default class DepotRessources {
  constructor () {
    this.images = {};
  }

  charge (contexte, identifiant) {
    contexte.keys().forEach((key) => {
      const img = new window.Image();
      img.src = contexte(key);
      this.images[`${identifiant}/${key.substring(2)}`] = img;
    });
  }

  image (nom) {
    const image = new window.Image();
    image.src = this.images[nom].src;
    return image;
  }
}
