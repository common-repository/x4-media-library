<template lang="pug">

  div.x4-multiple

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

      items({ state, dispatch }) {
        return [
          {
            visible: true,
            icon: 'crop',
            label: i18n.__('Cut', 'x4-media-library'),
            click: () => {
              let folders = Object.assign({}, state.selected.folders);
              let files = Object.assign({}, state.selected.files);

              dispatch('CLIPBOARD_START_APPLY', { op: 'cut', folders, files });
            },
          },
          {
            visible: true,
            icon: 'file_copy',
            label: i18n.__('Copy', 'x4-media-library'),
            click: () => {
              let folders = Object.assign({}, state.selected.folders);
              let files = Object.assign({}, state.selected.files);

              dispatch('CLIPBOARD_START_APPLY', { op: 'copy', folders, files });
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
              let folders = Object.values(state.selected.folders);
              let files = Object.values(state.selected.files);

              dispatch('DELETE_APPLY', { folders, files });
            },
          },
        ];
      },

    },

  };

</script>
