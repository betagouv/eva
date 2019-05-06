import { traduction } from 'commun/infra/internationalisation';

export function situations () {
  return [
    { nom: traduction('controle.titre'), chemin: 'controle.html' },
    { nom: traduction('inventaire.titre'), chemin: 'inventaire.html' },
    ...afficheSituationTri()
  ];

  function afficheSituationTri () {
    if (process.env.NODE_ENV !== 'production') {
      return [{ nom: traduction('tri.titre'), chemin: 'tri.html' }];
    }
    return [];
  }
}
