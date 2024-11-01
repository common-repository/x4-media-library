<template lang="pug">

  div.x4-items-list

    Item(
      v-for="fileExtension of fileExtensions"
      :fileExtension="fileExtension"
      :key="fileExtension.ext")

</template>


<script>

  import Item from './Item';


  export default {

    components: {
      Item,
    },


    computed: {

      fileExtensions({ getters }) {
        return getters['fileExtensions/sorted'];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-items-list
    display: flex
    flex-wrap: wrap
    padding-top: 32px

</style>
