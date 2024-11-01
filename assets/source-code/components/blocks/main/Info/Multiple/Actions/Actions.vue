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

      actions({ state, dispatch }) {
        return [
          {
            icon: 'crop',
            label: i18n.__('Cut', 'x4-media-library'),
            flylabel: i18n.__('Done!', 'x4-media-library'),
            visible: true,
            click: () => {
              let folders = Object.assign({}, state.selected.folders);
              let files = Object.assign({}, state.selected.files);

              dispatch('CLIPBOARD_START_APPLY', { op: 'cut', folders, files });
            },
          },
          {
            icon: 'file_copy',
            label: i18n.__('Copy', 'x4-media-library'),
            flylabel: i18n.__('Done!', 'x4-media-library'),
            visible: true,
            click: () => {
              let folders = Object.assign({}, state.selected.folders);
              let files = Object.assign({}, state.selected.files);

              dispatch('CLIPBOARD_START_APPLY', { op: 'copy', folders, files });
            },
          },
          /*
          {
            small: true,
            icon: 'cloud_download',
            label: i18n.__('Download', 'x4-media-library'),
            click: () => {
              
            },
          },*/
          {
            icon: 'delete',
            label: i18n.__('Delete', 'x4-media-library'),
            visible: true,
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


<style lang="sass" scoped>

  .x4-actions
    display: flex
    flex-wrap: wrap
    justify-content: center
    padding-top: 32px

</style>
