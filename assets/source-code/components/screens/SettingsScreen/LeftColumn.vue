<template lang="pug">

  transition(name="x4" appear)

    div.x4-left-column(
      :class="classObject"
      :style="styleObject"
      @dragenter="dragOver"
      @dragover="dragOver")

      div.x4-top-row

        PluginButton

      div.x4-subtop-row

        MainButton

      div.x4-content-row.x4-scrollable

        Menu

</template>


<script>

  import PluginButton from '~/components/blocks/common/buttons/PluginButton';
  import MainButton from '~/components/blocks/common/buttons/MainButton';
  import Menu from '~/components/blocks/settings/Menu';


  export default {

    components: {
      PluginButton,
      MainButton,
      Menu,
    },


    computed: {

      classObject({ state, getters }) {
        return {
          'x4-mobile': getters['responsive/isMobile'],
          'x4-transition': state.dragstate !== 'left-resizer',
        };
      },

      styleObject({ state }) {
        return {
          width: state.leftColumn.width + 'px',
        };
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

  .x4-left-column
    @include background-color($white)
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
    display: flex
    flex-direction: column
    height: 100%
    position: relative
    z-index: 30

    &.x4-enter, &.x4-leave-to
      width: 0!important

    &.x4-mobile
      left: 0
      position: absolute
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

</style>
