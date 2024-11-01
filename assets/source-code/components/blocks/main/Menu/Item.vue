<template lang="pug">

  div.x4-item(
    v-if="item.state"
    :class="classObject"
    @click.stop="click")

    UILabel(
      :label="item.name")

    UIRipple

  div.x4-separator(
    v-else-if="item.separator")

</template>


<script>

  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    props: [
      'item',
    ],


    components: {
      UILabel,
      UIRipple,
    },


    computed: {

      classObject() {
        return {
          'x4-active': this.item.active,
        };
      },

    },


    methods: {

      click({ dispatch }) {
        dispatch('MENU_ITEM_CLICK', { item: this.item });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-item
    align-items: center
    cursor: pointer
    display: flex
    height: 40px
    padding: 0 16px
    position: relative

    &:hover
      @include background-color($black, .04)

    &.x4-active
      @include background-color($black, .06)

  .x4-ui-label
    font-size: 14px
    line-height: 1.5

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($black, .08)

  .x4-separator
    @include border-color($black, 0.16)
    border-top: 1px solid

</style>
