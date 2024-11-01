<template lang="pug">

  div.x4-folder

    template(
      v-for="(item, index) in items")

      Action(
        v-if="item.visible && !item.separator"
        :action="item"
        :key="index")

      Separator(
        v-if="item.visible && item.separator"
        :key="index")

</template>


<script>

  import i18n from '~/utils/i18n';
  import Separator from '../Separator';
  import Action from '../Action';

  
  export default {

    components: {
      Separator,
      Action,
    },


    computed: {

      folder({ state }) {
        return state.context.entity;
      },

      items({ state, getters, dispatch }) {
        return [
          {
            icon: 'text_fields',
            label: i18n.__('Rename', 'x4-media-library'),
            visible: state.context.single && this.folder.path !== '',
            click: () => {
              dispatch('RENAME_START', { block: state.context.block, entity: this.folder, type: 'folders' });
            },
          },
          {
            icon: 'tab_unselected',
            label: i18n.__('Select All', 'x4-media-library'),
            visible: state.context.block === 'explorer' && !state.context.single,
            click: () => {
              dispatch('SELECT_ALL');
            },
          },
          {
            separator: true,
            visible: (state.context.single && this.folder.path !== '') || (state.context.block === 'explorer' && !state.context.single),
          },
          {
            icon: 'create_new_folder',
            label: i18n.__('Add Folder', 'x4-media-library'),
            visible: state.context.block === 'tree' || (state.context.block === 'explorer' && !state.context.single),
            disabled: state.context.block === 'explorer' && !state.context.single && state.search.text,
            click: () => {
              dispatch('ADD_FOLDER_START', { block: state.context.block, folder: this.folder });
            },
          },
          {
            icon: 'cloud_upload',
            label: i18n.__('Upload Files', 'x4-media-library'),
            visible: state.context.block === 'tree' || (state.context.block === 'explorer' && !state.context.single),
            disabled: state.context.block === 'explorer' && !state.context.single && state.search.text,
            click: () => {
              dispatch('UPLOADER_BUTTON_CLICK', { target: this.folder });
            },
          },
          {
            separator: true,
            visible: state.context.block === 'tree' || (state.context.block === 'explorer' && !state.context.single),
          },
          {
            icon: 'crop',
            label: i18n.__('Cut', 'x4-media-library'),
            visible: state.context.single && this.folder.path !== '',
            click: () => {
              dispatch('CLIPBOARD_START_APPLY', { op: 'cut', folders: { [this.folder.path]: this.folder }, files: {} });
            },
          },
          {
            icon: 'file_copy',
            label: i18n.__('Copy', 'x4-media-library'),
            visible: state.context.single && this.folder.path !== '',
            click: () => {
              dispatch('CLIPBOARD_START_APPLY', { op: 'copy', folders: { [this.folder.path]: this.folder }, files: {} });
            },
          },
          {
            icon: 'assignment',
            label: i18n.__('Paste', 'x4-media-library'),
            disabled: getters['clipboard/all/count'] === 0 || (state.clipboard.op === 'cut' && !!state.clipboard.exclude[this.folder.path]) || (state.context.block === 'explorer' && !state.context.single && state.search.text),
            visible: true,
            click: () => {
              dispatch('CLIPBOARD_FINISH', { target: this.folder });
            },
          },
          {
            separator: true,
            visible: state.context.single && this.folder.path !== '',
          },
          /*{
            icon: 'cloud_download',
            label: i18n.__('Download', 'x4-media-library'),
            visible: state.context.single,
            click: () => {
              
            },
          },*/
          {
            icon: 'delete',
            label: i18n.__('Delete', 'x4-media-library'),
            visible: state.context.single && this.folder.path !== '',
            click: () => {
              dispatch('DELETE_APPLY', { folders: [this.folder], files: [] });
            },
          },
        ];
      },

    },

  };

</script>
