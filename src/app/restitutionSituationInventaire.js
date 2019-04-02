import uuidv4 from 'uuid/v4';

import { DepotJournal } from 'commun/infra/depot_journal';
import { Journal } from 'commun/modeles/journal';
import { VueJournal } from 'inventaire/vues/journal';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('restitution_inventaire.titre');
    jQuery('body').append(`
      <div id="restitution">
        <h1>${traduction('restitution_inventaire.titre')}</h1>
      </div>
    `);

    const journal = new Journal(Date.now, uuidv4(), 'inventaire', new DepotJournal());
    const vue = new VueJournal('#restitution', journal);
    vue.affiche();
  });
});
