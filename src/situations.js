import { traduit } from 'commun/infra/internationalisation';

export function situations () {
  return [
    { nom: traduit('controle.titre'), chemin: 'controle.html' },
    { nom: traduit('inventaire.titre'), chemin: 'inventaire.html' }
  ];
}
