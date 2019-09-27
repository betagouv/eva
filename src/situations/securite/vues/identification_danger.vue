<template>
  <div>
    <h3>{{ traduction('securite.danger.titre') }}</h3>
    <div class="identification-danger-input">
      <label>
        <input type="radio" name="danger" />
        {{ traduction('securite.danger.oui') }}
      </label>
    </div>
    <div class="identification-danger-input">
      <label>
        <input type="radio" name="danger" />
        {{ traduction('securite.danger.non') }}
      </label>
    </div>
    <button class="bouton-arrondi bouton-arrondi--petit">{{ traduction('securite.danger.bouton') }}</button>
  </div>
</template>

<script>
import 'securite/styles/identification_danger.scss';

export default {
}

</script>

