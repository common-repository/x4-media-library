<template lang="pug">

  div.x4-filters.x4-transition

    div.x4-columns

      div.x4-file-type

        UILabel(
          :label="labelDate")

        YearFilter
        MonthFilter
        DayFilter

      div.x4-upload-date

        UILabel(
          :label="labelMime")

        MimeFilter
        ExtFilter

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
  import YearFilter from './filters/Year';
  import MonthFilter from './filters/Month';
  import DayFilter from './filters/Day';
  import MimeFilter from './filters/Mime';
  import ExtFilter from './filters/Ext';


  export default {

    components: {
      UILabel,
      UIButton,
      YearFilter,
      MonthFilter,
      DayFilter,
      MimeFilter,
      ExtFilter,
    },


    computed: {

      labelDate() {
        return i18n.__('Upload Date', 'x4-media-library');
      },

      labelMime() {
        return i18n.__('File Type', 'x4-media-library');
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
        dispatch('FILTERS_RESET');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-filters
    display: flex
    flex-direction: column
    flex-shrink: 0
    padding: 24px 32px 16px

  .x4-columns
    display: flex

  .x4-file-type
    display: flex
    flex-direction: column
    padding-right: 8px
    width: 50%

  .x4-upload-date
    display: flex
    flex-direction: column
    padding-left: 8px
    width: 50%

  .x4-ui-label
    font-size: 18px
    font-weight: 500
    line-height: 1.5
    padding-bottom: 8px

  .x4-ui-select
    padding-bottom: 8px

  .x4-buttons
    display: flex
    padding-top: 24px

  .x4-close
    padding-left: 8px

</style>
