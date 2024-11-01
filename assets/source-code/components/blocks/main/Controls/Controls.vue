<template lang="pug">

  transition(
    appear
    name="x4"
    :css="true"
    @leave="leave")

    div.x4-controls-popup.x4-transition

      UIBackdrop(
        @click.native.stop="close")

      UISlidedown.x4-inside(
        ref="slidedown"
        :opened="opened")

        ViewTab(
          v-if="active === 'view'"
          key="view")

        SortbyTab(
          v-else-if="active === 'sortby'"
          key="sortby")

        FiltersTab(
          v-else-if="active === 'filters'"
          key="filters")

        SearchTab(
          v-else-if="active === 'search'"
          key="search")

</template>


<script>

  import UIBackdrop from '~/components/ui/Backdrop';
  import UISlidedown from '~/components/ui/Slidedown';
  import ViewTab from './tabs/View';
  import SortbyTab from './tabs/Sortby';
  import FiltersTab from './tabs/Filters';
  import SearchTab from './tabs/Search';


  export default {

    components: {
      UIBackdrop,
      UISlidedown,
      ViewTab,
      SortbyTab,
      FiltersTab,
      SearchTab,
    },


    data() {
      return {
        opened: false,
      };
    },


    mounted() {
      this.opened = true;
    },


    computed: {

      active({ state }) {
        return state.controls.active;
      },

    },


    methods: {

      leave() {
        this.$refs.slidedown.leave();
      },

      close({ dispatch }) {
        dispatch('CONTROLS_CLOSE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-controls-popup
    align-items: flex-end
    bottom: 0
    display: flex
    flex-direction: column
    left: 0
    position: absolute
    right: 0
    top: 0
    z-index: 5

  .x4-inside
    @include background-color($white)
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)
    display: flex
    flex-direction: column
    max-width: 100%
    position: relative
    width: 480px
    z-index: 20

</style>
