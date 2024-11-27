import journalVide from '../assets/journal_vide.png';
import journalAvecNouvelle from '../assets/journal_avec_nouvelle.png';
import journalAvecNouvelleZoom from '../assets/journal_avec_nouvelle_zoom.png';
import hParConsigne from '../assets/hpar_c1.png';
import graphique from '../assets/graphique.png';
import graphiqueAvecSelection from '../assets/graphique_avec_selection.png';
import rubriqueEnvironnement from '../assets/rubrique_environnement.png';
import terrasseCafe from '../assets/terrasse_cafe.png';
import telephoneEMail from '../assets/telephone_email.png';

const sousConsigneHPar1 = {
  id: 'HPar-sous-consigne-1',
  nom_technique: 'sous_consigne_HPar_1',
  type: 'sous-consigne',
  illustration: hParConsigne,
  intitule: "Après le programme télé, vous lisez les « Nouvelles du jour ».\n\nUn accident de la route a eu lieu dans votre ville ! Mais le texte est un peu bizarre, les phrases sont mélangées.",
  modalite_reponse: "Déplacez les blocs de texte sur la page du journal à gauche en remettant l'article dans l'ordre.\nVous pouvez modifier l'ordre autant de fois que vous le souhaitez. Une fois que l’ordre des phrases vous convient, cliquez sur « Valider ».\n\nPour commencer, cliquez sur « Suivant »."
};

const fragmentsNouvelleDuJour = [
  {
    id: 'id_0',
    position: 7,
    intitule: "Durant leur séjour à l'hôpital, ils auront tout loisir de se raconter leurs petites histoires..."
  }, {
    id: 'id_1',
    position: 2,
    intitule: "En effet, il est 8 h 45 quand le jeune David G. s'apprête à traverser la chaussée."
  }, {
    id: 'id_2',
    position: 3,
    intitule: "Un de ses copains de classe, Rémi P. qui était déjà devant l'école, se met lui aussi à traverser la chaussée pour aller à sa rencontre."
  }, {
    id: 'id_3',
    position: 6,
    intitule: "Les deux amis, blessés au visage pour l'un et à la jambe pour l'autre, ont été transportés à l'hôpital tout proche."
  }, {
    id: 'id_4',
    position: 4,
    intitule: "Les deux garçons se dirigent l'un vers l'autre sans regarder la circulation."
  }, {
    id: 'id_5',
    position: 1,
    intitule: "Ce matin, alors que les enfants arrivaient à proximité de l'école, deux garçons particulièrement distraits ont provoqué un accident sur la voie publique près de l'école Jules Ferry."
  }, {
    id: 'id_6',
    position: 5,
    intitule: "Deux voitures qui arrivaient en sens contraire, ont chacune projeté violemment un garçon à terre provoquant la frayeur des témoins."
  }
];

const HPar1 = {
  id: 'HPar1',
  nom_technique: 'hpar_1',
  illustration: journalVide,
  // chaque fragement rapport 1 point, plus 1 point bonus au delà de 5 fragmeents bien placés
  score: fragmentsNouvelleDuJour.length + 1,
  extensionVue: 'puzzle-journal',
  description: "Vous avez placé tous les blocs de texte !\nVous pouvez toujours modifier leur ordre directement dans la page du journal.",
  intitule: "Si l’ordre vous convient, cliquez sur « Valider ».",
  reponsesNonClassees: fragmentsNouvelleDuJour
};

const HPar2 = {
  id: 'HPar2',
  nom_technique: 'hpar_2',
  type: 'qcm',
  score: 1,
  illustration: journalAvecNouvelle,
  intitule: "C'est plus clair comme ça ! Mais quel pourrait être le titre de cet article ?",
  modalite_reponse: "Choisissez le titre qui résume le mieux le texte. Pour confirmer votre réponse, cliquez sur « Valider »",
  choix: [
    {
      id: 'deux_blesses_ecole',
      nom_technique: 'HPar/deux_blesses_ecole',
      bonneReponse: true,
      intitule: "Deux enfants blessés sur la route de l'école"
    },
    {
      id: 'trois_blesses',
      nom_technique: 'HPar/trois_blesses',
      bonneReponse: false,
      intitule: 'Trois blessés à Jules Ferry'
    },
    {
      id: 'deux_morts',
      nom_technique: 'HPar/deux_morts',
      bonneReponse: false,
      intitule: 'Deux morts dans une collision frontale'
    },
    {
      id: 'deux_blesses_hopital',
      nom_technique: 'HPar/deux_blesses_hopital',
      bonneReponse: false,
      intitule: "Deux enfants blessés devant l'hôpital Jules Ferry"
    }
  ]
};

