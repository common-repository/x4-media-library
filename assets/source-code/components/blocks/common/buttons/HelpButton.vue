<template lang="pug">

  a.x4-help-button(
    target="_blank"
    href="https://codecanyon.net/item/x4-media-library-for-wordpress/24017686/support")

    UIIcon(
      icon="help"
      :size="32")

    UILabel(
      :label="label")

    UIRipple

</template>


<script>

  import i18n from '~/utils/i18n';
  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    components: {
      UIIcon,
      UILabel,
      UIRipple,
    },


    computed: {

      label() {
        return i18n.__('Need Help?', 'x4-media-library');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-help-button
    align-items: center
    cursor: pointer
    display: flex
    justify-content: center
    padding: 0 12px
    position: relative
    text-decoration: none
    width: 100%

    &:hover
      @include background-color($white, .08)

  .x4-ui-icon
    @include color($white)

  .x4-ui-label
    @include color($white)
    flex-shrink: 100000
    font-size: 20px
    line-height: 1.5
    padding-left: 8px

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($white, .16)

</style>
