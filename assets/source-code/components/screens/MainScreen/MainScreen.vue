<template lang="pug">

  transition(name="x4" appear)
    div.x4-main-screen.x4-transition

      Context(
        v-if="contextVisible")

      MoveIcon(
        v-if="moveIconVisible")

      Shortcuts(
        v-if="shortcutsVisible")

      Uploader(
        v-show="uploaderVisible")

      div.x4-inside(
        @mousedown.capture="hideContext"
        @scroll.capture="hideContext")

        UIBackdrop.x4-columns-backdrop(
          v-if="backdropColumnsVisible"
          @click.native.stop="closeColumns")

        LeftColumn(
          v-if="leftColumnVisible")

        LeftResizer(
          v-if="leftColumnVisible")

        CenterColumn

        RightResizer(
          v-if="rightColumnVisible")

        RightColumn(
          v-if="rightColumnVisible")

</template>


<script>

  import UIBackdrop from '~/components/ui/Backdrop';
  import Context from '~/components/blocks/main/Context';
  import MoveIcon from '~/components/blocks/main/MoveIcon';
  import Shortcuts from '~/components/blocks/main/Shortcuts';
  import Uploader from '~/components/blocks/main/Uploader';
  import LeftColumn from './LeftColumn';
  import LeftResizer from './LeftResizer';
  import CenterColumn from './CenterColumn';
  import RightColumn from './RightColumn';
  import RightResizer from './RightResizer';


  export default {

    components: {
      UIBackdrop,
      Context,
      MoveIcon,
      Shortcuts,
      Uploader,
      LeftColumn,
      LeftResizer,
      CenterColumn,
      RightColumn,
      RightResizer,
    },


    mounted({ dispatch }) {
      dispatch('LEFT_COLUMN_APPEARED');
      dispatch('RIGHT_COLUMN_APPEARED');
    },


    computed: {

      contextVisible({ state }) {
        return state.context.visible;
      },

      moveIconVisible() {
        return true;
      },

      shortcutsVisible({ state }) {
        return state.shortcuts.visible;
      },

      uploaderVisible({ state }) {
        return state.uploader.visible;
      },

      backdropColumnsVisible({ getters }) {
        return getters['responsive/isMobile'] && (getters['leftColumn/visible'] || getters['rightColumn/visible']);
      },

      leftColumnVisible({ getters }) {
        return getters['leftColumn/visible'];
      },

      rightColumnVisible({ getters }) {
        return getters['rightColumn/visible'];
      },

    },


    methods: {

      hideContext({ state, dispatch }) {
        if (state.context.visible) {
          dispatch('CONTEXT_HIDE');
        }
      },

      closeColumns({ dispatch }) {
        dispatch('LEFT_COLUMN_MOBILE_CLOSE');
        dispatch('RIGHT_COLUMN_MOBILE_CLOSE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-main-screen
    display: flex
    flex-direction: column
    height: 100%
    width: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

  .x4-inside
    display: flex
    height: 100%

  .x4-columns-backdrop
    @include background-color($black, .5)

</style>
