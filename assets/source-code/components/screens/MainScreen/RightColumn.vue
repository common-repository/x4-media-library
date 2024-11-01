<template lang="pug">

  transition(name="x4" :appear="appeared")

    div.x4-right-column(
      :class="classObject"
      :style="styleObject"
      @dragenter="dragOver"
      @dragover="dragOver")

      div.x4-top-row

        HelpButton

      div.x4-subtop-row

        ShortcutsButton

      div.x4-content-row.x4-scrollable

        Info

      div.x4-bottom-row(
        v-if="actionsVisible")

        Actions

</template>


<script>

  import HelpButton from '~/components/blocks/common/buttons/HelpButton';
  import ShortcutsButton from '~/components/blocks/common/buttons/ShortcutsButton';
  import Actions from '~/components/blocks/main/Actions';
  import Info from '~/components/blocks/main/Info';


  export default {

    components: {
      HelpButton,
      ShortcutsButton,
      Actions,
      Info,
    },


    computed: {

      appeared({ state }) {
        return state.rightColumn.appeared;
      },


      classObject({ state, getters }) {
        return {
          'x4-mobile': getters['responsive/isMobile'],
          'x4-transition': state.dragstate !== 'right-resizer',
        };
      },

      styleObject({ state }) {
        return {
          width: state.rightColumn.width + 'px',
        };
      },

      actionsVisible({ state, $frame }) {
        return !!$frame.modal && state.actions.length > 0;
      },

    },


    methods: {

      dragOver({ dispatch }, event) {
        dispatch('LEFT_RESIZER_DRAG_OVER', { event });
        dispatch('RIGHT_RESIZER_DRAG_OVER', { event });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-right-column
    @include background-color($white)
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
    display: flex
    flex-direction: column
    height: 100%
    position: relative
    z-index: 20

    &.x4-enter, &.x4-leave-to
      width: 0!important

    &.x4-mobile
      position: absolute
      right: 0
      top: 0

  .x4-top-row
    @include background-color($primary)
    display: flex
    height: 64px

  .x4-subtop-row
    @include background-color($black, .04)
    display: flex
    height: 48px

  .x4-content-row
    @include background-color($white)
    display: flex
    flex-direction: column
    flex-shrink: 100000
    height: 100%

  .x4-bottom-row
    @include background-color($white)
    display: flex
    flex-direction: column
    position: relative
    z-index: 1

</style>
