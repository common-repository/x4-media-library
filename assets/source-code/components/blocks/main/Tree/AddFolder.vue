<template lang="pug">

  Folder(
    :folder="folder"
    :depth="depth")

</template>


<script>

  import Folder from './Folder';


  export default {

    props: [
      'depth',
    ],


    components: {
      Folder,
    },


    beforeCreate: function() {
      this.$options.components.Folder = require('./Folder').default;
    },


    computed: {

      folder({ state }) {
        return state.addFolder.folder;
      },

    },

  };

</script>
