<template lang="pug">

  div.x4-radio-button(
    :class="classObject")

    div.x4-shape.x4-transition(
      @click.stop="change")

      div.x4-shape1.x4-transition

    UILabel.x4-label(
      :label="option.label"
      @click.native.stop="change")

</template>


<script>

  import UILabel from '~/components/ui/Label';


  export default {

    props: [
      'option',
      'value',
    ],


    components: {
      UILabel,
    },


    computed: {

      classObject() {
        return {
          'x4-active': this.value === this.option.value,
        };
      },

    },


    methods: {

      change() {
        this.$emit('change', this.option.value);
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-radio-button
    align-items: center
    display: flex
    height: 48px
    max-width: 100%
    padding-left: 18px

  .x4-shape
    align-items: center
    border: 2px solid
    @include border-color($black, .54)
    border-radius: 10px
    cursor: pointer
    display: flex
    justify-content: center
    height: 20px
    position: relative
    width: 20px

    .x4-radio-button.x4-active > &
      @include border-color($primary)

  .x4-shape1
    border-radius: 5px
    height: 10px
    width: 10px

    .x4-radio-button.x4-active > .x4-shape > &
      @include background-color($primary)

  .x4-label
    cursor: pointer
    flex-shrink: 100000
    font-size: 14px
    line-height: 1.5
    padding-left: 10px

</style>
