<template lang="pug">

  div.x4-explorer.x4-scrollable(
    @scroll.stop="scroll"
    @dragenter="dragOver"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="drop")

    div.x4-inside(
      draggable="true"
      @mouseup.stop="mouseUp"
      @contextmenu.prevent.stop="contextMenu"
      @dragstart.stop="dragStart"
      @dragend.stop="dragEnd"
      @drag.stop="drag")

      SelectFrame(
        v-if="selectFrameVisible")

      transition(name="x4")
        div.x4-entities.x4-transition(
          :class="classEntities"
          :key="current.path")

          AddFolder(
            v-if="addFolderVisible"
            key="add_folder")

          Folder(
            v-for="folder of folders"
            :key="'folder_'+folder.path"
            :folder="folder")

          File(
            v-for="file of files"
            :key="'file_'+file.id"
            :file="file")

</template>


<script>

  import SelectFrame from './SelectFrame';
  import AddFolder from './AddFolder';
  import Folder from './Folder';
  import File from './File';


  export default {

    components: {
      SelectFrame,
      AddFolder,
      Folder,
      File,
    },


    beforeCreate({ storage, dispatch }) {
      dispatch('EXPLORER_INIT', { explorer: this });
    },


    computed: {

      classEntities({ state }) {
        return {
          ['x4-view-' + state.view]: true,
          'x4-multiple': state.selection.multiple,
        };
      },

      selectFrameVisible({ state }) {
        return state.selectFrame.visible;
      },

      addFolderVisible({ state }) {
        return state.addFolder.visible && state.addFolder.block === 'explorer';
      },

      current({ state }) {
        return state.current;
      },

      folders({ getters }) {
        if (getters['explorer'].entitySize) {}
        return getters['folders/explorer/visible'];
      },

      files({ getters }) {
        if (getters['explorer'].entitySize) {}
        return getters['files/explorer/visible'];
      },

    },


    methods: {

      scroll({ dispatch }) {
        dispatch('EXPLORER_SCROLL');
      },

      mouseUp({ dispatch }, event) {
        dispatch('DESELECT_ALL', { event });
      },

      contextMenu({ state, dispatch }, event) {
        dispatch('CONTEXT_SHOW', { event, block: 'explorer', entity: state.current, type: 'folders', single: false });
      },

      dragStart({ dispatch }, event) {
        dispatch('SELECT_FRAME_DRAG_START', { event });
      },

      dragEnd({ dispatch }, event) {
        dispatch('SELECT_FRAME_DRAG_END', { event });
      },

      drag({ dispatch }, event) {
        dispatch('SELECT_FRAME_DRAG', { event });
      },

      dragOver({ dispatch }, event) {
        dispatch('SELECT_FRAME_DRAG_OVER', { event });
      },

      dragLeave({ dispatch }, event) {
        
      },

      drop({ dispatch }, event) {
        
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-explorer
    display: flex
    flex-direction: column
    height: 100%

  .x4-inside
    display: flex
    flex-direction: column
    flex-shrink: 0
    min-height: 100%
    padding: 16px 16px
    position: relative

  .x4-scrollable
    @include scrollbar-color($black, $black, .12, .04, !important)

  .x4-scrollable::-webkit-scrollbar
    @include background-color($black, .04, !important)
    width: 8px!important

  .x4-scrollable::-webkit-scrollbar-thumb
    @include background-color($black, .12, !important)

  .x4-entities
    align-content: flex-start
    align-items: flex-start
    display: flex
    flex-wrap: wrap
    min-height: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

</style>
