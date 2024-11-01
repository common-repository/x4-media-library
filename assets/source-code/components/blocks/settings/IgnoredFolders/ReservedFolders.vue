<template lang="pug">

  div.x4-reserved-folders

    div.x4-folders
      Folder(
        v-for="folder of folders"
        :key="folder.path"
        :folder="folder")

</template>


<script>

  import Folder from './Folder';


  export default {

    components: {
      Folder,
    },


    computed: {

      folders({ getters }) {
        return getters['ignoredFolders/reserved'];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-reserved-folders
    display: flex
    flex-direction: column
    width: 50%

  .x4-folders
    display: flex
    flex-direction: column
    padding-top: 16px

</style>
