<template lang="pug">

  div.x4-ui-button

    div.x4-inside(
      :is="tag"
      :href="url"
      :target="target"
      :class="classObject"
      :style="styleObject"
      @click.stop="click")

      UIIcon.x4-icon(
        v-if="icon"
        :icon="icon"
        :size="18")

      UILabel.x4-label(
        :label="label")

      div.x4-hover

      UIRipple(
        v-if="!disabled")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIRipple from '~/components/ui/Ripple';


  export default {

    props: [
      'url',
      'type',
      'icon',
      'label',
      'color',
      'disabled',
    ],


    components: {
      UIIcon,
      UILabel,
      UIRipple,
    },


    computed: {

      tag() {
        return !this.url
          ? 'div'
          : 'a';
      },

      target() {
        return this.url
          ? '_blank'
          : null;
      },

      classObject() {
        let result = {
          'x4-disabled': !!this.disabled,
          'x4-no-icon': !this.icon,
        };

        if (this.type) {
          result['x4-' + this.type] = true;
        }

        return result;
      },

      styleObject() {
        return {
          'background-color': this.color || null,
        };
      },

    },


    methods: {

      click() {
        if (!this.disabled) {
          this.$emit('click');
        }  
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-button
    display: flex
    flex-direction: column

  .x4-inside
    align-items: center
    @include background-color($primary)
    border-radius: 4px
    cursor: pointer
    display: flex
    height: 36px
    justify-content: center
    position: relative
    text-decoration: none

    &.x4-disabled
      @include background-color($primary, .64)
      cursor: default

    &.x4-accent
      @include background-color($accent)

    &.x4-accent.x4-disabled
      @include background-color($accent, .64)

    &.x4-gray
      @include background-color($black, .08)

    &.x4-gray.x4-disabled
      @include background-color($black, .04)

  .x4-icon
    @include color($white)
    padding-left: 12px

    .x4-inside.x4-gray > &
      @include color($black, .48)

    .x4-inside.x4-gray.x4-disabled > &
      @include color($black, .24)

  .x4-label
    @include color($white)
    flex-shrink: 100000
    font-size: 14px
    font-weight: 500
    letter-spacing: 1.25px
    line-height: 1.5
    padding-right: 16px
    padding-left: 8px
    text-transform: uppercase

    .x4-inside.x4-no-icon > &
      padding-left: 16px

    .x4-inside.x4-gray > &
      @include color($black, .64)

    .x4-inside.x4-gray.x4-disabled > &
      @include color($black, .32)

  .x4-hover
    bottom: 0
    left: 0
    position: absolute
    right: 0
    top: 0

    .x4-inside:hover > &
      @include background-color($white, .16)

    .x4-inside.x4-gray:hover > &
      @include background-color($black, .08)

    .x4-inside.x4-disabled:hover > &
      display: none

  .x4-ui-ripple /deep/ .x4-ripple
    @include background-color($white, .16)

    .x4-inside.x4-gray > &
      @include background-color($black, .08)

</style>
