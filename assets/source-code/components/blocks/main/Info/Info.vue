<template lang="pug">

  div.x4-info

    Folder(
      v-if="type === 'folders'"
      :key="'folder_'+entity.path")

    File(
      v-else-if="type === 'files'"
      :key="'file_'+entity.id")

    Multiple(
      v-else
      key="multiple")

</template>


<script>

  import File from './File';
  import Folder from './Folder';
  import Multiple from './Multiple';

  
  export default {

    components: {
      File,
      Folder,
      Multiple,
    },


    computed: {

      type({ getters }) {
        return getters['info/type'];
      },

      entity({ getters }) {
        return getters['info/entity'];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-info
    display: flex
    flex-direction: column
    flex-shrink: 0
    padding-bottom: 40px
  
</style>
