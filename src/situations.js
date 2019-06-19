import { traduction } from 'commun/infra/internationalisation';

export function situations () {
  return [
    { nom: traduction('tri.titre'), chemin: 'tri.html', identifiant: 'tri' },
    { nom: traduction('controle.titre'), chemin: 'controle.html', identifiant: 'controle' },
    { nom: traduction('inventaire.titre'), chemin: 'inventaire.html', identifiant: 'inventaire' }
  ];
}
