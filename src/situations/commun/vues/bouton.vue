<template v-if="visible">
  <div v-if="etiquette" class="bouton-et-etiquette">
    <a :class="classe" @click="click">
      <img :src="image" />
    </a>
    <span>{{ etiquette }}</span>
  </div>
  <a v-else :class="classe" @click="click">
    <img :src="image" />
  </a>
</template>

<script>
export default {
  props: {
    etiquette: {
      type: String,
      required: false
    },
    classe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    click: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    affiche() {
      this.visible = true;
    },
    cache() {
      this.visible = false;
    }
  },
};
</script>
