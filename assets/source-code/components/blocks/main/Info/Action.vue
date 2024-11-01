<template lang="pug">

  div.x4-action(
    :class="classObject"
    @click.stop="click")

    UIIcon.x4-transition(
      :icon="action.icon"
      :size="32")

    UILabel.x4-transition(
      :label="action.label")

    UIRipple(
      v-if="!action.disabled")

    UIFlyLabel(
      v-if="action.flylabel && !action.disabled"
      :label="action.flylabel")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';
  import UIFlyLabel from '~/components/ui/FlyLabel';


  export default {

    props: [
      'action',
    ],


    components: {
      UIIcon,
      UILabel,
      UIRipple,
      UIFlyLabel,
    },


    computed: {

      classObject() {
        return {
          'x4-small': !!this.action.small,
          'x4-disabled': !!this.action.disabled,
        };
      },

    },


    methods: {

      click() {
        if (!this.action.disabled) {
          this.action.click();
        }
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-action
    align-items: center
    border-radius: 8px
    cursor: pointer
    display: flex
    flex-direction: column
    justify-content: center
    margin: 4px 2px
    overflow: visible!important
    padding: 8px 0
    position: relative
    width: 64px

    &:hover
      @include background-color($black, .04)

    &.x4-disabled:hover
      background-color: transparent
      cursor: default

  .x4-ui-icon
    @include color($black, .56)

    .x4-action.x4-disabled > &
      @include color($black, .16)

  .x4-ui-label
    font-size: 12px
    line-height: 1
    padding-top: 4px

    .x4-action.x4-small > &
      font-size: 11px
      padding-top: 5px

    .x4-action.x4-disabled > &
      @include color($black, .32)

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($black, .04)

  .x4-ui-fly-label
    @include color($accent)

</style>
