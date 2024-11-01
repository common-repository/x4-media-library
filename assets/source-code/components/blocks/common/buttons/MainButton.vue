<template lang="pug">

  div.x4-main-button(
    @click.stop="click")

    UIIcon(
      icon="arrow_back"
      :size="24")

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
        return i18n.__('Main Screen', 'x4-media-library');
      },

    },


    methods: {

      click({ dispatch }) {
        dispatch('MAIN_BUTTON_CLICK');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-main-button
    align-items: center
    cursor: pointer
    display: flex
    justify-content: center
    padding: 0 12px
    position: relative
    width: 100%

    &:hover
      @include background-color($black, .04)

  .x4-ui-icon
    @include color($black, .54)

  .x4-ui-label
    flex-shrink: 100000
    font-size: 14px
    line-height: 1.5
    padding-left: 4px

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($black, .08)

</style>
