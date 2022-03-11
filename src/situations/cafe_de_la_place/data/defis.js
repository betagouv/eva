import listeTitresMusique from '../assets/liste_titres_musique.png';
import telephoneSansTitres from '../assets/telephone_sans_titres.png';
import terrasseCafe from '../assets/terrasse_cafe.png';
import magazine from '../assets/magazine.png';
import magazineSansTexte from '../assets/magazine_sans_texte.png';

const sousConsigneALrd1 = {
  id: 'ALrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: terrasseCafe,
  nom_technique: 'sous_consigne_ALrd_1',
  description: "Vous décidez d'écouter de la musique sur votre téléphone. Une amie vous a conseillé un groupe de jazz à découvrir."
};

const sousConsigneALrd2 = {
  id: 'ALrd-sous-consigne-2',
  type: 'sous-consigne',
  illustration: listeTitresMusique,
  nom_technique: 'sous_consigne_ALrd_2',
  description: "Voici la liste des titres. J'ai quelques questions pour vous.",
  intitule:  'Faites-moi signe en cliquant sur « Suivant » lorsque vous voulez vous lancer !'
};

const sousConsigneACrd1 = {
  id: 'ACrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: magazine,
  nom_technique: 'sous_consigne_ACrd_1',
  description: 'Dans le magazine, il y a une présentation de ce disque. Je vais maintenant vous poser des questions sur ce texte. Prenez connaissance du texte.',
  intitule: 'Pour commencer à répondre aux questions, cliquez sur “Suivant”.'
};

const titre1 = {
  id: 'ALrd1',
  nom_technique: 'titre_1',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 1, quelle est la bonne lecture ?',
  intitule: 'Dès que vous aurez reconnu la bonne lecture, choisissez une des réponses ci-dessous. Pour confirmer votre réponse, cliquez sur Valider.',
  choix: [
    {
      id: 'bax',
      nom_technique: 'bax',
      bonneReponse: false
    },
    {
      id: 'masse',
      nom_technique: 'masse',
      bonneReponse: false
    },
    {
      id: 'max',
      nom_technique: 'max',
      bonneReponse: true
    }
  ]
};

const titre2 = {
  id: 'ALrd2',
  nom_technique: 'titre_2',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 2, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'jazzABimoudon',
      nom_technique: 'jazz_a_bimoudon',
      bonneReponse: false
    },
    {
      id: 'jazzADimoudon',
      nom_technique: 'jazz_a_dimoudon',
      bonneReponse: true
    },
    {
      id: 'jazzADiboudon',
      nom_technique: 'jazz_a_diboudon',
      bonneReponse: false
    }
  ]
};

const titre10 = {
  id: 'ALrd3',
  nom_technique: 'titre_10',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 10, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'unAmiEnAmont',
      nom_technique: 'un_ami_en_amont',
      bonneReponse: false
    },
    {
      id: 'unAmiAmant',
      nom_technique: 'un_ami_amant',
      bonneReponse: false
    },
    {
      id: 'unAmiUnAmant',
      nom_technique: 'un_ami_un_amant',
      bonneReponse: true
    }
  ]
};

const titre3 = {
  id: 'ALrd4',
  nom_technique: 'titre_3',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 3, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'balleEtTalle',
      nom_technique: 'balle_et_talle',
      bonneReponse: false
    },
    {
      id: 'pailleEtDaille',
      nom_technique: 'paille_et_daille',
      bonneReponse: false
    },
    {
      id: 'bailleEtTaille',
      nom_technique: 'baille_et_taille',
      bonneReponse: true
    }
  ]
};

const titre11 = {
  id: 'ALrd5',
  nom_technique: 'titre_11',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 11, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'dussoEtMatura',
      nom_technique: 'dusso_et_matura',
      bonneReponse: false
    },
    {
      id: 'duxoEtMatura',
      nom_technique: 'duxo_et_matura',
      bonneReponse: true
    },
    {
      id: 'duxoEtMadura',
      nom_technique: 'duxo_et_madura',
      bonneReponse: false
    }
  ]
};

