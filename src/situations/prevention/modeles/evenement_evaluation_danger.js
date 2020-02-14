import Evenement from 'commun/modeles/evenement';

export default class EvenementEvaluationDanger extends Evenement {
  constructor (donnees = {}) {
    super('evaluationDanger', donnees);
  }
}
