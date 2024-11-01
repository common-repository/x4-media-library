<template lang="pug">

  div.x4-folder(
    @click="click")

    UILabel.x4-name(
      :label="folder.base")

    UIRipple

</template>


<script>

  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    props: [
      'folder',
    ],


    components: {
      UILabel,
      UIRipple,
    },


    methods: {

      click({ dispatch }) {
        dispatch('CURRENT_CHANGE_APPLY', { folder: this.folder });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-folder
    border-radius: 8px
    @include color($white)
    cursor: pointer
    display: flex
    opacity: 1
    padding: 4px 12px
    position: relative

    &:hover
      @include background-color($white, .08)

    &.x4-enter, &.x4-leave-to
      opacity: 0

  .x4-name
    font-size: 20px
    line-height: 1.5

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($white, .16)

</style>
