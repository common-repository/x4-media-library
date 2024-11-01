<template lang="pug">

  transition(name="x4" :appear="appeared")

    div.x4-left-column(
      :class="classObject"
      :style="styleObject"
      @dragenter="dragOver"
      @dragover="dragOver")

      div.x4-top-row

        PluginButton

      div.x4-subtop-row

        SettingsButton

      div.x4-content-row.x4-scrollable

        MMenu(
          v-if="menuVisible")

        Tree

</template>


<script>

  import PluginButton from '~/components/blocks/common/buttons/PluginButton';
  import SettingsButton from '~/components/blocks/common/buttons/SettingsButton';
  import MMenu from '~/components/blocks/main/Menu';
  import Tree from '~/components/blocks/main/Tree';


  export default {

    components: {
      PluginButton,
      SettingsButton,
      MMenu,
      Tree,
    },


    computed: {

      appeared({ state }) {
        return state.leftColumn.appeared;
      },

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

      menuVisible({ state, $frame }) {
        return !!$frame.modal && state.menu.length > 0;
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
