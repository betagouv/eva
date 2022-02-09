import listeTitresMusique from '../assets/liste_titres_musique.png';
import terrasseCafe from '../assets/terrasse_cafe.png';

const sousConsigne1 = {
  id: 'ALrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: terrasseCafe,
  nom_technique: 'sous_consigne_1',
  description: "Vous décidez d'écouter de la musique sur votre téléphone. Une amie vous a conseillé un groupe de jazz à découvrir."
};

const titre1 = {
  id: 'ALrd1',
  nom_technique: 'titre_1',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 1, quel est la bonne lecture ?',
  intitule: 'Dès que vous aurez reconnu la bonne lecture, choisissez  une de ces réponses en cliquant sur un des ronds. Pour confirmer votre réponse, cliquer sur Valider.',
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
  description: 'Titre 2 :',
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
  description: 'Titre 10 :',
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
  description: 'Titre 3 :',
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
  description: 'Titre 11 :',
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
  description: 'Titre 6 :',
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
  description: 'Titre 8 :',
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
  description: 'Titre 5 :',
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
  description: 'Titre 4 :',
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
  description: 'Titre 7 :',
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

const configurationNormale = {
  questions: [sousConsigne1, titre1, titre2, titre10, titre3, titre11, titre6, titre8, titre5, titre4, titre7]
};

export { configurationNormale };
