<template lang="pug">

  Folder(
    :folder="folder")

</template>


<script>

  import Folder from './Folder';


  export default {

    components: {
      Folder,
    },


    computed: {

      folder({ state }) {
        return state.addFolder.folder;
      },

    },

  };

</script>
