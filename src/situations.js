import { traduction } from 'commun/infra/internationalisation';

export function situations () {
  return [
    { nom: traduction('controle.titre'), chemin: 'controle.html' },
    { nom: traduction('inventaire.titre'), chemin: 'inventaire.html' }
  ];
}
