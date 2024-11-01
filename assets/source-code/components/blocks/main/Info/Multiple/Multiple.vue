<template lang="pug">

  transition(name="x4" appear)
    div.x4-multiple.x4-transition

      Preview

      Name

      Stats

      Actions

</template>


<script>

  import Preview from './Preview';
  import Name from './Name';
  import Stats from './Stats';
  import Actions from './Actions';
  
  
  export default {

    components: {
      Preview,
      Name,
      Stats,
      Actions,
    },

  };

</script>


<style lang="sass" scoped>

  .x4-multiple
    display: flex
    flex-direction: column
    width: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

</style>
