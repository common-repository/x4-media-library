<template lang="pug">

  div.x4-ui-select(
    :class="classObject")

    div.x4-inside(
      ref="inside"
      @click.stop="open")

      UIIcon.x4-icon(
        v-if="icon"
        :icon="icon"
        :size="24")

      div.x4-body

        UILabel.x4-label.x4-transition(
          :label="label")

        UILabel.x4-value(
          :label="hash[value]")

      UIIcon.x4-dd-icon(
        icon="arrow_drop_down"
        :transition="true"
        :size="24")

      UILines(
        :active="opened")

</template>


<script>

  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UILines from '~/components/ui/Input/Lines';


  export default {

    props: [
      'options',
      'value',
      'icon',
      'label',
    ],


    components: {
      UIIcon,
      UILabel,
      UILines,
    },


    data() {
      return {
        opened: false,
        dirty: this.value !== null,
      };
    },


    watch: {

      value(value) {
        this.dirty = value !== null;
      },

    },


    computed: {

      hash() {
        let result = {};

        this.options.forEach(option => {
          result[option.value] = option.label;
        });

        return result;
      },

      classObject() {
        return {
          'x4-with-icon': !!this.icon,
          'x4-dirty': this.dirty,
          'x4-opened': this.opened,
        };
      },

    },


    methods: {

      open({ dispatch }) {
        this.opened = true;
        dispatch('SELECT_OPEN', { el: this.$refs.inside, value: this.value, options: this.options, change: this.change, close: this.close });
      },

      change(context, value) {
        this.opened = false;
        this.$emit('change', value);
      },

      close(context) {
        this.opened = false;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-select
    display: flex
    flex-direction: column

  .x4-inside
    align-items: center
    @include background-color($black, .04)
    border-radius: 4px 4px 0 0
    cursor: pointer
    display: flex
    height: 56px
    position: relative

    &:hover
      @include background-color($black, .06)

    &.x4-opened
      @include background-color($black, .08)

  .x4-icon
    @include color($black, .54)
    padding-left: 16px

  .x4-body
    align-self: flex-start
    display: flex
    flex-direction: column
    flex-shrink: 100000
    padding: 0 8px 0 16px
    position: relative
    width: 100%

    .x4-ui-select.x4-with-icon > .x4-inside > &
      padding-left: 8px

  .x4-label
    @include color($black, .54)
    font-size: 16px
    line-height: 1.5
    padding-top: 17px

    .x4-ui-select.x4-opened > .x4-inside > .x4-body > &,
    .x4-ui-select.x4-dirty > .x4-inside > .x4-body > &
      font-size: 12px
      margin-left: .5px
      padding-top: 7px

    .x4-ui-select.x4-opened > .x4-inside > .x4-body > &,
      @include color($primary)

  .x4-value
    font-size: 16px
    line-height: 1.5

  .x4-dd-icon
    @include color($black, .54)
    padding-right: 8px

    .x4-ui-select.x4-opened > .x4-inside > & /deep/ .x4-inside
      transform: rotate(180deg)

</style>
