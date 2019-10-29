import DepotRessources from 'commun/infra/depot_ressources';
import fondAccueil from 'accueil/assets/fond-accueil.jpg';
import casque from 'commun/assets/casque.svg';
import personnage from 'accueil/assets/personnage.png';
import bienvenue from 'accueil/assets/bienvenue.png';
import tri from 'accueil/assets/tri.png';
import inventaire from 'accueil/assets/inventaire.png';
import controle from 'accueil/assets/controle.png';
import questions from 'accueil/assets/bureau.png';
import securite from 'accueil/assets/securite.png';
import fin from 'accueil/assets/fin.png';
import precedent from 'accueil/assets/precedent.svg';
import suivant from 'accueil/assets/suivant.svg';
import punaise from 'accueil/assets/punaise.svg';
import rapidite from 'accueil/assets/rapidite.svg';
import comparaisonTri from 'accueil/assets/comparaison_tri.svg';
import vigilanceControle from 'accueil/assets/vigilance_controle.svg';
import organisationMethode from 'accueil/assets/organisation_methode.svg';
import attentionConcentration from 'accueil/assets/attention_concentration.svg';
import consigneAccueil from 'accueil/assets/consigne_accueil.wav';
import consigneCommune from 'commun/assets/consigne_commune.wav';

const batiments = {
  bienvenue,
  controle,
  fin,
  inventaire,
  questions,
  securite,
  tri
};

const competences = {
  rapidite: rapidite,
  comparaison_tri: comparaisonTri,
  vigilance_controle: vigilanceControle,
  organisation_methode: organisationMethode,
  attention_concentration: attentionConcentration
};

export default class DepotRessourcesAccueil extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([fondAccueil, personnage, precedent, suivant, punaise, casque, consigneAccueil, consigneCommune]);
    this.charge(Object.values(batiments));
    this.charge(Object.values(competences));
  }

  pictoCompetences (competenceForte) {
    return this.ressource(competences[competenceForte]);
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  personnage () {
    return this.ressource(personnage);
  }

  precedent () {
    return this.ressource(precedent);
  }

  suivant () {
    return this.ressource(suivant);
  }

  punaise () {
    return this.ressource(punaise);
  }

  casque () {
    return this.ressource(casque);
  }

  batimentSituation (situation) {
    return this.ressource(batiments[situation]);
  }

  consigneDemarrage () {
    return this.ressource(consigneAccueil);
  }

  consigneCommune () {
    return this.ressource(consigneCommune);
  }
}
