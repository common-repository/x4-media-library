<template lang="pug">

  div.x4-folder(
    :class="classObject")

    UICheckbox(
      :disabled="folder.reserved"
      :value="folder.ignore"
      @change="change")

    UIFolderIcon(
      :folder="folder"
      :size="32")

    UILabel(
      :label="folder.path")

    UIIcon.x4-remove.x4-transition(
      v-if="!folder.reserved"
      icon="close"
      :size="16"
      @click.native.stop="remove")

</template>


<script>

  import UICheckbox from '~/components/ui/Checkbox';
  import UIFolderIcon from '~/components/ui/FolderIcon';
  import UILabel from '~/components/ui/Label';
  import UIIcon from '~/components/ui/Icon';


  export default {

    props: [
      'folder',
    ],


    components: {
      UICheckbox,
      UIFolderIcon,
      UILabel,
      UIIcon,
    },


    computed: {

      classObject() {
        return {
          'x4-disabled': this.folder.reserved,
        };
      },

    },


    methods: {

      change({ dispatch }, value) {
        dispatch('IGNORED_FOLDER_IGNORE_CHANGE_APPLY', { folder: this.folder, ignore: value });
      },

      remove({ dispatch }, value) {
        dispatch('IGNORED_FOLDER_DELETE', { folder: this.folder });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-folder
    align-items: center
    display: flex

    &:hover
      @include background-color($black, .04)

    &.x4-disabled
      background-color: transparent

  .x4-ui-folder-icon
    padding: 0 6px

  .x4-ui-label
    flex-shrink: 100000
    font-size: 14px
    line-height: 1.5
    padding-right: 4px
    padding-top: 2px
    width: 100%

  .x4-remove
    cursor: pointer
    opacity: 0
    padding-right: 8px

    .x4-folder:hover > &
      opacity: 1

</style>
