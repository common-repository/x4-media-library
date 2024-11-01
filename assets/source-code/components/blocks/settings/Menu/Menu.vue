<template lang="pug">

  div.x4-menu

    Item(
      v-for="item in menu"
      :key="item.page"
      :item="item")

</template>


<script>

  import Item from './Item';


  export default {

    components: {
      Item,
    },


    computed: {

      menu({ state }) {
        return state.settings.menu;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-menu
    display: flex
    flex-direction: column
    flex-shrink: 0
    padding: 16px 0

</style>
