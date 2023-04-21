import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

// QUESTIONS
import sonConsigne from 'bienvenue/assets/consigne_demarrage_bienvenue.mp3';
import concentrationQuestion from 'bienvenue/assets/audio_questions/concentration_question.mp3';
import comprendreVite from 'bienvenue/assets/audio_questions/comprendre_vite.mp3';
import confondreObjets from 'bienvenue/assets/audio_questions/confondre_objets.mp3';
import differencierObjets from 'bienvenue/assets/audio_questions/differencier_objets.mp3';
import voirCeQuiVaPas from 'bienvenue/assets/audio_questions/voir_ce_qui_va_pas.mp3';
import decouperTache from 'bienvenue/assets/audio_questions/decouper_tache.mp3';
import sansFaireErreur from 'bienvenue/assets/audio_questions/sans_faire_erreur.mp3';
import voirLesDangers from 'bienvenue/assets/audio_questions/voir_les_dangers.mp3';
import problemesVue from 'bienvenue/assets/audio_questions/problemes_vue.mp3';
import differencierCouleurs from 'bienvenue/assets/audio_questions/differencier_couleurs.mp3';
import bienEntendre from 'bienvenue/assets/audio_questions/bien_entendre.mp3';
import malAConcentrer from 'bienvenue/assets/audio_questions/mal_a_concentrer.mp3';
import ecransMalTete from 'bienvenue/assets/audio_questions/ecrans_mal_tete.mp3';
import difficultesOrdinateur from 'bienvenue/assets/audio_questions/difficultes_ordinateur.mp3';
import difficultesTablette from 'bienvenue/assets/audio_questions/difficultes_tablette.mp3';
import difficultesInformatique from 'bienvenue/assets/audio_questions/difficultes_informatique.mp3';
import suiviDys from 'bienvenue/assets/audio_questions/suivi_dys.mp3';
import lieu_scolarite from 'bienvenue/assets/audio_questions/alle_ecole.mp3';
import quel_age from 'bienvenue/assets/audio_questions/quel_age.mp3';
import genre from 'bienvenue/assets/audio_questions/genre.mp3';
import langue_maternelle from 'bienvenue/assets/audio_questions/francais_langue_maternelle.mp3';
import niveau_etude from 'bienvenue/assets/audio_questions/niveau_etude.mp3';
import derniere_situation from 'bienvenue/assets/audio_questions/derniere_situation.mp3';
import consigneAutopositionnement from 'bienvenue/assets/audio_questions/consigne_autopositionnement.mp3';
import consigneSante from 'bienvenue/assets/audio_questions/consigne_sante.mp3';

// REPONSES
import lunettes from 'bienvenue/assets/audio_reponses/lunette.mp3';
import nonCorrige from 'bienvenue/assets/audio_reponses/non_corrige.mp3';
import lunettesInefficaces from 'bienvenue/assets/audio_reponses/vous_avez_des_lunettes.mp3';
import pasDeProblemes from 'bienvenue/assets/audio_reponses/pas_de_problemes.mp3';
import oui from 'bienvenue/assets/audio_reponses/oui.mp3';
import non from 'bienvenue/assets/audio_reponses/non.mp3';
import aLAise from 'bienvenue/assets/audio_reponses/a_l_aise.mp3';
import daccord from 'bienvenue/assets/audio_reponses/d_accord.mp3';
import facile from 'bienvenue/assets/audio_reponses/facile.mp3';
import niALAise from 'bienvenue/assets/audio_reponses/ni_a_l_aise.mp3';
import niDaccord from 'bienvenue/assets/audio_reponses/ni_d_accord.mp3';
import niFacileNiDifficile from 'bienvenue/assets/audio_reponses/ni_facile_ni_difficile.mp3';
import pasALAise from 'bienvenue/assets/audio_reponses/pas_a_l_aise.mp3';
import pasDaccord from 'bienvenue/assets/audio_reponses/pas_d_accord.mp3';
import pasDuToutALAise from 'bienvenue/assets/audio_reponses/pas_du_tout_a_l_aise.mp3';
import pasDuToutDaccord from 'bienvenue/assets/audio_reponses/pas_du_tout_d_accord.mp3';
import pasDuToutFacile from 'bienvenue/assets/audio_reponses/pas_du_tout_facile.mp3';
import pasFacile from 'bienvenue/assets/audio_reponses/pas_facile.mp3';
import plutotALAise from 'bienvenue/assets/audio_reponses/plutot_a_l_aise.mp3';
import plutotDaccord from 'bienvenue/assets/audio_reponses/plutot_d_accord.mp3';
import plutotFacile from 'bienvenue/assets/audio_reponses/plutot_facile.mp3';
import plutotPasALAise from 'bienvenue/assets/audio_reponses/plutot_pas_a_l_aise.mp3';
import plutotPasDaccord from 'bienvenue/assets/audio_reponses/plutot_pas_d_accord.mp3';
import plutotPasFacile from 'bienvenue/assets/audio_reponses/plutot_pas_facile.mp3';
import toutAFaitDaccord from 'bienvenue/assets/audio_reponses/tout_a_fait_d_accord.mp3';
import tresALAise from 'bienvenue/assets/audio_reponses/tres_a_l_aise.mp3';
import tresFacile from 'bienvenue/assets/audio_reponses/tres_facile.mp3';

