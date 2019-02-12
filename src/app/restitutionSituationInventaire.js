import { DepotJournal } from 'inventaire/infra/depot_journal.js';
import { Journal } from 'inventaire/modeles/journal.js';
import { VueJournal } from 'inventaire/vues/journal.js';

jQuery(function () {
  jQuery('body').append(`
    <div id="restitution">
      <h1>Restitution de la mise en situation</h1>
    </div>
    `);
  let journal = new Journal(Date.now, new DepotJournal());
  let vue = new VueJournal('#restitution', journal);
  vue.affiche();
});
