import { shallowMount, createLocalVue } from '@vue/test-utils';
import VideoQuestion from 'commun/vues/video_question';

describe('Le composant vidéo question', function () {
  let vue;
  let localVue;
  let mockCreateObjectURL;
  let mockRevokeObjectURL;
  const binaire = "binaire de la vidéo";

  beforeEach(function () {
    mockCreateObjectURL = jest.fn();
    mockRevokeObjectURL = jest.fn();
    localVue = createLocalVue();
    window.URL = {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL
    };
  });

  function composant (props) {
    return shallowMount(VideoQuestion, { localVue, propsData: props });
  }

  describe('quand il existe une vidéo', function() {
    const createdObjectURL = "un object url";

    beforeEach(function () {
      localVue.prototype.$depotRessources = {
        existeMessageVideo: () =>  { return true; },
        messageVideo: (nomTechnique) => {
          expect(nomTechnique).toEqual('un-nom');
          return binaire;
        }
      };
      mockCreateObjectURL.mockReturnValueOnce(createdObjectURL);
      vue = composant({ nomTechnique: 'un-nom' });
    });

    it("affiche une video lorsqu'il en existe une", function () {
      const video = vue.findAll('video');
      expect(video.length).toBe(1);
      expect(video.at(0).classes('question-video')).toBe(true);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(binaire);
    });

    it("revoque l'objet url à la destruction", function() {
      vue.destroy();
      expect(mockRevokeObjectURL).toHaveBeenCalledWith(createdObjectURL);
    });

    it("n'affiche pas la vidéo sur mobile", function () {
      vue.vm.estMobile = true;
      expect(vue.vm.afficheVideo).toBe(false);
    });
  });

  it("n'affiche pas de video s'il n'y en a pas", function () {
    localVue.prototype.$depotRessources = { existeMessageVideo: () =>  { return false; } };
    vue = composant({ nomTechnique: 'un-nom' });
    expect(vue.vm.afficheVideo).toEqual(false);
    const video = vue.findAll('video');
    expect(video.length).toBe(0);
  });
});
