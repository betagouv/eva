<template>
  <transition
    :mode="mode"
    name="fade"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false
    }
  }
};
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
    pointer-events: none;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
