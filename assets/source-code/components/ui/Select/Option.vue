<template lang="pug">

  div.x4-option(
    :class="classObject"
    @click.stop="change")

    UILabel(
      :label="option.label")

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

  .x4-option
    align-items: center
    cursor: pointer
    display: flex
    flex-shrink: 0
    height: 48px

    &:hover
      @include background-color($black, .04)

    &.x4-active
      @include background-color($black, .06)

  .x4-ui-label
    font-size: 14px
    line-height: 1.5
    padding: 0 16px
    width: 100%

</style>
