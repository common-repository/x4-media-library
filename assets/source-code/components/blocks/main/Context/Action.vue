<template lang="pug">

  div.x4-action(
    :class="classObject"
    @click.stop="click")

    UIIcon(
      :icon="action.icon"
      :size="20")

    UILabel(
      :label="action.label")

    UIRipple(
      v-if="!action.disabled")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    props: [
      'action',
    ],


    components: {
      UIIcon,
      UILabel,
      UIRipple,
    },


    computed: {

      classObject() {
        return {
          'x4-disabled': !!this.action.disabled,
        };
      },

    },


    methods: {

      click({ dispatch }, event) {
        if (this.action.disabled) {
          return;
        }

        this.action.click();
        dispatch('CONTEXT_HIDE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-action
    align-items: center
    display: flex
    flex-shrink: 0
    height: 32px
    padding: 0 16px
    position: relative

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
    cursor: default
    font-size: 12px
    line-height: 1.5
    margin-left: 8px

    .x4-action.x4-disabled > &
      @include color($black, .32)

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($black, .04)

</style>
