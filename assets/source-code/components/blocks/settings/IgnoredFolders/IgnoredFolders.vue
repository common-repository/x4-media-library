<template lang="pug">

  transition(name="x4" appear)
    div.x4-ignored-folders.x4-transition

      div.x4-titles

        UILabel(
          :label="labelCustom")

        UILabel(
          :label="labelReserved")

      InfoMessage(
        v-if="infoMessageVisible")

      div.x4-inside

        CustomFolders
        ReservedFolders

</template>


<script>

  import i18n from '~/utils/i18n';
  import UILabel from '~/components/ui/Label';
  import InfoMessage from '../InfoMessage';
  import CustomFolders from './CustomFolders';
  import ReservedFolders from './ReservedFolders';


  export default {

    components: {
      UILabel,
      InfoMessage,
      CustomFolders,
      ReservedFolders,
    },


    computed: {

      labelCustom() {
        return i18n.__('Custom Folders', 'x4-media-library');
      },

      labelReserved() {
        return i18n.__('Reserved Folders', 'x4-media-library');
      },

      infoMessageVisible({ state }) {
        return state.settings.ignoredFolders.infoMessage.visible;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ignored-folders
    display: flex
    flex-direction: column

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

  .x4-titles
    display: flex

  .x4-ui-label
    font-size: 22px
    line-height: 1.5
    width: 50%

  .x4-info-message
    padding-top: 16px

  .x4-inside
    display: flex

</style>
