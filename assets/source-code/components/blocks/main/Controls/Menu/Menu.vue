<template lang="pug">

  div.x4-menu-controls

    Actions
    Tabs

</template>


<script>

  import Actions from './Actions';
  import Tabs from './Tabs';


  export default {

    components: {
      Actions,
      Tabs,
    },

  };

</script>


<style lang="sass" scoped>

  .x4-menu-controls
    display: flex
    padding: 0 10px
    width: 100%

</style>
