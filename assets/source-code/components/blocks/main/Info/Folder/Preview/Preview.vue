<template lang="pug">
  
  div.x4-preview

    UIFolderIcon(
      :folder="folder"
      :size="size")

</template>


<script>

  import UIFolderIcon from '~/components/ui/FolderIcon';

  
  export default {

    components: {
      UIFolderIcon,
    },


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

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
    padding-top: 24px

</style>
