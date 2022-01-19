import chargeurs from '../aides/mock_chargeurs';
import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

describe('Le dépot de ressources communes', function () {
  let depot;
  let sonConsigneDemarrage;
  let sonConsigneTransition;
  let sonAudioQuestion1;
  let sonsCharges;

  beforeEach(function () {
    sonConsigneDemarrage = 'consigneDemarrage.mp3';
    sonConsigneTransition = 'consigneTransition.mp3';
    sonAudioQuestion1 = 'sonQuestion1.mp3';
    sonsCharges = [];
    const _chargeurs = chargeurs({
      mp3: (_son) => {
        sonsCharges.push(_son);
        return Promise.resolve(() => _son);
      }
    });
    depot = new DepotRessourcesCommunes(_chargeurs, { audioQuestion1: sonAudioQuestion1 }, sonConsigneDemarrage, sonConsigneTransition);
  });

  it('étend DépotRessources', function () {
    expect(depot).toBeInstanceOf(DepotRessources);
  });

  it('charge la consigne de demarrage', function () {
    expect(sonsCharges).toContain(sonConsigneDemarrage);
  });

  it('charge la consigne de transition', function () {
    expect(sonsCharges).toContain(sonConsigneTransition);
  });

  it('retourne la consigne prechargée', function () {
    return depot.chargement().then(() => {
      expect(depot.consigneDemarrage()).toEqual(sonConsigneDemarrage);
    });
  });

  describe('peut gérer des messages audios', function () {
    it('charge les messages audio', function () {
      expect(sonsCharges).toContain(sonAudioQuestion1);
    });

    it('retourne un message audio préchargé', function () {
      return depot.chargement().then(() => {
        expect(depot.messageAudio('audioQuestion1')).toEqual(sonAudioQuestion1);
      });
    });

    it('retourne si un message audio existe ou pas', function () {
      expect(depot.existeMessageAudio('audioQuestion1')).toBe(true);
      expect(depot.existeMessageAudio('inconnu')).toBe(false);
    });
  });
});
