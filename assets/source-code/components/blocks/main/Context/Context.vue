<template lang="pug">

  transition(name="x4" appear)

    div.x4-context.x4-transition(
      :style="styleObject")

      Folder(
        v-if="context.type === 'folders'"
        :key="'folder_'+context.entity.path")

      File(
        v-else-if="context.type === 'files'"
        :key="'file_'+context.entity.id")

      Multiple(
        v-else
        key="multiple")

</template>


<script>

  import Folder from './Folder';
  import File from './File';
  import Multiple from './Multiple';


  export default {

    components: {
      Folder,
      File,
      Multiple,
    },


    computed: {

      context({ state }) {
        return state.context;
      },

      styleObject({ state }) {
        return {
          left: state.context.position.left + 'px',
          top: state.context.position.top + 'px',
        };
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-context
    @include background-color($white)
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)
    display: flex
    flex-direction: column
    padding: 8px 0
    position: absolute
    width: 180px
    z-index: 100

    &.x4-enter
      opacity: 0

    &.x4-leave, &.x4-leave-to
      transition: none!important
  
</style>
