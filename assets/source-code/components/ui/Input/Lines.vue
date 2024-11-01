<template lang="pug">

  div.x4-ui-lines(
    :class="classObject")

    div.x4-line1.x4-transition
    div.x4-line2.x4-transition

</template>


<script>

  export default {

    props: [
      'active',
    ],


    computed: {

      classObject() {
        return {
          'x4-active': this.active,
        };
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-lines
    bottom: 0
    left: 0
    position: absolute
    right: 0
    z-index: 1

  .x4-line1
    @include background-color($primary)
    height: 2px
    position: relative
    transform: scaleX(0)
    transform-origin: center center 0
    z-index: 1

    .x4-ui-lines.x4-active > &
      transform: scaleX(1)

  .x4-line2
    @include background-color($black, .42)
    height: 1px
    margin-top: -1px

    *:hover > .x4-ui-lines > &
      @include background-color($black, .87)

</style>
