<template lang="pug">

  div.x4-ui-checkbox

    div.x4-inside(
      :class="classObject")

      div.x4-shape.x4-transition(
        @click.stop="change")

        div.x4-shape1.x4-transition

      UILabel.x4-label(
        :label="label"
        @click.native.stop="change")

</template>


<script>

  import UILabel from '~/components/ui/Label';


  export default {

    props: [
      'disabled',
      'value',
      'label',
    ],


    components: {
      UILabel,
    },


    computed: {

      classObject() {
        return {
          'x4-disabled': !!this.disabled,
          'x4-active': this.value,
        };
      },

    },


    methods: {

      change() {
        if (!this.disabled) {
          this.$emit('change', !this.value);
        }
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-checkbox
    display: flex
    flex-direction: column

  .x4-inside
    align-items: center
    display: flex
    height: 48px
    padding-left: 18px

  .x4-shape
    align-items: center
    border: 2px solid
    @include border-color($black, .54)
    border-radius: 4px
    cursor: pointer
    display: flex
    justify-content: center
    height: 20px
    position: relative
    width: 20px

    .x4-inside.x4-disabled > &
      cursor: default

    .x4-inside.x4-active > &
      @include background-color($primary)
      border: none

    .x4-inside.x4-active.x4-disabled > &
      @include background-color($primary, .5)

  .x4-shape1
    border-left: 2px solid transparent
    border-bottom: 2px solid transparent
    height: 6px
    margin-top: -2px
    transform: rotate(-45deg)
    width: 12px

  .x4-inside.x4-active .x4-shape .x4-shape1
    @include border-color($white)

  .x4-label
    cursor: pointer
    flex-shrink: 100000
    font-size: 14px
    line-height: 1.5
    padding-left: 10px

</style>
