<template lang="pug">

  div.x4-move-icon

    UIIcon(
      icon="file_copy"
      :size="64")

    div.x4-count
      | {{ count }}

</template>


<script>

  import UIIcon from '~/components/ui/Icon';


  export default {

    components: {
      UIIcon,
    },


    created({ dispatch }) {
      dispatch('MOVE_ICON_INIT', { moveIcon: this });
    },


    computed: {

      count({ state }) {
        return state.move.folders.length + state.move.files.length;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-move-icon
    align-items: flex-start
    display: flex
    flex-direction: column
    left: -1000000px
    position: absolute
    top: -1000000px
    z-index: 1000

  .x4-ui-icon
    @include color($accent)

  .x4-count
    @include color($white)
    font-size: 16px
    left: 0
    line-height: 1.5
    padding-left: 8px
    position: absolute
    right: 0
    text-align: center
    top: 35px
    z-index: 1

</style>
