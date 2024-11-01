<template lang="pug">

  transition-group.x4-breacrumb(name="x4" tag="div")

    div.x4-folder-group.x4-transition(
      v-for="(folder, index) of folders"
      :key="folder.path")

      UIIcon.x4-next(
        v-if="index > 0"
        icon="chevron_right"
        :size="24")

      Folder(
        :folder="folder")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import Folder from './Folder';


  export default {

    components: {
      UIIcon,
      Folder,
    },


    computed: {

      folders({ getters }) {
        return getters['folders/breadcrumb'];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-breacrumb
    display: flex
    flex-shrink: 100000
    padding: 0 20px 0 8px
    width: 100%

  .x4-folder-group
    align-items: center
    display: flex
    flex-shrink: 0
    opacity: 1

    &.x4-enter
      opacity: 0

    &.x4-leave-to
      display: none

  .x4-next
    @include color($white)

</style>
