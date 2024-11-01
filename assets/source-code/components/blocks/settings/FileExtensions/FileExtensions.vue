<template lang="pug">

  transition(name="x4" appear)
    div.x4-file-extensions.x4-transition

      AddNew

      InfoMessage(
        v-if="infoMessageVisible")

      ItemsList
    
</template>


<script>

  import AddNew from './AddNew';
  import InfoMessage from '../InfoMessage';
  import ItemsList from './ItemsList';


  export default {

    components: {
      AddNew,
      InfoMessage,
      ItemsList,
    },


    computed: {

      infoMessageVisible({ state }) {
        return state.settings.fileExtensions.infoMessage.visible;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-file-extensions
    display: flex
    flex-direction: column

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1

  .x4-info-message
    padding-top: 32px

</style>
