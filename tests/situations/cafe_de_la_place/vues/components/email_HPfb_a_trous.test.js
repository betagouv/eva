import emailHPfb from 'cafe_de_la_place/vues/components/email_HPfb_a_trous.vue';
import emailPartie1 from 'cafe_de_la_place/vues/components/email_partie_1.vue';
import emailPartie2 from 'cafe_de_la_place/vues/components/email_partie_2.vue';
import { shallowMount } from '@vue/test-utils';

describe('Le composant Email HPfb à trous', function () {
  let wrapper;

  function composant(question) {
    return shallowMount(emailHPfb, {
      props: { question: question }
    });
  }

  describe("pour une question qui concerne la première partie de l'email", function () {
    beforeEach(function () {
      const question = { id: 'hpfb1', numero_page: 1 };
      wrapper = composant(question);
    });

    it("affiche l'email pas encore scrollé", function () {
      expect(wrapper.findComponent(emailPartie1).exists()).toBe(true);
      expect(wrapper.vm.topPositionScrollBar).toEqual('0rem');
      expect(wrapper.find('.zone-scroll__ascenseur').element.style.marginTop).toEqual('0rem');
    });
  });

  describe("pour une question qui concerne la deuxième partie de l'email", function () {
    beforeEach(function () {
      const question = { id: 'hpfb2', numero_page: 2 };
      wrapper = composant(question);
    });

    it("affiche l'email scrollé", function () {
      expect(wrapper.findComponent(emailPartie2).exists()).toBe(true);
      expect(wrapper.vm.topPositionScrollBar).toEqual('25.625rem');
      expect(wrapper.find('.zone-scroll__ascenseur').element.style.marginTop).toEqual('25.625rem');
    });
  });
});
