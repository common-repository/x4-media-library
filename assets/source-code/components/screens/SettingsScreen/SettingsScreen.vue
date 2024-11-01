<template lang="pug">

  transition(name="x4" appear)
    div.x4-settings-screen.x4-transition

      UIBackdrop.x4-columns-backdrop(
        v-if="backdropColumnsVisible"
        @click.native.stop="closeColumns")

      LeftColumn(
        v-if="leftColumnVisible")

      LeftResizer(
        v-if="leftColumnVisible")

      CenterColumn

</template>


<script>

  import UIBackdrop from '~/components/ui/Backdrop';
  import LeftColumn from './LeftColumn';
  import LeftResizer from './LeftResizer';
  import CenterColumn from './CenterColumn';


  export default {

    components: {
      UIBackdrop,
      LeftColumn,
      LeftResizer,
      CenterColumn,
    },


    computed: {

      backdropColumnsVisible({ getters }) {
        return getters['responsive/isMobile'] && getters['leftColumn/visible'];
      },

      leftColumnVisible({ getters }) {
        return getters['leftColumn/visible'];
      },

    },


    methods: {

      closeColumns({ dispatch }) {
        dispatch('LEFT_COLUMN_MOBILE_CLOSE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-settings-screen
    display: flex
    height: 100%
    width: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

  .x4-columns-backdrop
    @include background-color($black, .5)

</style>