const HPar3 = {
  id: 'HPar3',
  nom_technique: 'hpar_3',
  illustration: journalAvecNouvelleZoom,
  type: 'qcm',
  score: 1,
  intitule: "L'article utilise le mot « frayeur ». Si on voulait le remplacer par un autre mot qui a un sens proche, lequel pourrait-on choisir ?",
  choix: [
    {
      id: 'surprise',
      nom_technique: 'HPar/surprise',
      bonneReponse: false,
      intitule: 'Surprise'
    },
    {
      id: 'peur',
      nom_technique: 'HPar/peur',
      bonneReponse: true,
      intitule: 'Peur'
    },
    {
      id: 'inquietude',
      nom_technique: 'HPar/inquietude',
      bonneReponse: false,
      intitule: 'Inquiétude'
    },
    {
      id: 'agitation',
      nom_technique: 'HPar/agitation',
      bonneReponse: false,
      intitule: 'Agitation'
    }
  ]
};

const sousConsigneHGac1 = {
  id: 'HGac-sous-consigne-1',
  nom_technique: 'sous_consigne_HGac_1',
  type: 'sous-consigne',
  illustration: graphiqueAvecSelection,
  intitule: "Tiens, il y a un article sur les animaux de compagnie à la page suivante. Regardez attentivement le graphique présenté dans l'article, j'ai quelques questions pour vous.",
  modalite_reponse: "Pour commencer, cliquez sur  « Suivant »."
};

const HGac1 = {
  id: 'HGac1',
  nom_technique: 'hgac_1',
  illustration: graphique,
  extensionVue: 'graphique',
  score: 1,
  intitule: "D'après ce graphique, dans quel pays trouve-t-on le plus de foyers qui accueillent des chats ?",
  modalite_reponse: "Pour répondre, cliquez sur les barres du graphique.\nAttention, il peut y avoir plusieurs bonnes réponses. Quand votre choix vous convient, cliquez sur « Valider ».",
  reponse: {
    bonne_reponse: ['allemagne'],
  }
};

const HGac2 = {
  id: 'HGac2',
  nom_technique: 'hgac_2',
  illustration: graphique,
  extensionVue: 'graphique',
  score: 1,
  intitule: "Quels sont les pays qui ont le même pourcentage de foyers qui accueillent des chats ?",
  reponse: {
    bonne_reponse: ['danemark', 'italie'],
  }
};

const HGac3 = {
  id: 'HGac3',
  nom_technique: 'hgac_3',
  illustration: graphique,
  extensionVue: 'graphique',
  score: 1,
  intitule: "Quels pays ont plus de foyers qui accueillent des chats que la moyenne en Europe ?",
  reponse: {
    bonne_reponse: ['allemagne', 'pologne', 'grece'],
  }
};

const HGac4 = {
  id: 'HGac4',
  nom_technique: 'hgac_4',
  illustration: graphique,
  extensionVue: 'graphique',
  score: 1,
  intitule: "D’après ce graphique, dans quel pays y a-t-il le moins de foyers qui accueillent des chats ?",
  reponse: {
    bonne_reponse: ['roumanie'],
  }
};

const sousConsigneHCvf1 = {
  id: 'HCvf-sous-consigne-1',
  nom_technique: 'sous_consigne_HCvf_1',
  type: 'sous-consigne',
  extensionVue: 'clic-sur-mots',
  template: 'article article--villes-fleuries',
  illustration: rubriqueEnvironnement,
  intitule: "A la page suivante vous tombez sur la rubrique « La minute environnement ». Un article parle du concours des villes fleuries.\n\nJ'ai quelques questions à vous poser sur cet article, lisez-le avec attention. Quand vous avez fini de lire, cliquez sur « Suivant »."
};

const HCvf1 = {
  id: 'HCvf1',
  nom_technique: 'hcvf_1',
  extensionVue: 'clic-sur-mots',
  template: 'article article--villes-fleuries',
  illustration: rubriqueEnvironnement,
  score: 1,
  intitule: "« Pour le concours des villes fleuries, ils ont sillonné la ville ». Mais de qui parle-t-on ?",
  modalite_reponse: "Pour répondre aux questions, cliquez sur la réponse directement dans le texte. Quand vous êtes sûr, cliquez sur « Valider ».",
  reponse: {
    bonne_reponse: ['les membres du jury du concours régional des villes fleuries']
  }
};

