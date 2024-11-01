<template lang="pug">

  div.x4-selection.x4-scrollable.x4-scrollable-horiz

    div.x4-left-box

      UILabel.x4-count(
        :label="labelCount")

      UILabel.x4-clear(
        :label="labelClear"
        @click.native.stop="clear")

    SlickList.x4-right-box(
      :value="items"
      :distance="4"
      lockAxis="x"
      axis="x"
      helperClass="x4-dragging"
      @input="change")

      File(
        v-for="(file, index) of items"
        :index="index"
        :key="file.id"
        :file="file")
    
</template>


<script>

  import i18n from '~/utils/i18n';
  import { SlickList } from 'vue-slicksort';
  import UILabel from '~/components/ui/Label';
  import File from './File';


  export default {

    components: {
      SlickList,
      UILabel,
      File,
    },


    computed: {

      items({ state }) {
        return state.selection.items;
      },

      labelCount({ state }) {
        return i18n.__('%1$d selected', 'x4-media-library').replace('%1$d', state.selection.items.length);
      },

      labelClear({ state }) {
        return i18n.__('clear', 'x4-media-library');
      },

    },


    methods: {

      change({ dispatch }, items) {
        dispatch('SELECTION_ITEMS_REORDER', { items });
      },

      clear({ dispatch }) {
        dispatch('SELECTION_ITEMS_CLEAR');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-selection
    display: flex
    width: 100%

  .x4-left-box
    display: flex
    flex-direction: column
    flex-shrink: 0
    justify-content: center
    padding: 0 16px
    width: 100px

  .x4-right-box
    align-items: center
    display: flex
    flex-shrink: 0

  .x4-count
    font-size: 12px
    font-weight: 500
    line-height: 1.5

  .x4-clear
    align-self: flex-start
    @include color($primary)
    cursor: pointer
    font-size: 12px
    line-height: 1.5

    &:hover
      @include color($primary, .64)

</style>
