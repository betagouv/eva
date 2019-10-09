import EvenementQualificationDanger from './evenement_qualification_danger';

export default function rapporteAuJournal (store, journal) {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'ajouteDangerQualifie') {
      journal.enregistre(
        new EvenementQualificationDanger({
          danger: mutation.payload.nom,
          reponse: mutation.payload.choix
        })
      );
    }
  });
}