const HCvf2 = {
  id: 'HCvf2',
  nom_technique: 'hcvf_2',
  extensionVue: 'clic-sur-mots',
  template: 'article article--villes-fleuries',
  illustration: rubriqueEnvironnement,
  score: 1,
  intitule: "Choisissez la phrase ou les phrases qui montrent que la commune permet à la nature de reprendre ses droits dans les espaces verts.",
  reponse: {
    bonne_reponse: [
      "Cette technique, qui permet à la nature de se réapproprier l'espace en ville",
      "« Dans le centre, où l'on tond moins",
      "par exemple, nous travaillons avec des graminées, qui sont fauchées deux fois par an seulement »"
    ],
  }
};

const HCvf3 = {
  id: 'HCvf3',
  nom_technique: 'hcvf_3',
  type: 'qcm',
  illustration: rubriqueEnvironnement,
  extensionVue: 'clic-sur-mots',
  template: 'article article--villes-fleuries',
  score: 1,
  intitule: "Combien de fois la ville s’est-elle inscrite au concours régional des villes fleuries ?",
  modalite_reponse: "Choisissez votre réponse en cliquant sur l'un des ronds ci-dessous. Quand vous avez fait votre choix, cliquez sur « Valider ».",
  choix: [
    {
      id: 'une_fois',
      nom_technique: 'HCvf/une_fois',
      bonneReponse: true,
      intitule: "Une fois"
    },
    {
      id: 'deux_fois',
      nom_technique: 'HCvf/deux_fois',
      bonneReponse: false,
      intitule: 'Deux fois'
    }
  ]
};

const HCvf4 = {
  id: 'HCvf4',
  nom_technique: 'hcvf_4',
  type: 'qcm',
  extensionVue: 'clic-sur-mots',
  template: 'article article--villes-fleuries',
  illustration: rubriqueEnvironnement,
  score: 1,
  intitule: "Lequel de ces quatre mots ne peut en aucun cas remplacer le mot « bichonner » ?",
  choix: [
    {
      id: 'choyer',
      nom_technique: 'HCvf/choyer',
      bonneReponse: false,
      intitule: "Choyer"
    },
    {
      id: 'prendre_soin',
      nom_technique: 'HCvf/prendre_soin',
      bonneReponse: false,
      intitule: 'Prendre soin'
    },
    {
      id: 'maltraiter',
      nom_technique: 'HCvf/maltraiter',
      bonneReponse: true,
      intitule: 'Maltraiter'
    },
    {
      id: 'soigner',
      nom_technique: 'HCvf/soigner',
      bonneReponse: false,
      intitule: 'Soigner'
    }
  ]
};

const texteHCvf1Colonne1 = "<span>Hier après-midi, [les membres du jury du concours régional des villes fleuries]() ont sillonné les rues de la commune.</span><span>Déjà distinguée sur le plan départemental, la ville participe pour la première fois à cette manifestation et espère décrocher sa première fleur, symbole d'une reconnaissance régionale.</span><span>L'an dernier, un premier prix départemental est venu récompenser l'énergie des [agents municipaux]() qui fleurissent leur commune.</span><span>Cette fois, l'équipe vise plus haut et s'est donné les moyens de ses ambitions. Elle compte sur un détail important pour tirer son épingle du jeu : *« Pour la première fois cette année, le règlement prend en compte la gestion différenciée des espaces verts »*, indique André Laurent, adjoint à l'environnement. *« Nous travaillons déjà avec ce système depuis plusieurs années »*.</span>";

const texteHCvf1Colonne2 = "<span>Cette technique, qui permet à la nature de se réapproprier l'espace en ville, est visible à plusieurs endroits, *« Dans le centre, où l'on tond moins, nous privilégions les graines qui permettent d'avoir des fleurs en permanence »*, résume l'élu.</span><span>*« A l'extérieur de la ville, le long de la Route nationale ou du boulevard Clémenceau, par exemple, nous travaillons avec des graminées, qui sont fauchées deux fois par an seulement »*.</span><span>Au cœur de la ville, le plus gros du travail a concerné les ronds-points. Les agents des espaces verts les ont bichonnés dès cet hiver pour préparer leur floraison printanière.</span><span>Résultat, bien avant le 14 Juillet, [les habitants]() ont droit à un feu d'artifice de couleurs. Aura-t-il séduit le jury ? Réponse à l'automne.</span>";

