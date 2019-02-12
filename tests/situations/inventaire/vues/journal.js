import { VueJournal } from 'inventaire/vues/journal.js';
import jsdom from 'jsdom-global';

describe('vue journal', function () {
  let vue;
  let journal;

  beforeEach(function () {
    jsdom('<div id="restitution"></div>');
    journal = {
      evenements: () => {
        return [ 'ligne1', 'ligne2' ];
      }
    };
    vue = new VueJournal('#restitution', journal);
  });

  it('initialise une zone de texte', function () {
    let pointInsertion = document.getElementById('restitution');
    expect(pointInsertion.firstChild.id).to.equal('journal');
  });

  it('affiche le contenu du journal dans la zone de texte', function () {
    vue.affiche();

    expect(document.getElementById('journal').textContent).to.equal('"ligne1"\n"ligne2"');
  });
});
