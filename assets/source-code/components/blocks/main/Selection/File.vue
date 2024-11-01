<template lang="pug">

  div.x4-file

    UIIcon.x4-remove(
      icon="close"
      :size="20"
      @click.native.stop="remove")

    div.x4-inside

      div.x4-preview

        UIFileIcon(
          :file="file"
          :src="file.thumb"
          :size="40")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UIFileIcon from '~/components/ui/FileIcon';
  import { ElementMixin } from 'vue-slicksort';


  export default {

    mixins: [
      ElementMixin,
    ],


    props: [
      'file',
    ],


    components: {
      UIIcon,
      UIFileIcon,
    },


    methods: {

      remove({ dispatch }) {
        dispatch('SELECTION_ITEM_REMOVE', { item: this.file });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-file
    cursor: move
    display: flex
    flex-direction: column
    justify-content: center
    margin: 0 4px
    position: relative

    &.x4-dragging
      z-index: 1000000
    
  .x4-remove
    @include background-color($white, .8)
    cursor: pointer
    display: none
    position: absolute
    right: 0
    top: 0

    .x4-file:hover > &
      display: flex

  .x4-inside
    display: flex
    flex-direction: column
    width: 48px

  .x4-preview
    align-items: center
    display: flex
    flex-direction: column
    justify-content: center
    height: 48px

</style>