const titre6 = {
  id: 'ALrd6',
  nom_technique: 'titre_6',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 6, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'amourSugulent',
      nom_technique: 'amour_sugulent',
      bonneReponse: false
    },
    {
      id: 'amourSucculent',
      nom_technique: 'amour_succulent',
      bonneReponse: true
    },
    {
      id: 'amourSuccule',
      nom_technique: 'amour_succule',
      bonneReponse: false
    }
  ]
};

const titre8 = {
  id: 'ALrd7',
  nom_technique: 'titre_8',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 8, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'anguilEtDouceMer',
      nom_technique: 'anguil_et_douce_mer',
      bonneReponse: false
    },
    {
      id: 'anquilleEtDouceMer',
      nom_technique: 'anquille_et_douce_mer',
      bonneReponse: false
    },
    {
      id: 'anguilleEtDouceMer',
      nom_technique: 'anguille_et_douce_mer',
      bonneReponse: true
    }
  ]
};

const titre5 = {
  id: 'ALrd8',
  nom_technique: 'titre_5',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 5, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'exerciceDeStyle',
      nom_technique: 'exercice_de_style',
      bonneReponse: true
    },
    {
      id: 'ezerciceDeStyle',
      nom_technique: 'ezercice_de_style',
      bonneReponse: false
    },
    {
      id: 'esserciceDeStyle',
      nom_technique: 'essercice_de_style',
      bonneReponse: false
    }
  ]
};

const titre4 = {
  id: 'ALrd9',
  nom_technique: 'titre_4',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 4, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'leVilDuTemps',
      nom_technique: 'le_vil_du_temps',
      bonneReponse: false
    },
    {
      id: 'leFilsDuTemps',
      nom_technique: 'le_fils_du_temps',
      bonneReponse: false
    },
    {
      id: 'leFilDuTemps',
      nom_technique: 'le_fil_du_temps',
      bonneReponse: true
    }
  ]
};

const titre7 = {
  id: 'ALrd10',
  nom_technique: 'titre_7',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 7, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'soupconDAmertume',
      nom_technique: 'soupcon_d_amertume',
      bonneReponse: true
    },
    {
      id: 'souponDAmertume',
      nom_technique: 'soupon_d_amertume',
      bonneReponse: false
    },
    {
      id: 'soupconDAbertube',
      nom_technique: 'soupcon_d_abertube',
      bonneReponse: false
    }
  ]
};

const alrd11 = {
  id: 'ALrd11',
  nom_technique: 'alrd_11',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Exercice',
    nom_technique: 'exercice'
  }
};

const alrd12 = {
  id: 'ALrd12',
  nom_technique: 'alrd_12',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Anguille',
    nom_technique: 'anguille'
  }
};

const alrd13 = {
  id: 'ALrd13',
  nom_technique: 'alrd_13',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Dimoudon',
    nom_technique: 'dimoudon'
  }
};

const alrd14 = {
  id: 'ALrd14',
  nom_technique: 'alrd_14',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Soupçon',
    nom_technique: 'soupcon'
  }
};

const ACrd1 = {
  id: 'ACrd1',
  nom_technique: 'acrd_1',
  description: 'Comment s’appelle le groupe ?',
  illustration: magazineSansTexte,
  intitule: 'Pour répondre aux questions, cliquez sur la réponse directement dans le texte. Quand vous avez fait votre choix, cliquez sur “Valider”.'
};

const listeChansons = `* [Max]()
* [Jazz]() à [Dimoudon]()
* [Baille]() et [taille]()
* Le [fil]() du [temps]()
* [Exercice]() de [style]()
* [Amour]() [succulent]()
* [Soupçon]() d'[amertume]()
* [Anguille]() et [douce]() [mer]()
* [Sourire]() [toujours]()
* Un [ami](), un [amant]()
* [Duxo]() et [matura]()
`;

const configurationNormale = {
  chapitreALrd: {
    texteCliquable: listeChansons,
    sousConsignes: [ sousConsigneALrd1, sousConsigneALrd2 ],
    questions: [ titre1, titre2, titre10, titre3, titre11, titre6, titre8, titre5, titre4, titre7, alrd11, alrd12, alrd13, alrd14 ]
  },
  chapitreACrd: {
    sousConsignes: [ sousConsigneACrd1 ],
    questions: [ ACrd1 ]
  }
};

export { configurationNormale };
