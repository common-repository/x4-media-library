<template lang="pug">

  transition(name="x4" appear)
    div.x4-info-message.x4-transition

      div.x4-inside

        UIIcon(
          icon="error"
          :size="32")

        UILabel(
          :label="label")
    
</template>


<script>

  import i18n from '~/utils/i18n';
  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';


  export default {

    components: {
      UIIcon,
      UILabel,
    },


    computed: {

      label() {
        return i18n.__('You have to reload the page in the browser in order to apply changes to the Media Library.', 'x4-media-library');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-info-message
    display: flex
    flex-direction: column

    &.x4-enter, &.x4-leave-to
      opacity: 0

  .x4-inside
    align-items: center
    @include background-color($accent, .08)
    display: flex
    padding: 8px 16px

  .x4-ui-icon
    @include color($accent)

  .x4-ui-label
    font-size: 13px
    line-height: 1.5
    padding-left: 16px
    user-select: text

</style>
