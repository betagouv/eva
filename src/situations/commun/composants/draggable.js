import Draggable from 'vuedraggable';

// override la configuration par défaut de compatConfig dans webpack
// force vue 3 pour retourner le composant draggable
// l'objectif est de supprimer cette configuration une fois le compatibility build désinstallé
export default function configureDraggable() {
  Draggable.compatConfig = { MODE: 3 };
}
