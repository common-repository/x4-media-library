<template lang="pug">

  div.x4-preview

    UIIcon(
      icon="view_module"
      :size="size")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';


  export default {

    components: {
      UIIcon,
    },


    computed: {

      size({ state }) {
        return state.rightColumn.width * .64;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-preview
    align-items: center
    display: flex
    flex-direction: column

  .x4-ui-icon
    @include color($black, .12)
  
</style>
