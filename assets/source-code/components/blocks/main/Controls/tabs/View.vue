<template lang="pug">

  div.x4-view-tab.x4-transition

    UILabel(
      :label="labelView")

    UIRadioButtons(
      :options="views"
      :value="view"
      @change="change")

    div.x4-buttons

      UIButton.x4-reset(
        icon="settings_backup_restore"
        :label="labelReset"
        @click="reset")

      UIButton.x4-close(
        type="gray"
        icon="close"
        :label="labelClose"
        @click="close")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UILabel from '~/components/ui/Label';
  import UIButton from '~/components/ui/Button';
  import UIRadioButtons from '~/components/ui/RadioButtons';


  export default {

    components: {
      UILabel,
      UIButton,
      UIRadioButtons,
    },


    computed: {

      view({ state }) {
        return state.view;
      },

      views() {
        return [
          {
            value: 'huge',
            label: i18n.__('huge icons', 'x4-media-library'),
          },
          {
            value: 'large',
            label: i18n.__('large icons', 'x4-media-library'),
          },
          {
            value: 'medium',
            label: i18n.__('medium icons', 'x4-media-library'),
          },
          {
            value: 'small',
            label: i18n.__('small icons', 'x4-media-library'),
          },
        ];
      },

      labelView() {
        return i18n.__('View', 'x4-media-library');
      },

      labelReset() {
        return i18n.__('Reset', 'x4-media-library');
      },

      labelClose() {
        return i18n.__('Close', 'x4-media-library');
      },

    },


    methods: {

      close({ dispatch }) {
        dispatch('CONTROLS_CLOSE');
      },

      reset({ dispatch }) {
        dispatch('VIEW_RESET');
      },

      change({ dispatch }, view) {
        dispatch('VIEW_CHANGE_APPLY', { view });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-view-tab
    display: flex
    flex-direction: column
    flex-shrink: 0
    padding: 24px 32px 16px

  .x4-ui-radio-buttons /deep/ .x4-radio-button
    height: 32px
    padding-left: 0

  .x4-ui-label
    font-size: 18px
    font-weight: 500
    line-height: 1.5
    padding-bottom: 8px

  .x4-buttons
    display: flex
    padding-top: 24px

  .x4-close
    padding-left: 8px

</style>
