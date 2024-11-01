<template lang="pug">
  
  div.x4-actions

    Action(
      v-for="(action, index) in actions"
      v-if="action.visible"
      :key="index"
      :action="action")

</template>


<script>

  import i18n from '~/utils/i18n';
  import Action from '../../Action';


  export default {

    components: {
      Action,
    },


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

      actions({ state, getters, dispatch }) {
        return [
          {
            icon: 'text_fields',
            label: i18n.__('Rename', 'x4-media-library'),
            disabled: this.folder.path === '',
            visible: true,
            click: () => {
              dispatch('RENAME_START', { block: 'info', entity: this.folder, type: 'folders' });
            },
          },
          {
            icon: 'crop',
            label: i18n.__('Cut', 'x4-media-library'),
            flylabel: i18n.__('Done!', 'x4-media-library'),
            disabled: this.folder.path === '',
            visible: true,
            click: () => {
              dispatch('CLIPBOARD_START_APPLY', { op: 'cut', folders: { [this.folder.path]: this.folder }, files: {} });
            },
          },
          {
            icon: 'file_copy',
            label: i18n.__('Copy', 'x4-media-library'),
            flylabel: i18n.__('Done!', 'x4-media-library'),
            disabled: this.folder.path === '',
            visible: true,
            click: () => {
              dispatch('CLIPBOARD_START_APPLY', { op: 'copy', folders: { [this.folder.path]: this.folder }, files: {} });
            },
          },
          {
            icon: 'assignment',
            label: i18n.__('Paste', 'x4-media-library'),
            disabled: getters['clipboard/all/count'] === 0 || (state.clipboard.op === 'cut' && !!state.clipboard.exclude[this.folder.path]),
            visible: true,
            click: () => {
              dispatch('CLIPBOARD_FINISH', { target: this.folder });
            },
          },
          /*{
            small: true,
            icon: 'cloud_download',
            label: i18n.__('Download', 'x4-media-library'),
            visible: true,
            click: () => {
              
            },
          },*/
          {
            icon: 'delete',
            label: i18n.__('Delete', 'x4-media-library'),
            disabled: this.folder.path === '',
            visible: true,
            click: () => {
              dispatch('DELETE_APPLY', { folders: [this.folder], files: [] });
            },
          },
        ];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-actions
    display: flex
    flex-wrap: wrap
    justify-content: center
    padding-top: 32px

</style>
