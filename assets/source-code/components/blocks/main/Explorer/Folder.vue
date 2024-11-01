<template lang="pug">

  Entity.x4-folder(
    :entity="folder"
    type="folders"
    unique="path"
    @dblclick.native.stop="dblclick"
    @dragenter.native="dragEnter"
    @dragover.native="dragOver"
    @dragleave.native="dragLeave"
    @drop.native="drop")

    template(
      v-slot:main)

      UIFolderIcon(
        :folder="folder"
        :size="size")

      UILabel.x4-count(
        :style="styleCount"
        :label="count")

</template>


<script>

  import { get as getColor } from '~/utils/colors';
  import Entity from './Entity';
  import UIFolderIcon from '~/components/ui/FolderIcon';
  import UILabel from '~/components/ui/Label';
  

  export default {

    props: [
      'folder',
    ],


    components: {
      Entity,
      UIFolderIcon,
      UILabel,
    },


    computed: {

      size({ state }) {
        return state.explorer.entitySize;
      },

      count({ getters }) {
        return getters['files/count'][this.folder.path] || 0;
      },

      styleCount() {
        return {
          'background-color': getColor(this.folder.color, true),
        };
      },

    },


    methods: {

      dblclick({ dispatch }) {
        dispatch('CURRENT_CHANGE_APPLY', { folder: this.folder });
      },

      dragEnter({ dispatch }, event) {
        dispatch('MOVE_DRAG_ENTER', { event, block: 'explorer', folder: this.folder });
      },

      dragOver({ dispatch }, event) {
        dispatch('MOVE_DRAG_OVER', { event, block: 'explorer', folder: this.folder });
      },

      dragLeave({ dispatch }, event) {
        dispatch('MOVE_DRAG_LEAVE', { event, block: 'explorer', folder: this.folder });
      },

      drop({ dispatch }, event) {
        dispatch('MOVE_DROP', { event, block: 'explorer', folder: this.folder });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-folder
    &.x4-leave, &.x4-leave-to
      display: none

  .x4-count
    align-items: center
    color: #fff
    display: flex
    justify-content: center
    line-height: 1.5
    position: absolute

    .x4-entities.x4-view-huge > .x4-entity > .x4-wrapper > .x4-inside > .x4-preview > &
      border-radius: 8px
      font-size: 12px
      padding: 1px 8px 0
      right: 5%
      top: 30%

    .x4-entities.x4-view-large > .x4-entity > .x4-wrapper > .x4-inside > .x4-preview > &
      border-radius: 6px
      font-size: 10px
      padding: 0 6px
      right: 5%
      top: 30%

    .x4-entities.x4-view-medium > .x4-entity > .x4-wrapper > .x4-inside > .x4-preview > &
      border-radius: 4px
      font-size: 8px
      padding: 0 4px
      right: 5%
      top: 30%

    .x4-entities.x4-view-small > .x4-entity > .x4-wrapper > .x4-inside > .x4-preview > &
      border-radius: 2px
      font-size: 6px
      padding: 1px 2px 0
      right: 5%
      top: 30%

</style>
