export default class JoueurConsigne {
  constructor (depot, ressourceConsigne) {
    this.depot = depot;
    this.ressourceConsigne = ressourceConsigne;
  }

  joueSon (noeudSon, callbackFin) {
    noeudSon.start();
    setTimeout(callbackFin, noeudSon.buffer.duration * 1000);
  }

  joue (jouerConsigneCommune, lectureTerminee) {
    const joueConsigneCommune = () => {
      this.joueSon(this.depot.consigneCommune(), lectureTerminee);
    };
    this.joueSon(this.depot[this.ressourceConsigne](),
      jouerConsigneCommune ? joueConsigneCommune : lectureTerminee);
  }
}
