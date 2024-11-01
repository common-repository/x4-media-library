<template lang="pug">

  div.x4-uploader

    input.x4-file-input(
      type="file"
      ref="input"
      multiple
      @change.stop="change")

</template>


<script>

  export default {

    created({ dispatch }) {
      dispatch('UPLOADER_INIT', { uploader: this });
    },


    methods: {

      change({ dispatch }) {
        dispatch('UPLOADER_BUTTON_CHANGE_APPLY');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-uploader
    @include background-color($accent, .24)
    bottom: 0
    left: 0
    position: fixed
    right: 0
    top: 0
    z-index: 1000000

  .x4-file-input
    left: -1000000px
    position: absolute
    top: -1000000px

</style>
