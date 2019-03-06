import uuidv4 from 'uuid/v4';

import { DepotJournal } from 'inventaire/infra/depot_journal.js';
import { Journal } from 'inventaire/modeles/journal.js';
import { VueJournal } from 'inventaire/vues/journal.js';

jQuery(function () {
  document.title = 'Restitution';
  jQuery('body').append(`
    <div id="restitution">
      <h1>Restitution de la mise en situation</h1>
    </div>
    `);

  const journal = new Journal(Date.now, uuidv4(), new DepotJournal());
  const vue = new VueJournal('#restitution', journal);
  vue.affiche();
});
