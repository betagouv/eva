import { shallowMount } from '@vue/test-utils';
import Pagination from 'commun/vues/components/pagination';

describe('Le composant pagination', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(Pagination, {
      propsData: {
        indexQuestion: 0,
        nombreQuestions: 3
      }
    });
  });

  it.only('affiche la pagination', function () {
    const pagination = wrapper.find('.question-pagination');
    expect(pagination.exists()).toBe(true);
    expect(pagination.text()).toBe('1/3');
  });
});
