<template lang="pug">

  div.x4-file

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

      file({ state }) {
        return state.context.entity;
      },

      items({ state, dispatch }) {
        return [
          {
            visible: this.file.mime === 'image',
            icon: 'edit',
            label: i18n.__('Edit', 'x4-media-library'),
            click: () => {
              dispatch('ATTACHMENT_EDIT', { file: this.file });
            },
          },
          {
            visible: true,
            icon: 'text_fields',
            label: i18n.__('Rename', 'x4-media-library'),
            click: () => {
              dispatch('RENAME_START', { block: state.context.block, entity: this.file, type: 'files' });
            },
          },
          {
            visible: true,
            separator: true,
          },
          {
            visible: true,
            icon: 'crop',
            label: i18n.__('Cut', 'x4-media-library'),
            click: () => {
              dispatch('CLIPBOARD_START_APPLY', { op: 'cut', folders: {}, files: { [this.file.id]: this.file } });
            },
          },
          {
            visible: true,
            icon: 'file_copy',
            label: i18n.__('Copy', 'x4-media-library'),
            click: () => {
              dispatch('CLIPBOARD_START_APPLY', { op: 'copy', folders: {}, files: { [this.file.id]: this.file } });
            },
          },
          {
            visible: true,
            separator: true,
          },
          /*{
            visible: true,
            icon: 'cloud_download',
            label: i18n.__('Download', 'x4-media-library'),
            click: () => {
              
            },
          },*/
          {
            visible: true,
            icon: 'delete',
            label: i18n.__('Delete', 'x4-media-library'),
            click: () => {
              dispatch('DELETE_APPLY', { folders: [], files: [this.file] });
            },
          },
        ];
      },

    },

  };

</script>
