import '../styles/app.scss';

import { afficheMagasin } from './init.js';

jQuery(function () {
  jQuery('body').append(`
    <div id="magasin">
      <h1>Stock de boissons</h1>
    </div>
    `);
  afficheMagasin('#magasin', jQuery);
});
