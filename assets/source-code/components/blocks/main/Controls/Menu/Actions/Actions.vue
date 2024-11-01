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
  import Action from './Action';


  export default {

    components: {
      Action,
    },


    computed: {

      actions({ state, getters, dispatch }) {
        return [
          {
            icon: 'arrow_upward',
            label: i18n.__('Up', 'x4-media-library'),
            visible: getters['centerColumn'].width >= 460,
            disabled: (state.search.text === '' && state.current.dir === null),
            click: () => {
              dispatch('CURRENT_UP_APPLY');
            },
          },
          {
            icon: 'create_new_folder',
            label: i18n.__('Add Folder', 'x4-media-library'),
            visible: true,
            click: () => {
              dispatch('ADD_FOLDER_START', { block: 'explorer', folder: state.current });
            },
          },
          {
            icon: 'cloud_upload',
            label: i18n.__('Upload Files', 'x4-media-library'),
            visible: true,
            click: () => {
              dispatch('UPLOADER_BUTTON_CLICK', { target: state.current });
            },
          },
          {
            icon: 'tab_unselected',
            label: i18n.__('Select All', 'x4-media-library'),
            visible: getters['centerColumn'].width >= 460,
            click: () => {
              dispatch('SELECT_ALL');
            },
          },
        ];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-actions
    align-items: center
    display: flex

</style>
