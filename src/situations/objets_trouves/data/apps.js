const question1 = {
  id: 1,
  choix: [
    {
      id: '1',
      intitule: '1'
    }
  ]
};

const question2 = {
  id: 2,
  choix: [
    {
      id: '2',
      intitule: '2'
    }
  ]
};

const configurationEntrainement = { };
const configurationNormale = {
  apps: {
    photos: question1,
    repondeur: question1,
    rappels: question1,
    agenda: question1,
    messages: question2
  },
  questionsFin: [question1, question2]
};

export { configurationEntrainement, configurationNormale };
