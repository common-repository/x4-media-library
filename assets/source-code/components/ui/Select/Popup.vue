<template lang="pug">

  transition(name="x4" appear)
    div.x4-select-popup.x4-transition

      UIBackdrop(
        @click.native.stop="close")

      div.x4-inside.x4-scrollable.x4-transition(
        ref="menu"
        :style="styleInside")

        SOption(
          v-for="option in options"
          :key="option.value"
          :option="option"
          :value="value"
          :ref="(value === option.value  ? 'option_active' : null)"
          @change="change")

</template>


<script>

  import UIBackdrop from '~/components/ui/Backdrop';
  import SOption from './Option';


  export default {

    components: {
      UIBackdrop,
      SOption,
    },


    mounted() {
      let $menu = this.$refs.menu;
      let $active = this.$refs.option_active;

      $active = $active && $active.length > 0
        ? $active[0].$el
        : null;

      if ($menu && $active) {
        if ($active.offsetTop >= 6 * $active.offsetHeight) {
          $menu.scrollTop = $active.offsetTop - $active.offsetHeight;
        }
      }
    },


    computed: {

      value({ state }) {
        return state.select.value;
      },

      options({ state }) {
        return state.select.options;
      },

      styleInside({ state }) {
        return {
          width: state.select.rect.width + 'px',
          left: state.select.rect.left + 'px',
          top: state.select.rect.top + 'px',
        };
      },

    },


    methods: {

      close({ dispatch }) {
        dispatch('SELECT_CLOSE');
      },

      change({ dispatch }, value) {
        dispatch('SELECT_CHANGE_APPLY', { value });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-select-popup
    bottom: 0
    display: flex
    flex-direction: column
    left: 0
    position: absolute
    right: 0
    top: 0
    z-index: 2000

  .x4-inside
    @include background-color($white)
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)
    display: flex
    flex-direction: column
    max-height: 304px
    padding: 8px 0
    position: relative
    z-index: 20

    .x4-select-popup.x4-enter > &, .x4-select-popup.x4-leave-to > &
      max-height: 0
      padding: 0

    .x4-select-popup.x4-enter > &, .x4-select-popup.x4-enter-to > &, .x4-select-popup.x4-leave > &, .x4-select-popup.x4-leave-to > &
      overflow-y: hidden!important

</style>
