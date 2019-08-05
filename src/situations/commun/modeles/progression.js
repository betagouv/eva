export default class Progression {
  constructor (situationsDebloquees, situationsAccessibles) {
    this.situationsDebloquees = situationsDebloquees.filter((s) => situationsAccessibles.includes(s));
  }

  niveau () {
    return this.debloque() + 1;
  }

  debloque () {
    return this.situationsDebloquees.length;
  }
}
