<template lang="pug">

  div.x4-actions

    Action(
      v-for="action in actions"
      :key="action.cid"
      :action="action")

</template>


<script>

  import Action from './Action'


  export default {

    components: {
      Action,
    },


    computed: {

      actions({ state }) {
        return state.actions;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-actions
    align-items: center
    display: flex
    flex-direction: column
    margin: 16px 0

</style>
