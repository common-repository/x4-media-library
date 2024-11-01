<template lang="pug">

  div.x4-item(
    :class="classObject"
    @click.stop="click")

    UIIcon(
      :icon="item.icon"
      :size="24")

    UILabel(
      :label="item.name")

    UIRipple

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    props: [
      'item',
    ],


    components: {
      UIIcon,
      UILabel,
      UIRipple,
    },


    computed: {

      classObject({ state }) {
        return {
          'x4-active': this.item.active,
        };
      },

    },


    methods: {

      click({ dispatch }) {
        dispatch('SETTINGS_MENU_ITEM_CLICK', { item: this.item });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-item
    align-items: center
    cursor: pointer
    display: flex
    height: 48px
    padding: 0 16px
    position: relative

    &:hover
      @include background-color($primary, .08)

    &.x4-active
      @include background-color($primary, .16)

  .x4-ui-icon
    @include color($black, .54)

    .x4-item.x4-active > &
      @include color($primary)

  .x4-ui-label
    font-size: 14px
    line-height: 1.5
    padding-left: 8px

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($primary, .08)

</style>
