<template lang="pug">

  Entity.x4-file(
    :entity="file"
    type="files"
    unique="id"
    :class="classObject"
    @dblclick.native.stop="dblclick")

    template(
      v-slot:multiple_remove
      v-if="multipleRemoveVisible")

      UIIcon.x4-multiple-remove(
        :draggable="true"
        icon="close"
        :size="28"
        @mousedown.native.stop
        @mouseup.native.stop
        @click.native.stop="multipleRemove"
        @dblclick.native.stop
        @contextmenu.native.prevent.stop
        @dragstart.native.prevent.stop
        @dragend.native.prevent.stop
        @drag.native.prevent.stop)

    template(
      v-slot:main)

      UIFileIcon(
        :file="file"
        :src="file.thumb"
        :size="size")

</template>


<script>

  import Entity from './Entity';
  import UIIcon from '~/components/ui/Icon';
  import UIFileIcon from '~/components/ui/FileIcon';


  export default {

    props: [
      'file',
    ],


    components: {
      Entity,
      UIIcon,
      UIFileIcon,
    },


    computed: {

      classObject({ state, $frame }) {
        return {
          'x4-selection': this.file.explorer.selection,
        };
      },

      multipleRemoveVisible({ state }) {
        return state.selection.multiple && this.file.explorer.selection;
      },

      size({ state }) {
        return state.explorer.entitySize;
      },

    },


    methods: {

      multipleRemove({ dispatch }) {
        dispatch('SELECTION_ITEM_REMOVE', { item: this.file });
      },

      dblclick({ state, dispatch, $frame }) {
        if ($frame.modal) {
          if (!state.selection.multiple && state.actions.length > 0 && state.actions[0].required) {
            dispatch('ACTION_CLICK', { action: state.actions[0] });
          }
        } else {
          dispatch('ATTACHMENT_EDIT', { file: this.file });
        }
      },

    },

  };

</script>
