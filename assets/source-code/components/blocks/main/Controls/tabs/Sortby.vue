<template lang="pug">

  div.x4-sortby-tab.x4-transition

    div.x4-columns

      div.x4-sort-field

        UILabel(
          :label="labelSortby")

        UIRadioButtons(
          :options="fields"
          :value="field"
          @change="fieldChange")

      div.x4-sort-type

        UILabel(
          :label="labelDirection")

        UIRadioButtons(
          :options="types"
          :value="type"
          @change="typeChange")

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

      field({ state }) {
        return state.sortby.field;
      },

      type({ state }) {
        return state.sortby.type;
      },

      fields() {
        return [
          {
            value: 'uploaded',
            label: i18n.__('upload date', 'x4-media-library'),
          },
          {
            value: 'baselc',
            label: i18n.__('file name', 'x4-media-library'),
          },
          {
            value: 'mime',
            label: i18n.__('file type', 'x4-media-library'),
          },
        ];
      },

      types() {
        return [
          {
            value: 'asc',
            label: i18n.__('ascending', 'x4-media-library'),
          },
          {
            value: 'desc',
            label: i18n.__('descending', 'x4-media-library'),
          },
        ];
      },

      labelSortby() {
        return i18n.__('Sort by', 'x4-media-library');
      },

      labelDirection() {
        return i18n.__('Direction', 'x4-media-library');
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
        dispatch('SORTBY_RESET');
      },

      fieldChange({ dispatch }, field) {
        dispatch('SORTBY_FIELD_CHANGE_APPLY', { field });
      },

      typeChange({ dispatch }, type) {
        dispatch('SORTBY_TYPE_CHANGE_APPLY', { type });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-sortby-tab
    display: flex
    flex-direction: column
    flex-shrink: 0
    padding: 24px 32px 16px

  .x4-ui-radio-buttons /deep/ .x4-radio-button
    height: 32px
    padding-left: 0

  .x4-columns
    display: flex

  .x4-sort-field
    display: flex
    flex-direction: column
    padding-right: 8px
    width: 50%

  .x4-sort-type
    display: flex
    flex-direction: column
    padding-left: 8px
    width: 50%

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
