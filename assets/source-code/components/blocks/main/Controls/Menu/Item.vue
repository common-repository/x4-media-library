<template lang="pug">

  div.x4-item(
    :title="label"
    :class="classObject")

    UIIcon.x4-transition(
      :icon="icon"
      :size="24")

    UILabel.x4-transition(
      v-if="label"
      :label="label")

    UIRipple(
      v-if="!disabled")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    props: [
      'icon',
      'label',
      'disabled',
    ],


    components: {
      UIIcon,
      UILabel,
      UIRipple,
    },


    computed: {

      classObject() {
        return {
          'x4-disabled': !!this.disabled,
        };
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-item
    align-items: center
    border-radius: 8px
    cursor: pointer
    display: flex
    justify-content: center
    margin: 0 2px
    padding: 4px 12px
    position: relative

    &:hover
      @include background-color($black, .04)

    &.x4-active
      @include background-color($black, .08)

    &.x4-changed
      @include background-color($accent, .08)

    &.x4-disabled:hover
      background-color: transparent
      cursor: default

  .x4-ui-icon
    @include color($black, .54)

    .x4-item.x4-changed > &
      @include color($accent)

    .x4-item.x4-disabled > &
      @include color($black, .16)

  .x4-ui-label
    font-size: 13px
    line-height: 1.5
    padding-left: 4px

    .x4-item.x4-changed > &
      @include color($accent)

    .x4-item.x4-disabled > &
      @include color($black, .32)

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($black, .08)

    .x4-item.x4-changed > &
      @include background-color($accent, .08)

</style>
