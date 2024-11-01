<template lang="pug">

  div.x4-menu-button-left(
    @click.stop="toggle")

    UIIcon(
      icon="menu"
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

      toggle({ dispatch }) {
        dispatch('LEFT_COLUMN_MANUALLY_TOGGLE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-menu-button-left
    align-items: center
    border-radius: 50%
    cursor: pointer
    display: flex
    justify-content: center
    height: 48px
    position: relative
    width: 48px

    &:hover
      @include background-color($white, .08)

  .x4-ui-icon
    @include color($white)

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($white, .16)

</style>
