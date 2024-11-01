<template lang="pug">

  transition(name="x4" appear)
    div.x4-folder(
      :class="classObject")

      div.x4-entity(
        :draggable="true"
        @click.stop="click"
        @contextmenu.prevent.stop="contextMenu"
        @dragstart.stop="dragStart"
        @dragend.stop="dragEnd"
        @drag.stop
        @dragenter="dragEnter"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="drop")

        div.x4-space(
          v-for="n in spacesCount")

        UIIcon.x4-expand.x4-transition(
          v-if="depth > 1"
          icon="chevron_right"
          :size="22"
          @click.native.stop="toggle"
          @mousedown.native.stop)

        UIFolderIcon(
          :folder="folder"
          :size="24")

        div.x4-name

          Rename(
            v-if="renameVisible"
            :rows="1")

          UILabel.x4-name-text(
            v-else
            :label="folder.base")

        UILabel.x4-count(
          :label="count")

        UIRipple

      UISlidedown.x4-subfolders(
        :opened="folder.tree.expanded && subfolders.length > 0")

        AddFolder(
          key="add-folder"
          v-if="addFolderVisible"
          :depth="depth + 1")

        Folder(
          v-for="subfolder in sortedSubfolders"
          :key="subfolder.path"
          :folder="subfolder"
          :depth="depth + 1")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';
  import UIFolderIcon from '~/components/ui/FolderIcon';
  import UISlidedown from '~/components/ui/Slidedown';
  import Rename from '~/components/blocks/main/Rename';
  import AddFolder from './AddFolder';
  import Folder from './Folder';


  export default {

    props: [
      'folder',
      'depth',
    ],


    components: {
      UIIcon,
      UILabel,
      UIRipple,
      UISlidedown,
      UIFolderIcon,
      Rename,
      AddFolder,
      Folder,
    },


    beforeCreate: function() {
      this.$options.components.Folder = require('./Folder').default;
    },


    computed: {

      spacesCount() {
        return this.depth > 2
          ?  this.depth - 2
          : 0;
      },

      count({ getters }) {
        return getters['files/count'][this.folder.path] || 0;
      },

      subfolders({ getters }) {
        return getters['folders/perDir'][this.folder.path]
          ? getters['folders/perDir'][this.folder.path]
          : [];
      },

      sortedSubfolders({ getters }) {
        return getters['folders/tree/sorted'][this.folder.path]
          ? getters['folders/tree/sorted'][this.folder.path]
          : [];
      },

      renameVisible() {
        return this.folder.tree.rename;
      },

      addFolderVisible({ state }) {
        return state.addFolder.visible && state.addFolder.block === 'tree' && state.addFolder.folder.dir === this.folder.path;
      },

      classObject({ state }) {
        let classes =  {
          'x4-active': this.folder === state.current,
          'x4-has-subfolders': this.subfolders.length > 0,
          'x4-expanded': this.folder.tree.expanded,
          'x4-context': this.folder.tree.context,
          'x4-moveto': this.folder.tree.moveto,
          'x4-cut': this.folder.tree.cut,
        };

        classes['x4-depth' + (this.depth < 2 ? this.depth : 2)] = true;

        return classes;
      },

    },


    methods: {

      toggle({ dispatch }) {
        dispatch('TREE_EXPANDED_TOGGLE', { folder: this.folder });
      },

      click({ dispatch }) {
        dispatch('CURRENT_CHANGE_APPLY', { folder: this.folder });
      },

      contextMenu({ state, dispatch }, event) {
        dispatch('CONTEXT_SHOW', { event, block: 'tree', entity: this.folder, type: 'folders', single: true });
      },

      dragStart({ dispatch }, event) {
        dispatch('MOVE_DRAG_START', { event, block: 'tree', entity: this.folder, type: 'folders' });
      },

      dragEnd({ dispatch }, event) {
        dispatch('MOVE_DRAG_END', { event, block: 'tree', entity: this.folder, type: 'folders' });
      },

      dragEnter({ dispatch }, event) {
        dispatch('MOVE_DRAG_ENTER', { event, block: 'tree', folder: this.folder });
      },

      dragOver({ dispatch }, event) {
        dispatch('MOVE_DRAG_OVER', { event, block: 'tree', folder: this.folder });
      },

      dragLeave({ dispatch }, event) {
        dispatch('MOVE_DRAG_LEAVE', { event, block: 'tree', folder: this.folder });
      },

      drop({ dispatch }, event) {
        dispatch('MOVE_DROP', { event, block: 'tree', folder: this.folder });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-folder
    display: flex
    flex-direction: column

  .x4-entity
    align-items: center
    display: flex
    flex-shrink: 0
    height: 40px
    padding-left: 8px
    padding-right: 12px
    position: relative

    &:hover
      @include background-color($primary, .08)

    .x4-folder.x4-active > &
      @include background-color($primary, .16)

    .x4-folder.x4-context > &
      @include background-color($primary, .16)

    .x4-folder.x4-moveto > &
      @include background-color($accent, .16)

    .x4-folder.x4-depth1 > &
      padding-left: 12px

  .x4-subfolders
    display: flex
    flex-flow: column

  .x4-space
    width: 8px

  .x4-expand
    @include color(black, .54)
    cursor: pointer
    visibility: hidden

    .x4-folder.x4-has-subfolders > .x4-entity > &
      visibility: visible

    .x4-folder.x4-expanded > .x4-entity > &
      transform: rotate(90deg)

  .x4-ui-folder-icon
    .x4-folder.x4-cut > .x4-entity > &
      opacity: .48

  .x4-name
    display: flex
    flex-direction: column
    flex-shrink: 100000
    padding: 0 2px 0 4px
    position: relative
    width: 100%

  .x4-rename
    font-size: 13px
    line-height: 1.5
    margin-left: -1px
    padding: 0 4px

  .x4-name-text
    cursor: default
    font-size: 13px
    line-height: 1.5

  .x4-rename /deep/ .x4-input
    font-size: 13px
    line-height: 1.5

  .x4-count
    @include color($black, .54)
    flex-shrink: 0
    font-size: 11px
    line-height: 1.5
    padding-top: 1px

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($primary, .08)

</style>
