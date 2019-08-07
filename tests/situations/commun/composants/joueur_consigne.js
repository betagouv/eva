import joueConsigne from 'commun/composants/joueur_consigne';

import MockAudioNode from '../aides/mock_audio_node';

describe('joueur de consigne', function () {
  let uneConsigne;
  let uneConsigneCommune;
  let depot;

  beforeEach(function () {
    uneConsigne = new MockAudioNode();
    uneConsigneCommune = new MockAudioNode();
    depot = {
      consigne: () => uneConsigne,
      consigneCommune: () => uneConsigneCommune
    };
  });

  it('joue la consigne du dépôt', function (done) {
    uneConsigne.start = done;
    joueConsigne(depot, false, () => {});
  });

  it('appelle la callback de fin après la lecture de la consigne', function (done) {
    let consigneJouee = false;
    uneConsigne.start = () => { consigneJouee = true; };
    joueConsigne(depot, false, () => {
      expect(consigneJouee).to.be(true);
      done();
    });
  });

  it('joue la consigne commune après la consigne à la demande', function (done) {
    let consigneJouee = false;
    let consigneCommuneJouee = false;
    uneConsigne.start = () => { consigneJouee = true; };
    uneConsigneCommune.start = () => {
      expect(consigneJouee).to.be(true);
      consigneCommuneJouee = true;
    };
    joueConsigne(depot, true, () => {
      expect(consigneCommuneJouee).to.be(true);
      done();
    });
  });

  it("ne joue pas la consigne commune si ce n'est pas demandé", function (done) {
    let consigneCommuneJouee = false;
    uneConsigneCommune.start = () => {
      consigneCommuneJouee = true;
    };
    joueConsigne(depot, false, () => {
      expect(consigneCommuneJouee).to.be(false);
      done();
    });
  });
});
