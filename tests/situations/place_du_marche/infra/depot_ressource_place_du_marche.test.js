import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesPlaceDuMarche from 'place_du_marche/infra/depot_ressources_place_du_marche';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

describe('Le dépot ressource de la situation Place du marché', function () {
  it('étend DépotRessourcesCommune', function () {
    const depot = new DepotRessourcesPlaceDuMarche(chargeurs());
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });

  describe("#consigneDemarrage", function() {
    let depot;
    let messagesAudios;
    let sonConsigne;
    let consigneEnCours;

    beforeEach(function() {
      messagesAudios = { consigneEnCours: 'N1Prn1_consigne.mp3' };
      sonConsigne = 'consigne_place_du_marche.mp3';
      depot = new DepotRessourcesPlaceDuMarche(chargeurs());
      depot.messagesAudios = messagesAudios;
      depot.sonConsigne = sonConsigne;
      depot.ressource = jest.fn((src) => src);
    });

    it("retourne la consigne audio d'une consgine s'il y en a une", function() {
      depot.consigneEnCours = consigneEnCours;
      depot.existeMessageAudio = jest.fn(() => true);
      expect(depot.consigneDemarrage()).toEqual(messagesAudios[0]);
    });

    it("retourne la consigne audio du démarrage par défaut", function() {
      depot.existeMessageAudio = jest.fn(() => false);
      expect(depot.consigneDemarrage()).toEqual(sonConsigne);
    });
  });

  describe("#zoneDepot", function() {
    let depot;
    let nomTechnique;
    let SVGs;

    beforeEach(function() {
      nomTechnique = 'N1Prn1';
      SVGs = { N1Prn1_zone_depot: document.createElementNS('http://www.w3.org/2000/svg', 'svg') };
      depot = new DepotRessourcesPlaceDuMarche(chargeurs());
      depot.SVGs = SVGs;
      depot.ressource = jest.fn((src) => src);
    });

    it("quand le svg existe, retourne l'Element SVG", function() {
      depot.existeSvg = jest.fn(() => true);
      expect(depot.zoneDepot(nomTechnique)).toEqual(SVGs["N1Prn1_zone_depot"]);
    });

    it("quand le svg n'existe pas, retourne null", function() {
      depot.existeSvg = jest.fn(() => false);
      expect(depot.zoneDepot(nomTechnique)).toEqual(undefined);
    });
  });
});
