<template>
  <div>
    <h3>{{ traduction('securite.danger.titre') }}</h3>
    <div class="identification-danger-input">
      <label>
        <input v-model="danger" type="radio" name="danger" value="oui" />
        {{ traduction('securite.danger.oui') }}
      </label>
    </div>
    <div class="identification-danger-input">
      <label>
        <input v-model="danger" type="radio" name="danger" value="non" />
        {{ traduction('securite.danger.non') }}
      </label>
    </div>
    <button
      :disabled="desactivee"
      class="bouton-arrondi bouton-arrondi--petit">{{ traduction('securite.danger.bouton') }}</button>
  </div>
</template>

<script>
import 'securite/styles/identification_danger.scss';

export default {
  data () {
    return {
      danger: ""
    };
  },

  computed: {
    desactivee () {
      return this.danger === "";
    }
  }
}

</script>

