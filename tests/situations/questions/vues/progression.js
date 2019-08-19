import $ from 'jquery';
import VueProgression from 'questions/vues/progression';

describe('La vue de la progression des questions du bureau', function () {
  let situation;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    situation = {
      numeroQuestionCourante () {
        return 1;
      },

      nombreQuestions () {
        return 2;
      }
    };
  });

  it('affiche le numero de la question courante et le nombre total de question', function () {
    const vue = new VueProgression(situation);
    vue.affiche('#point-insertion', $);

    expect($('.progression-question').text()).to.equal('1/2');
  });
});
