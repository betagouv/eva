import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

// QUESTIONS
import sonConsigne from 'bienvenue/assets/consigne_demarrage_bienvenue.mp3';
import concentrationQuestion from 'bienvenue/assets/audio_questions/concentration_question.mp3';
import comprendreVite from 'bienvenue/assets/audio_questions/comprendre_vite.mp3';
import confondreObjets from 'bienvenue/assets/audio_questions/confondre_objets.mp3';
import voirCeQuiVaPas from 'bienvenue/assets/audio_questions/voir_ce_qui_va_pas.mp3';
import decouperTache from 'bienvenue/assets/audio_questions/decouper_tache.mp3';
import sansFaireErreur from 'bienvenue/assets/audio_questions/sans_faire_erreur.mp3';
import voirLesDangers from 'bienvenue/assets/audio_questions/voir_les_dangers.mp3';
import problemeVue from 'bienvenue/assets/audio_questions/probleme_vue.mp3';
import differencierCouleurs from 'bienvenue/assets/audio_questions/differencier_couleurs.mp3';
import bienEntendre from 'bienvenue/assets/audio_questions/bien_entendre.mp3';
import malAConcentrer from 'bienvenue/assets/audio_questions/mal_a_concentrer.mp3';
import ecransMalTete from 'bienvenue/assets/audio_questions/ecrans_mal_tete.mp3';
import difficultesOrdinateur from 'bienvenue/assets/audio_questions/difficultes_ordinateur.mp3';
import difficultesTablette from 'bienvenue/assets/audio_questions/difficultes_tablette.mp3';
import suiviDys from 'bienvenue/assets/audio_questions/suivi_dys.mp3';
import alleEcole from 'bienvenue/assets/audio_questions/alle_ecole.mp3';

// REPONSES
import lunettes from 'bienvenue/assets/audio_reponses/lunette.mp3';
import nonCorrige from 'bienvenue/assets/audio_reponses/non_corrige.mp3';
import lunettesInefficaces from 'bienvenue/assets/audio_reponses/vous_avez_des_lunettes.mp3';
import pasDeProblemes from 'bienvenue/assets/audio_reponses/pas_de_problemes.mp3';
import ouiEtranger from 'bienvenue/assets/audio_reponses/oui_etranger.mp3';
import ouiFrance from 'bienvenue/assets/audio_reponses/oui_france.mp3';
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

const messagesAudios = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesAudios, null, sonConsigne);
  }
}
