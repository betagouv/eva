import $ from 'jquery';

import Situation, { ATTENTE_DEMARRAGE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE } from 'commun/modeles/situation';
import AdaptateurConsigne from 'commun/vues/adaptateur_consigne.js';
import MockAudioNode from '../aides/mock_audio_node';

describe("L'adaptateur de la vue Consigne", function () {
  let situation;
  let vue;

  beforeEach(() => {
    $('body').append('<div id="pointInsertion"></div>');
    situation = new Situation();
    situation.identifiant = 'accueil';
    const depotRessources = new class {
      casque () {
        return { src: 'chemin casque' };
      }

      consigneCommune () {
        return new MockAudioNode();
      }

      consigne () {
        return new MockAudioNode();
      }

      messageTransition () {
        return new MockAudioNode();
      }
    }();
    vue = new AdaptateurConsigne(situation, depotRessources);
  });

  it("affiche l'introduction si l'état de la situation est ATTENTE_DEMARRAGE", function () {
    situation.modifieEtat(ATTENTE_DEMARRAGE);
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-arrondi').text()).to.eql('accueil.intro_consigne.bouton');
  });

  it("affiche directement la consigne si l'état de la situation est ENTRAINEMENT_FINI", function () {
    situation.modifieEtat(ENTRAINEMENT_FINI);
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-arrondi').text()).to.eql('accueil.intro_contexte.bouton');
  });

  it("calcul l'état suivant", function () {
    vue.affiche('#pointInsertion', $);
    situation.etat = () => ATTENTE_DEMARRAGE;
    situation.entrainementDisponible = () => true;
    expect(vue.prochainEtat()).to.eql(ENTRAINEMENT_DEMARRE);

    situation.etat = () => ATTENTE_DEMARRAGE;
    situation.entrainementDisponible = () => false;
    expect(vue.prochainEtat()).to.eql(DEMARRE);

    situation.etat = () => ENTRAINEMENT_FINI;
    expect(vue.prochainEtat()).to.eql(DEMARRE);
  });
});
