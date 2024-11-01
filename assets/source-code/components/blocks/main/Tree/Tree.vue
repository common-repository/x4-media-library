<template lang="pug">

  div.x4-tree(
    @contextmenu.prevent.stop="contextMenu")

    Folder(
      :folder="folder"
      :depth="1")

</template>


<script>

  import Folder from './Folder';


  export default {

    components: {
      Folder,
    },


    beforeCreate({ dispatch }) {
      dispatch('TREE_INIT', { tree: this });
    },


    computed: {

      folder({ state }) {
        return state.folders[''];
      },

    },


    methods: {

      contextMenu({ state, dispatch }) {
        dispatch('CONTEXT_SHOW', { event, block: 'tree', entity: state.current, type: 'folders', single: false });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-tree
    display: flex
    flex-direction: column
    flex-grow: 1
    flex-shrink: 0
    padding: 16px 0

</style>
