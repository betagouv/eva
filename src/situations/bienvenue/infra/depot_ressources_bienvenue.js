import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

// QUESTIONS
import sonConsigne from 'bienvenue/assets/consigne_demarrage.wav';
import concentrationQuestion from 'bienvenue/assets/audio_questions/concentration_question.wav';
import comprendreVite from 'bienvenue/assets/audio_questions/comprendre_vite.wav';
import confondreObjets from 'bienvenue/assets/audio_questions/confondre_objets.wav';
import voirCeQuiVaPas from 'bienvenue/assets/audio_questions/voir_ce_qui_va_pas.wav';
import decouperTache from 'bienvenue/assets/audio_questions/decouper_tache.wav';
import sansFaireErreur from 'bienvenue/assets/audio_questions/sans_faire_erreur.wav';
import voirLesDangers from 'bienvenue/assets/audio_questions/voir_les_dangers.wav';
import problemeVue from 'bienvenue/assets/audio_questions/probleme_vue.wav';
import differencierCouleurs from 'bienvenue/assets/audio_questions/differencier_couleurs.wav';
import bienEntendre from 'bienvenue/assets/audio_questions/bien_entendre.wav';
import malAConcentrer from 'bienvenue/assets/audio_questions/mal_a_concentrer.wav';
import ecransMalTete from 'bienvenue/assets/audio_questions/ecrans_mal_tete.wav';
import difficultesOrdinateur from 'bienvenue/assets/audio_questions/difficultes_ordinateur.wav';
import difficultesTablette from 'bienvenue/assets/audio_questions/difficultes_tablette.wav';
import suiviDys from 'bienvenue/assets/audio_questions/suivi_dys.wav';
import alleEcole from 'bienvenue/assets/audio_questions/alle_ecole.wav';

// REPONSES
import lunettes from 'bienvenue/assets/audio_reponses/lunette.wav';
import nonCorrige from 'bienvenue/assets/audio_reponses/non_corrige.wav';
import lunettesInefficaces from 'bienvenue/assets/audio_reponses/vous_avez_des_lunettes.wav';
import pasDeProblemes from 'bienvenue/assets/audio_reponses/pas_de_problemes.wav';
import ouiEtranger from 'bienvenue/assets/audio_reponses/oui_etranger.wav';
import ouiFrance from 'bienvenue/assets/audio_reponses/oui_france.wav';
import oui from 'bienvenue/assets/audio_reponses/oui.wav';
import non from 'bienvenue/assets/audio_reponses/non.wav';
import aLAise from 'bienvenue/assets/audio_reponses/a_l_aise.wav';
import daccord from 'bienvenue/assets/audio_reponses/d_accord.wav';
import facile from 'bienvenue/assets/audio_reponses/facile.wav';
import niALAise from 'bienvenue/assets/audio_reponses/ni_a_l_aise.wav';
import niDaccord from 'bienvenue/assets/audio_reponses/ni_d_accord.wav';
import niFacileNiDifficile from 'bienvenue/assets/audio_reponses/ni_facile_ni_difficile.wav';
import pasALAise from 'bienvenue/assets/audio_reponses/pas_a_l_aise.wav';
import pasDaccord from 'bienvenue/assets/audio_reponses/pas_d_accord.wav';
import pasDuToutALAise from 'bienvenue/assets/audio_reponses/pas_du_tout_a_l_aise.wav';
import pasDuToutDaccord from 'bienvenue/assets/audio_reponses/pas_du_tout_d_accord.wav';
import pasDuToutFacile from 'bienvenue/assets/audio_reponses/pas_du_tout_facile.wav';
import pasFacile from 'bienvenue/assets/audio_reponses/pas_facile.wav';
import plutotALAise from 'bienvenue/assets/audio_reponses/plutot_a_l_aise.wav';
import plutotDaccord from 'bienvenue/assets/audio_reponses/plutot_d_accord.wav';
import plutotFacile from 'bienvenue/assets/audio_reponses/plutot_facile.wav';
import plutotPasALAise from 'bienvenue/assets/audio_reponses/plutot_pas_a_l_aise.wav';
import plutotPasDaccord from 'bienvenue/assets/audio_reponses/plutot_pas_d_accord.wav';
import plutotPasFacile from 'bienvenue/assets/audio_reponses/plutot_pas_facile.wav';
import toutAFaitDaccord from 'bienvenue/assets/audio_reponses/tout_a_fait_d_accord.wav';
import tresALAise from 'bienvenue/assets/audio_reponses/tres_a_l_aise.wav';
import tresFacile from 'bienvenue/assets/audio_reponses/tres_facile.wav';

const AUDIOS_QUESTIONS = {
  bienvenue_1: concentrationQuestion,
  bienvenue_2: comprendreVite,
  bienvenue_3: confondreObjets,
  bienvenue_4: voirCeQuiVaPas,
  bienvenue_5: decouperTache,
  bienvenue_6: sansFaireErreur,
  bienvenue_7: voirLesDangers,
  bienvenue_8: problemeVue,
  bienvenue_9: differencierCouleurs,
  bienvenue_10: bienEntendre,
  bienvenue_11: malAConcentrer,
  bienvenue_12: ecransMalTete,
  bienvenue_13: difficultesOrdinateur,
  bienvenue_14: difficultesTablette,
  bienvenue_15: suiviDys,
  bienvenue_16: alleEcole
};

const AUDIOS_REPONSES = {
  bienvenue_8_reponse_1: lunettes,
  bienvenue_8_reponse_2: nonCorrige,
  bienvenue_8_reponse_3: lunettesInefficaces,
  bienvenue_8_reponse_4: pasDeProblemes,
  bienvenue_16_reponse_1: ouiFrance,
  bienvenue_16_reponse_2: ouiEtranger,
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

const AUDIOS_QUESTIONS_REPONSES = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge(Object.values(AUDIOS_QUESTIONS_REPONSES));
  }

  messageAudio (nomTechnique) {
    return this.ressource(AUDIOS_QUESTIONS_REPONSES[nomTechnique]);
  }

  existeMessageAudio (nomTechnique) {
    return nomTechnique in AUDIOS_QUESTIONS_REPONSES;
  }
}