const texteHCvf2Colonne1 = "<span>Hier après-midi, [les membres du jury du concours régional des villes fleuries ont sillonné les rues de la commune]().</span><span>Déjà distinguée sur le plan départemental, la ville participe pour la première fois à cette manifestation et [espère décrocher sa première fleur, symbole d'une reconnaissance régionale]().</span><span>L'an dernier, un premier prix départemental est venu récompenser l'énergie des agents municipaux qui fleurissent leur commune.</span><span>Cette fois, l'équipe vise plus haut et s'est donné les moyens de ses ambitions. Elle compte sur un détail important pour tirer son épingle du jeu : *« Pour la première fois cette année, le règlement prend en compte la gestion différenciée des espaces verts »*, indique André Laurent, adjoint à l'environnement. *« Nous travaillons déjà avec ce système depuis plusieurs années »*.</span>";

const texteHCvf2Colonne2 = "<span>[Cette technique, qui permet à la nature de se réapproprier l'espace en ville](), est visible à plusieurs endroits, *[« Dans le centre, où l'on tond moins](), nous privilégions les graines qui permettent d'avoir des fleurs en permanence »*, résume l'élu.</span><span>*« A l'extérieur de la ville, le long de la Route nationale ou du boulevard Clémenceau, [par exemple, nous travaillons avec des graminées, qui sont fauchées deux fois par an seulement »]()*.</span><span>Au cœur de la ville, le plus gros du travail a concerné les ronds-points. Les agents des espaces verts les ont bichonnés dès cet hiver pour préparer leur floraison printanière.</span><span>Résultat, bien avant le 14 Juillet, les habitants ont droit à un feu d'artifice de couleurs. Aura-t-il séduit le jury ? Réponse à l'automne.</span>";

const texteHCvf1 =
`
|||
|:---|:---|
|${texteHCvf1Colonne1}|${texteHCvf1Colonne2}|
`;

const texteHCvf2 =
`
|||
|:---|:---|
|${texteHCvf2Colonne1}|${texteHCvf2Colonne2}|
`;

const sousConsigneHPfb1 = {
  id: 'HPfb-sous-consigne-1',
  nom_technique: 'sous_consigne_HPfb_1',
  type: 'sous-consigne',
  illustration: terrasseCafe,
  intitule: "Maintenant, il est temps d’envoyer un message à votre ami Charles. Hier vous l’avez remplacé à sa boutique « Fleurs et bibelots » et vous avez reçu une livraison qui n'était pas conforme. Vous devez le prévenir !",
  modalite_reponse: "Pour commencer, cliquez sur « Suivant »."
};

const sousConsigneHPfb2 = {
  id: 'HPfb-sous-consigne-2',
  nom_technique: 'sous_consigne_HPfb_2',
  type: 'sous-consigne',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  intitule: "Vous avez commencé à écrire un message un peu plus tôt, vous devez maintenant le compléter. Je vais vous lire les mots qui manquent, alors écoutez bien !\n\nSoyez attentifs, certains mots doivent être mis au pluriel, et les verbes doivent être conjugués.\n\nSi vous ne savez pas comment écrire certains mots, écrivez-les comme vous le pensez et continuez.",
  modalite_reponse: "Pour commencer, cliquez sur « Suivant »."
};

