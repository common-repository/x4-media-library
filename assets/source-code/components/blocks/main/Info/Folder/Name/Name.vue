<template lang="pug">

  div.x4-name

    Rename(
      v-if="renameVisible")

    div.x4-text(
      v-else)
      | {{ folder.base }}

</template>


<script>

  import Rename from '~/components/blocks/main/Rename';


  export default {

    components: {
      Rename,
    },


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

      renameVisible({ state }) {
        return state.rename.visible && state.rename.block === 'info';
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-name
    display: flex
    justify-content: center
    padding: 12px 16px 0

  .x4-rename
    font-size: 16px
    line-height: 1.5
    padding: 0 8px
    text-align: center

  .x4-text
    font-size: 16px
    line-height: 1.5
    text-align: center
    user-select: text
  
</style>
