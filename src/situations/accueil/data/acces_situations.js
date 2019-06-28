import { traduction } from 'commun/infra/internationalisation';
import AccesSituation from 'accueil/modeles/acces_situation';

export function accesSituations () {
  return [
    new AccesSituation({ nom: traduction('tri.titre'), chemin: 'tri.html', identifiant: 'tri', niveauMinimum: 1 }),
    new AccesSituation({ nom: traduction('controle.titre'), chemin: 'controle.html', identifiant: 'controle', niveauMinimum: 2 }),
    new AccesSituation({ nom: traduction('inventaire.titre'), chemin: 'inventaire.html', identifiant: 'inventaire', niveauMinimum: 3 })
  ];
}
