import { traduction } from 'commun/infra/internationalisation';
import AccesSituation from 'accueil/modeles/acces_situation';

export const IDENTIFIANT_SITUATION_QUESTIONS = 'questions';

export function accesSituations () {
  return [
    new AccesSituation({ nom: traduction('tri.titre'), chemin: 'tri.html', identifiant: 'tri', niveauMinimum: 1 }),
    new AccesSituation({ nom: traduction('controle.titre'), chemin: 'controle.html', identifiant: 'controle', niveauMinimum: 2 }),
    new AccesSituation({ nom: traduction('inventaire.titre'), chemin: 'inventaire.html', identifiant: 'inventaire', niveauMinimum: 3 }),
    new AccesSituation({ nom: traduction('question.titre'), chemin: 'questions.html', identifiant: 'question', niveauMinimum: 4 })
  ];
}