import homme from 'bienvenue/assets/audio_reponses/un_homme.mp3';
import femme from 'bienvenue/assets/audio_reponses/une_femme.mp3';
import autre from 'bienvenue/assets/audio_reponses/autre.mp3';
import france from 'bienvenue/assets/audio_reponses/Oui_en_france.mp3';
import etranger from 'bienvenue/assets/audio_reponses/oui_dans_un_autre_pays.mp3';
import pas_etudie from 'bienvenue/assets/audio_reponses/je_ne_suis_pas_alle_a_l_ecole.mp3';
import college from 'bienvenue/assets/audio_reponses/niveau_college.mp3';
import cfg_dnb from 'bienvenue/assets/audio_reponses/niveau_certificat_de_formation_generale_ou_diplome_national_du_brevet.mp3';
import cap_bep from 'bienvenue/assets/audio_reponses/Niveau_CAP_BEP.mp3';
import bac from 'bienvenue/assets/audio_reponses/niveau_bac.mp3';
import bac_plus2 from 'bienvenue/assets/audio_reponses/Niveau_bac_plus2.mp3';
import superieur_bac_plus2 from 'bienvenue/assets/audio_reponses/Niveau_superieu_a_bac_plus2.mp3';
import scolarisation from 'bienvenue/assets/audio_reponses/scolarisation.mp3';
import formation_professionnelle from 'bienvenue/assets/audio_reponses/Formation_professionnelle.mp3';
import alternance from 'bienvenue/assets/audio_reponses/Alternance.mp3';
import en_emploi from 'bienvenue/assets/audio_reponses/en_emploi.mp3';
import sans_emploi from 'bienvenue/assets/audio_reponses/sans_emploi.mp3';

const AUDIOS_QUESTIONS = {
  age: quel_age,
  analyse_travail: voirCeQuiVaPas,
  comprehension: comprendreVite,
  concentration: concentrationQuestion,
  dangers: voirLesDangers,
  dernier_niveau_etude: niveau_etude,
  derniere_situation: derniere_situation,
  confondre_objets: confondreObjets,
  differencier_objets: differencierObjets,
  difficultes_informatique: difficultesInformatique,
  entendre: bienEntendre,
  genre: genre,
  langue_maternelle: langue_maternelle,
  lieu_scolarite: lieu_scolarite,
  tache_longue_et_difficile: decouperTache,
  travail_sans_erreur: sansFaireErreur,
  trouble_dys: suiviDys,
  vue: problemesVue,
  bienvenue_9: differencierCouleurs,
  bienvenue_11: malAConcentrer,
  bienvenue_12: ecransMalTete,
  bienvenue_13: difficultesOrdinateur,
  bienvenue_14: difficultesTablette,
  sous_consigne_autopositionnement: consigneAutopositionnement,
  sous_consigne_sante: consigneSante
};

const AUDIOS_REPONSES = {
  homme: homme,
  femme: femme,
  autre: autre,
  oui: oui,
  non: non,
  france: france,
  etranger: etranger,
  non_scolarise: non,
  pas_etudie: pas_etudie,
  college: college,
  cfg_dnb: cfg_dnb,
  cap_bep: cap_bep,
  bac: bac,
  bac_plus2: bac_plus2,
  superieur_bac_plus2: superieur_bac_plus2,
  scolarisation: scolarisation,
  en_emploi: en_emploi,
  formation_professionnelle: formation_professionnelle,
  alternance: alternance,
  sans_emploi: sans_emploi,
  bienvenue_8_reponse_1: lunettes,
  bienvenue_8_reponse_2: nonCorrige,
  bienvenue_8_reponse_3: lunettesInefficaces,
  bienvenue_8_reponse_4: pasDeProblemes,
  bienvenue_oui: oui,
  bienvenue_non: non,
  bienvenue_pas_du_tout_facile: pasDuToutFacile,
  bienvenue_pas_facile: pasFacile,
  bienvenue_ni_facile: niFacileNiDifficile,
  bienvenue_plutot_pas_facile: plutotPasFacile,
  bienvenue_plutot_facile: plutotFacile,
  bienvenue_facile: facile,
  bienvenue_tres_facile: tresFacile,
  bienvenue_pas_du_tout_a_l_aise: pasDuToutALAise,
  bienvenue_pas_a_l_aise: pasALAise,
  bienvenue_ni_a_l_aise: niALAise,
  bienvenue_plutot_pas_a_l_aise: plutotPasALAise,
  bienvenue_plutot_a_l_aise: plutotALAise,
  bienvenue_a_l_aise: aLAise,
  bienvenue_tres_a_l_aise: tresALAise,
  bienvenue_pas_du_tout_daccord: pasDuToutDaccord,
  bienvenue_pas_daccord: pasDaccord,
  bienvenue_plutot_pas_daccord: plutotPasDaccord,
  bienvenue_ni_daccord: niDaccord,
  bienvenue_plutot_daccord: plutotDaccord,
  bienvenue_daccord: daccord,
  bienvenue_tout_a_fait_daccord: toutAFaitDaccord
};

const messagesVideos = {};
const messagesAudios = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, null, sonConsigne);
  }
}
