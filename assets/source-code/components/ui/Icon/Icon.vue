<template lang="pug">

  div.x4-ui-icon

    i.x4-inside.material-icons(
      :class="classObject"
      :style="styleObject")

      | {{ icon }}

</template>


<script>

  export default {

    props: [
      'icon',
      'size',
      'transition',
    ],


    computed: {

      classObject() {
        return {
          'x4-transition': !!this.transition,
        };
      },

      styleObject() {
        let sizepx = this.size && this.size !== 24
          ? this.size + 'px'
          : null;

        return {
          'font-size': sizepx,
          height: sizepx,
          width: sizepx,
        };
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-icon
    display: flex
    flex-direction: column

  .x4-inside
    font-size: 24px
    height: 24px
    width: 24px

</style>
