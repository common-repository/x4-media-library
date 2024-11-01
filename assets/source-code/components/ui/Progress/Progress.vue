<template lang="pug">

  div.x4-ui-progress(
    :class="classObject")

    div.x4-inside

      div.x4-progress(
        :style="styleProgress")

        div.x4-light

</template>


<script>

  export default {

    props: [
      'chunks',
      'completed',
    ],


    computed: {

      percent() {
        let value = this.chunks > 0
          ? Math.round(this.completed * 100 / this.chunks)
          : 0;

        if (value > 100) {
          value = 100;
        }

        return value;
      },

      classObject() {
        return {
          'x4-null': this.percent === 0,
        };
      },

      styleProgress() {
        return {
          'margin-left': (this.percent - 100) + '%',
        };
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-progress
    display: flex
    flex-direction: column

  .x4-inside
    @include background-color($black, .08)
    display: flex
    height: 32px
    position: relative

  .x4-progress
    background-color: #64dd17
    display: flex
    transition: all .3s linear
    width: 100%

    .x4-ui-progress.x4-null > .x4-inside > &
      transition-duration: 0s

  .x4-light
    animation: x4-progress-light 2s linear infinite
    background: linear-gradient(to right, transparent 0%, #76ff03 50%, transparent 100%)
    min-width: 100%

  @keyframes x4-progress-light
    from
      margin-left: -200%
    to
      margin-left: 200%

</style>
