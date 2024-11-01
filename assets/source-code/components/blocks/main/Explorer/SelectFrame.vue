<template lang="pug">

  div.x4-select-frame(
    :style="styleObject")

</template>


<script>

  export default {

    computed: {

      styleObject({ getters }) {
        return {
          left: getters['selectFrame'].left + 'px',
          top: getters['selectFrame'].top + 'px',
          width: getters['selectFrame'].width + 'px',
          height: getters['selectFrame'].height + 'px',
        };
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-select-frame
    @include background-color($primary, .54)
    border: 1px solid transparent
    @include border-color($primary)
    opacity: 0.5
    position: absolute
    z-index: 1

</style>
