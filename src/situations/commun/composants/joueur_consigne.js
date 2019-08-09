export default class JoueurConsigne {
  constructor (depot) {
    this.depot = depot;
  }

  joueSon (noeudSon, callbackFin) {
    noeudSon.start();
    setTimeout(callbackFin, noeudSon.buffer.duration * 1000);
  }

  joue (jouerConsigneCommune, lectureTerminee) {
    const joueConsigneCommune = () => {
      this.joueSon(this.depot.consigneCommune(), lectureTerminee);
    };
    this.joueSon(this.depot.consigne(),
      jouerConsigneCommune ? joueConsigneCommune : lectureTerminee);
  }
}
