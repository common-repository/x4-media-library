<template lang="pug">

  transition(name="x4" appear)

    div.x4-up-button.x4-transition(
      @click.stop="click")

      UIIcon(
        icon="expand_less"
        :size="24")

      UIRipple

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    components: {
      UIIcon,
      UIRipple,
    },


    methods: {

      click({ dispatch }) {
        dispatch('UP_BUTTON_CLICK');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-up-button
    align-items: center
    @include background-color($black, .16)
    border-radius: 50%
    bottom: 16px
    cursor: pointer
    display: flex
    justify-content: center
    height: 48px
    position: absolute
    right: 16px
    width: 48px
    z-index: 1

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)
      right: 24px

    @supports (display:-ms-grid)
      right: 24px

    &:hover
      @include background-color($black, .32)

    &.x4-enter, &.x4-leave-to
      opacity: 0

  .x4-ui-icon
    @include color($black, .54)

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($black, .16)

</style>
