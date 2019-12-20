import {
  ACTIVATION_AIDE,
  CHANGEMENT_ETAT
} from 'commun/modeles/situation';

export function synchroniseStoreEtModeleSituation (situation, store) {
  situation.on(CHANGEMENT_ETAT, (etat) => {
    store.commit('modifieEtat', etat);
  });
  situation.on(ACTIVATION_AIDE, () => {
    store.commit('activeAide');
  });
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'modifieEtat':
        situation.modifieEtat(mutation.payload);
        break;
      case 'activeAide':
        if (situation.aideActivee) {
          return;
        }
        situation.activeAide();
        break;
    }
  });
  store.commit('modifieEtat', situation.etat());
}
