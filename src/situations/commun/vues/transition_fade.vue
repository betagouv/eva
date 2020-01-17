<template>
  <transition name="fade">
    <slot />
  </transition>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
    pointer-events: none;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
