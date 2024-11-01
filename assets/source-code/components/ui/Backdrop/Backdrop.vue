<template lang="pug">

  transition(name="x4" appear)

    div.x4-ui-backdrop.x4-transition

</template>


<script>

  export default {

  };

</script>


<style lang="sass" scoped>

  .x4-ui-backdrop
    bottom: 0
    left: 0
    position: absolute
    right: 0
    top: 0
    z-index: 10

    &.x4-enter, &.x4-leave-to
      opacity: 0

</style>
