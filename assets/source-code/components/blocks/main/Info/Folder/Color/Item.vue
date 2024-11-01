<template lang="pug">
  
  div.x4-item(
    :title="title"
    :class="classObject"
    :style="styleObject"
    @click.stop="change")

</template>


<script>

  import { names, colors } from '~/utils/colors';

  
  export default {

    props: [
      'name',
      'hue',
    ],


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

      color() {
        return this.name + ':' + this.hue;
      },

      title() {
        return names[this.name] + ' ' + this.hue;
      },

      classObject({ storage }) {
        return {
          'x4-active': this.folder.color
            ? this.color === this.folder.color
            : this.color === storage.constants.folderDefColor,
        };
      },

      styleObject() {
        return {
          'background-color': colors[this.name][this.hue],
        };
      },

    },


    methods: {

      change({ dispatch }) {
        dispatch('FOLDER_COLOR_CHANGE_APPLY', { folder: this.folder, color: this.color });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-item
    cursor: pointer
    height: 18px
    position: relative
    width: 18px

    &:hover
      transform: scale(1.2)
      z-index: 1

    &.x4-active
      outline: 2px solid #000
      transform: scale(1)
      z-index: 2

</style>
