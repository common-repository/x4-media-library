<template lang="pug">

  div.x4-ui-input(
    :class="classObject")

    div.x4-inside(
      @click.stop="force")

      UIIcon.x4-icon(
        v-if="icon"
        :icon="icon"
        :size="24")

      div.x4-body

        UILabel.x4-label.x4-transition(
          :label="label")

        input.x4-input.x4-transition(
          ref="input"
          :type="atype"
          :value="avalue"
          :min="amin"
          :max="amax"
          :step="astep"
          size="1"
          @input.stop="input"
          @focus.stop="focus"
          @blur.stop="blur")

      UILines(
        :active="focused")

    UISlidedown(
      :opened="!!error")

      UILabel.x4-error.x4-transition(
        :label="error"
        key="error")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UISlidedown from '~/components/ui/Slidedown';
  import UILines from './Lines';


  export default {

    props: [
      'type',
      'value',
      'icon',
      'label',
      'error',
      'min',
      'max',
      'step',
    ],


    components: {
      UIIcon,
      UILabel,
      UISlidedown,
      UILines,
    },


    data() {
      return {
        focused: false,
        avalue: this.value,
        dirty: this.value !== '',
      };
    },


    watch: {

      value(value) {
        this.avalue = value;
        this.dirty = value !== '';
      },

    },


    computed: {

      atype() {
        return this.type || 'text';
      },

      amin() {
        return this.min || null;
      },

      amax() {
        return this.max || null;
      },

      astep() {
        return this.step || null;
      },

      classObject() {
        return {
          'x4-with-icon': !!this.icon,
          'x4-dirty': this.dirty,
          'x4-focused': this.focused,
        };
      },

    },


    methods: {

      focus() {
        this.focused = true;
      },

      blur() {
        this.focused = false;
      },

      force() {
        if (!this.focused) {
          this.$refs.input.focus();
        }
      },

      input(context, event) {
        this.change(event.target.value);
      },

      change(context, value) {
        this.avalue = value;
        this.dirty = value !== '';

        this.$emit('change', value);
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-input
    display: flex
    flex-direction: column

  .x4-inside
    align-items: center
    @include background-color($black, .04)
    border-radius: 4px 4px 0 0
    cursor: text
    display: flex
    height: 56px
    position: relative

    &:hover
      @include background-color($black, .06)

    .x4-ui-input.x4-focused > &
      @include background-color($black, .08)

  .x4-icon
    @include color($black, .54)
    padding-left: 16px

  .x4-body
    align-self: flex-start
    display: flex
    flex-direction: column
    flex-shrink: 100000
    padding: 0 16px
    position: relative
    width: 100%

    .x4-ui-input.x4-with-icon > .x4-inside > &
      padding-left: 8px

  .x4-label
    @include color($black, .54)
    font-size: 16px
    line-height: 1.5
    padding-top: 17px

    .x4-ui-input.x4-focused > .x4-inside > .x4-body > &,
    .x4-ui-input.x4-dirty > .x4-inside > .x4-body > &
      font-size: 12px
      margin-left: .5px
      padding-top: 7px

    .x4-ui-input.x4-focused > .x4-inside > .x4-body > &
      @include color($primary)

  .x4-input
    background-color: transparent!important
    border: none!important
    box-shadow: none!important
    font-size: 16px
    height: 1px
    line-height: 1.5
    margin: 0
    outline: none!important
    padding: 0
    text-shadow: none
    width: 100%

    .x4-ui-input.x4-focused > .x4-inside > .x4-body > &,
    .x4-ui-input.x4-dirty > .x4-inside > .x4-body > &
      height: 24px

  .x4-error
    @include color($accent)
    font-size: 12px
    line-height: 1.5
    margin-left: .5px
    padding: 3px 16px

    .x4-ui-input.x4-with-icon > .x4-ui-slidedown > &
      padding-left: 48px

</style>
