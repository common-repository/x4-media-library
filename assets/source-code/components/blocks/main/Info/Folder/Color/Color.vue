<template lang="pug">
  
  div.x4-color(
    :class="classObject")

    div.x4-header(
      @click.stop="toggle")

      UIIcon.x4-expand.x4-transition(
        icon="chevron_right")

      UILabel.x4-label(
        :label="labelHeader")

    UISlidedown.x4-controls(
      :opened="expanded")

      div.x4-controls-inside(
        key="inside")

        div.x4-items

          template(
            v-for="(color, name) in colors")

            Item(
              v-for="hue of hues"
              :key="name + ':' + hue"
              :name="name"
              :hue="hue")

</template>


<script>

  import i18n from '~/utils/i18n';
  import { hues, colors } from '~/utils/colors';
  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UISlidedown from '~/components/ui/Slidedown';
  import Item from './Item';

  
  export default {

    components: {
      UIIcon,
      UILabel,
      UISlidedown,
      Item,
    },


    data() {
      return {
        expanded: false,
      };
    },


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

      colors() {
        return colors;
      },

      hues() {
        return hues;
      },

      classObject() {
        return {
          'x4-expanded': this.expanded,
        };
      },

      labelHeader() {
        return i18n.__('Change Color', 'x4-media-library');
      },

    },


    methods: {

      toggle() {
        this.expanded = !this.expanded;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-color
    display: flex
    flex-direction: column
    padding: 16px 16px 0

  .x4-header
    align-items: center
    cursor: pointer
    display: flex

  .x4-expand
    @include color($black, .54)

    .x4-color.x4-expanded > .x4-header > &
      transform: rotate(90deg)
  
  .x4-label
    flex-shrink: 100000
    font-size: 16px
    font-weight: 500
    line-height: 1.5

  .x4-controls
    align-items: center
    display: flex
    flex-direction: column
    padding-top: 16px

  .x4-controls-inside
    display: flex
    flex-direction: column
    flex-shrink: 0

  .x4-items
    display: flex
    flex-wrap: wrap
    margin: -2px
    padding: 2px
    max-width: 166px

</style>
