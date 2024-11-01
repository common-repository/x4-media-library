<template lang="pug">

  div.x4-custom-folders

    div.x4-folders
      Folder(
        v-for="folder of folders"
        :key="folder.path"
        :folder="folder")

    AddNew

</template>


<script>

  import Folder from './Folder';
  import AddNew from './AddNew';


  export default {

    components: {
      Folder,
      AddNew,
    },


    computed: {

      folders({ getters }) {
        return getters['ignoredFolders/custom'];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-custom-folders
    display: flex
    flex-direction: column
    width: 50%

  .x4-folders
    display: flex
    flex-direction: column
    padding-top: 16px

</style>