const HPfb1 = {
  id: 'HPfb1',
  nom_technique: 'hpfb_1',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Bonjour mon ami ! \
    J'espère que tu vas bien.\
    Comme convenu, je vais te décrire les problèmes que j'ai eus hier, le 10 août, quand je t'ai remplacé à la boutique.\
    Ecrivez « août »",
  modalite_reponse: "Pour répondre, écrivez les mots dans le cadre de texte.\n\nVous pouvez utiliser le bouton Lecture pour ré-écouter les mots. Pour confirmer votre réponse, cliquez sur « Valider ».",
  reponses: [
    {
      nom_technique: 'HPfb/aout',
      intitule: 'août',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/aout2',
      intitule: 'aoút',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/aout3',
      intitule: 'aoùt',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/aout4',
      intitule: 'aout',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/aout5',
      intitule: 'aoüt',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/aout6',
      intitule: 'aôut',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb2 = {
  id: 'HPfb2',
  nom_technique: 'hpfb_2',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Une commande est arrivée et elle ne correspondait pas à ta demande.\
    Ecrivez « demande »",
  reponses: [
    {
      nom_technique: 'HPfb/demande',
      intitule: 'demande',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/demandes',
      intitule: 'demandes',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb3 = {
  id: 'HPfb3',
  nom_technique: 'hpfb_3',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Le nombre d'articles était en accord avec la commande.\
    Ecrivez « nombre »",
  reponses: [
    {
      nom_technique: 'HPfb/nombre',
      intitule: 'nombre',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/nombres',
      intitule: 'nombres',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb4 = {
  id: 'HPfb4',
  nom_technique: 'hpfb_4',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « articles »",
  reponses: [
    {
      nom_technique: 'HPfb/articles',
      intitule: 'articles',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'HPfb/article',
      intitule: 'article',
      type_choix: 'bon'
    }
  ]
};

const HPfb5 = {
  id: 'HPfb5',
  nom_technique: 'hpfb_5',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « accord »",
  reponses: [
    {
      nom_technique: 'HPfb/accord',
      intitule: 'accord',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/accords',
      intitule: 'accords',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb6 = {
  id: 'HPfb6',
  nom_technique: 'hpfb_6',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Mais certains étaient dans un mauvais état ou ne correspondaient pas à ce qu'on attendait.\
    Ecrivez « état »",
  reponses: [
    {
      nom_technique: 'HPfb/etat',
      intitule: 'état',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/etat2',
      intitule: 'etat',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/etat3',
      intitule: 'ètat',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/etat4',
      intitule: 'états',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/etat5',
      intitule: 'etats',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/etat6',
      intitule: 'ètats',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb7 = {
  id: 'HPfb7',
  nom_technique: 'hpfb_7',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.5,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « correspondaient »",
  reponses: [
    {
      nom_technique: 'HPfb/correspondaient',
      intitule: 'correspondaient',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'HPfb/correspondait',
      intitule: 'correspondait',
      type_choix: 'bon'
    }
  ]
};

const HPfb8 = {
  id: 'HPfb8',
  nom_technique: 'hpfb_8',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 1,
  illustration: telephoneEMail,
  retranscription_audio: "Les dahlias, couleur bleu azuré, étaient en fait de couleur rouge.\
    Ecrivez « rouge »",
  reponses:  [
    {
      nom_technique: 'HPfb/rouge',
      intitule: 'rouge',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/rouges',
      intitule: 'rouges',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb9 = {
  id: 'HPfb9',
  nom_technique: 'hpfb_9',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Les roses de Chine ne sentaient aucun parfum contrairement à ce qui était annoncé dans le catalogue.\
    Ecrivez « roses »",
  reponses: [
    {
      nom_technique: 'HPfb/roses',
      intitule: 'roses',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'HPfb/rose',
      intitule: 'rose',
      type_choix: 'bon'
    }
  ]
};

const HPfb10 = {
  id: 'HPfb10',
  nom_technique: 'hpfb_10',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.5,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « sentaient »",
  reponses: [
    {
      nom_technique: 'HPfb/sentaient',
      intitule: 'sentaient',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'HPfb/sentait',
      intitule: 'sentait',
      type_choix: 'bon'
    }
  ]
};

const HPfb11 = {
  id: 'HPfb11',
  nom_technique: 'hpfb_11',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « parfum »",
  reponses: [
    {
      nom_technique: 'HPfb/parfum',
      intitule: 'parfum',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/parfums',
      intitule: 'parfums',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb12 = {
  id: 'HPfb12',
  nom_technique: 'hpfb_12',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « catalogue »",
  reponses: [
    {
      nom_technique: 'HPfb/catalogue',
      intitule: 'catalogue',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/catalogues',
      intitule: 'catalogues',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb13 = {
  id: 'HPfb13',
  nom_technique: 'hpfb_13',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "En plus, il manquait un bras à toutes les figurines des cyclistes faites en feuilles de bananier.\
    Ecrivez « bras »",
  reponses: [
    {
      nom_technique: 'HPfb/bras',
      intitule: 'bras',
      type_choix: 'bon'
    }
  ]
};

const HPfb14 = {
  id: 'HPfb14',
  nom_technique: 'hpfb_14',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « cyclistes »",
  reponses:
  [
    {
      nom_technique: 'HPfb/cyclistes',
      intitule: 'cyclistes',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'HPfb/cycliste',
      intitule: 'cycliste',
      type_choix: 'bon'
    }
  ]
};

const HPfb15 = {
  id: 'HPfb15',
  nom_technique: 'hpfb_15',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « bananier »",
  reponses: [
    {
      nom_technique: 'HPfb/bananier',
      intitule: 'bananier',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/bananiers',
      intitule: 'bananiers',
      type_choix: 'bon'
    }
  ]
};

const HPfb16 = {
  id: 'HPfb16',
  nom_technique: 'hpfb_16',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Enfin, cinq bouteilles de solution alcoolique pour nettoyer les barbecues fuyaient par le bouchon.\
    Ecrivez « alcoolique »",
  reponses: [
    {
      nom_technique: 'HPfb/alcoolique',
      intitule: 'alcoolique',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/alcooliques',
      intitule: 'alcooliques',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb17 = {
  id: 'HPfb17',
  nom_technique: 'hpfb_17',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Si tu en parles à ton fournisseur, je suis sûr qu'il y aura une intervention et sans doute un remboursement de tes marchandises.\
    Ecrivez « intervention »",
  reponses: [
    {
      nom_technique: 'HPfb/intervention',
      intitule: 'intervention',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/interventions',
      intitule: 'interventions',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb18 = {
  id: 'HPfb18',
  nom_technique: 'hpfb_18',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « remboursement »",
  reponses: [
    {
      nom_technique: 'HPfb/remboursement',
      intitule: 'remboursement',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/remboursements',
      intitule: 'remboursements',
      type_choix: 'acceptable'
    }
  ]
};

const HPfb19 = {
  id: 'HPfb19',
  nom_technique: 'hpfb_19',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "Ecrivez « marchandises »",
  reponses: [
    {
      nom_technique: 'HPfb/marchandises',
      intitule: 'marchandises',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'HPfb/marchandise',
      intitule: 'marchandise',
      type_choix: 'bon'
    }
  ]
};

const HPfb20 = {
  id: 'HPfb20',
  nom_technique: 'hpfb_20',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'email-HPfb-a-trous',
  numero_page: 2,
  illustration: telephoneEMail,
  retranscription_audio: "La commande a probablement été préparée à la hâte.\
    Bon courage et à très vite !\
    Ecrivez « hâte »",
  reponses: [
    {
      nom_technique: 'HPfb/hate',
      intitule: 'hâte',
      type_choix: 'bon'
    },
    {
      nom_technique: 'HPfb/hate2',
      intitule: 'hate',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/hate3',
      intitule: 'häte',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/hate4',
      intitule: 'hàte',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/hate5',
      intitule: 'hâtes',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/hate6',
      intitule: 'hates',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/hate7',
      intitule: 'hätes',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'HPfb/hate8',
      intitule: 'hàtes',
      type_choix: 'acceptable'
    }
  ]
};

const parcoursHaut1 = {
  series: [
    { cartes: [ sousConsigneHPar1 ] },
    { cartes: [ HPar1, HPar2, HPar3 ] },
    { cartes: [ sousConsigneHGac1 ] },
    { cartes: [ HGac1, HGac2, HGac3, HGac4 ] }
  ]
};

const parcoursHaut2 = {
  series: [
    {
      texte: texteHCvf1,
      texteNonCliquable: true,
      cartes: [ sousConsigneHCvf1 ]
    },
    {
      texte: texteHCvf1,
      cartes: [ HCvf1 ]
    },
    {
      texte: texteHCvf2,
      cartes: [ HCvf2 ]
    },
    {
      texte: texteHCvf1,
      texteNonCliquable: true,
      cartes: [ HCvf3, HCvf4 ]
    },
    {
      cartes: [ sousConsigneHPfb1, sousConsigneHPfb2 ]
    },
    { cartes: [ HPfb1, HPfb2, HPfb3, HPfb4, HPfb5, HPfb6, HPfb7, HPfb8, HPfb9, HPfb10, HPfb11, HPfb12, HPfb13, HPfb14, HPfb15, HPfb16, HPfb17, HPfb18, HPfb19, HPfb20 ] }
  ]
};

export { parcoursHaut1, parcoursHaut2 };
