<template lang="pug">

  transition(name="x4" appear)
    div.x4-bootstrap-screen.x4-transition

      div.x4-inside

        UILabel(
          :label="stats.message")

        UIProgress(
          :chunks="stats.chunks"
          :completed="stats.completed")

</template>


<script>

  import UILabel from '~/components/ui/Label';
  import UIProgress from '~/components/ui/Progress';


  export default {

    components: {
      UILabel,
      UIProgress,
    },


    computed: {

      stats({ state }) {
        return state.bootstrap.stats;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-bootstrap-screen
    align-items: flex-start
    display: flex
    height: 100%
    justify-content: center
    width: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

  .x4-inside
    display: flex
    flex-direction: column
    padding: 200px 32px 0
    width: 416px

  .x4-ui-label
    font-size: 16px
    line-height: 1.5
    text-align: center

  .x4-ui-progress
    padding-top: 8px

</style>
