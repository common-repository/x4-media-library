<template lang="pug">

  a.x4-plugin-button(
    target="_blank"
    href="https://codecanyon.net/item/x4-media-library-for-wordpress/24017686")

    UILabel(
      :label="label")

    UIRipple

</template>


<script>

  import i18n from '~/utils/i18n';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    components: {
      UILabel,
      UIRipple,
    },


    computed: {

      label() {
        return i18n.__('X4 Media Library', 'x4-media-library');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-plugin-button
    align-items: center
    display: flex
    justify-content: center
    padding: 0 12px
    position: relative
    text-decoration: none
    width: 100%

    &:hover
      @include background-color($white, .08)

  .x4-logo
    @include color($white)
    height: 32px
    font-size: 32px
    width: 32px
  
  .x4-ui-label
    @include color($white)
    flex-shrink: 100000
    font-size: 20px
    line-height: 1.5

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($white, .16)

</style>
