import chargeurs from '../aides/mock_chargeurs';
import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

const questionsServeur = [
  { id: 1, nom_technique: 'N1Prn1', choix: [{ type_choix: 'bon' }] },
  { id: 1, nom_technique: 'N1Prn2', type: 'clic-dans-image' },
  { id: 1, nom_technique: 'N1Prn1', type: 'glisser-deposer' }
];

jest.mock('commun/infra/registre_campagne', () => {
  return jest.fn().mockImplementation(() => {
    return {
      questions: jest.fn().mockReturnValue(questionsServeur)
    };
  });
});

describe('Le dépot de ressources communes', function () {
  const imgFondConsigne = 'fondConsigne.png';
  const sonConsigneDemarrage = 'consigneDemarrage.mp3';
  const sonConsigneTransition = 'consigneTransition.mp3';
  const sonAudioQuestion1 = 'sonQuestion1.mp3';
  const videoQuestion1 = 'videoQuestion1.mp4';
  let depot;
  let sonsCharges;
  let imgCharges;
  let videosCharges;

  beforeEach(function () {
    sonsCharges = [];
    imgCharges = [];
    videosCharges = [];
    const _chargeurs = chargeurs({
      mp3: (_son) => {
        sonsCharges.push(_son);
        return Promise.resolve(() => _son);
      },
      png: (_img) => {
        imgCharges.push(_img);
        return Promise.resolve(() => _img);
      },
      mp4: (_video) => {
        videosCharges.push(_video);
        return Promise.resolve(() => _video);
      }
    });
    depot = new DepotRessourcesCommunes(_chargeurs, { videoQuestion1: videoQuestion1 }, { audioQuestion1: sonAudioQuestion1 }, imgFondConsigne, sonConsigneDemarrage, sonConsigneTransition);
  });

  it('étend DépotRessources', function () {
    expect(depot).toBeInstanceOf(DepotRessources);
  });

  describe('peut gérer une image de fond pour la consigne', function () {
    it('charge le fond de la consigne', function () {
      expect(imgCharges).toContain(imgFondConsigne);
    });

    it("retourne si l'image de fond de la consigne existe ou pas", function () {
      expect(depot.existeFondConsigne()).toBe(true);
      depot = new DepotRessourcesCommunes(chargeurs({}), {}, {}, null, sonConsigneDemarrage);

      expect(depot.existeFondConsigne()).toBe(false);
    });
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

  describe('peut gérer des videos', function () {
    it('charge les messages videos', function () {
      expect(videosCharges).toContain(videoQuestion1);
    });

    it('retourne un message video préchargé', function () {
      return depot.chargement().then(() => {
        expect(depot.messageVideo('videoQuestion1')).toEqual(videoQuestion1);
      });
    });

    it('retourne si un message video existe ou pas', function () {
      expect(depot.existeMessageVideo('videoQuestion1')).toBe(true);
      expect(depot.existeMessageVideo('inconnu')).toBe(false);
    });
  });

  describe('charge les ressources visuelles', function () {
    it('#trouveIllustrations', function () {
      expect(depot.trouveIllustrations({})).toEqual([]);
      expect(depot.trouveIllustrations({illustration: 'cheming.png', icone: 'icone.png'})).toEqual(['cheming.png', 'icone.png']);
      expect(depot.trouveIllustrations([{illustration: 'cheming.png'}])).toEqual(['cheming.png']);
      expect(depot.trouveIllustrations({chapitre: {illustration: 'cheming.png'}})).toEqual(['cheming.png']);
      expect(depot.trouveIllustrations(['une liste de string', 'autre string'])).toEqual([]);
    });

    it("#chargeIllustrationsConfigurations", function () {
      depot.chargeIllustrationsConfigurations([{
        appsAccueilVerrouille: {
          deverouillage: [{ illustration: 'chemin_illustration_deverouillage.png', icone: 'chemin_icone_deverrouillage.png' }]
        },
        apps: {
          agenda: [{ illustration: 'chemin_illustration.png', icone: 'chemin_icone.png' }]
        }
      }, {illustration: 'chemin.png'}]);

      return depot.chargement().then(function () {
        expect(depot.ressource('chemin_illustration.png')).toBeDefined();
        expect(depot.ressource('chemin.png')).toBeDefined();
        expect(depot.ressource('chemin_icone.png')).toBeDefined();
        expect(depot.ressource('chemin_illustration_deverouillage.png')).toBeDefined();
        expect(depot.ressource('chemin_icone_deverrouillage.png')).toBeDefined();
      });
    });
  });


  describe('#questions', function() {
    let result;

    beforeEach(function() {
      result = depot.questions();
    });

    it('retourne les questions du serveur', function() {
      expect(result).toEqual(questionsServeur);
    });

    it("definie l'extension vue pour le type clic dans image", function() {
      expect(result[1]['extensionVue']).toEqual('clic-dans-image' );
    });


    it("definie l'extension vue pour le type glisser déposer", function() {
      expect(result[2].extensionVue).toEqual('glisser-deposer' );
    });
  });
});
