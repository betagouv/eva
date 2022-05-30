<template>
  <div class="puzzle">
    <draggable v-model="nouvellesDuJourClassees">
      <div v-for="nouvelle in nouvellesDuJourClassees" :key="nouvelle.id" class="puzzle-item">
        <div class="puzzle-icone">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="#D6DAEC"/>
          <circle cx="2" cy="10" r="2" fill="#D6DAEC"/>
          <circle cx="2" cy="18" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="18" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="10" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="2" r="2" fill="#D6DAEC"/>
          </svg>
        </div>
        <span>
          {{nouvelle.contenu}}
        </span>
      </div>
    </draggable>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/puzzle.scss';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },

  data: function () {
    return {
      nouvellesDuJourClassees: [
        {
          id: 'elem1',
          contenu: "Durant leur séjour à l'hôpital, ils auront tout loisir de se raconter leurs petites histoires..."
        }, {
          id: 'elem2',
          contenu: "En effet, il est 8 h 45 quand le jeune David G. s'apprête à traverser la chaussée."
        }, {
          id: 'elem3',
          contenu: "Un de ses copains de classe, Rémi P. qui était déjà devant l'école, se met lui aussi à traverser la chaussée pour aller à sa rencontre."
        }, {
          id: 'elem4',
          contenu: "Les deux amis, blessés au visage pour l'un et à la jambe pour l'autre, ont été transportés à l'hôpital tout proche."
        }, {
          id: 'elem5',
          contenu: "Les deux garçons se dirigent l'un vers l'autre sans regarder la circulation."
        }, {
          id: 'elem6',
          contenu: "Ce matin, alors que les enfants arrivaient à proximité de l'école, deux garçons particulièrement distraits ont provoqué un accident sur la voie publique près de l'école Jules Ferry."
        }, {
          id: 'elem7',
          contenu: "Deux voitures qui arrivaient en sens contraire, ont chacune projeté violemment un garçon à terre provoquant la frayeur des témoins."
        }
      ]
    };
  },
};
</script>
