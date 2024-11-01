<template lang="pug">

  transition(name="x4" appear)
    div.x4-loader.x4-transition(
      :class="classObject")

      UIBackdrop

      div.x4-wrapper
        div.x4-inside

          div.x4-text

            UILabel(
              :label="alabel")

          svg.x4-spinner(
            width="246" height="246")

            circle.x4-circle(
              cx="123" cy="123" r="120" fill="none" stroke-width="4")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UIBackdrop from '~/components/ui/Backdrop';
  import UILabel from '~/components/ui/Label';


  export default {

    props: [
      'label',
    ],


    components: {
      UIBackdrop,
      UILabel,
    },


    created() {
      this.dotInterval = setInterval(this.dotRecalc, 200);
    },


    beforeDestroy() {
      clearInterval(this.dotInterval);
    },


    data() {
      return {
        dot1: false,
        dot2: false,
        dot3: false,
      };
    },


    computed: {

      classObject({ getters }) {
        return {
          'x4-mobile': getters['responsive/isMobile'],
        };
      },

      alabel() {
        let label = this.label || i18n.__('Loading', 'x4-media-library');

        if (this.dot1) label += '.';
        if (this.dot2) label += '.';
        if (this.dot3) label += '.';

        return label;
      },

    },


    methods: {

      dotRecalc() {
        if (!this.dot1) {
          return this.dot1 = true;
        }

        if (!this.dot2) {
          return this.dot2 = true;
        }

        if (!this.dot3) {
          return this.dot3 = true;
        }

        this.dot1 = false;
        this.dot2 = false;
        this.dot3 = false;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-loader
    align-items: flex-start
    bottom: 0
    display: flex
    justify-content: center
    left: 0
    position: absolute
    right: 0
    top: 0
    z-index: 1000

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-mobile
      align-items: center

  .x4-ui-backdrop
    @include background-color($white, .5)

  .x4-wrapper
    display: flex
    flex-direction: column
    padding-top: 180px
    position: relative
    z-index: 20

    .x4-loader.x4-mobile > &
      padding-top: 0

  .x4-inside
    display: flex
    flex-direction: column
    position: relative

  .x4-text
    align-items: center
    bottom: 0
    display: flex
    flex-direction: column
    justify-content: center
    left: 0
    position: absolute
    right: 0
    top: 0
    z-index: 1

  .x4-ui-label
    @include color($black, .64)
    font-size: 24px
    line-height: 1.5
    width: 110px

  .x4-spinner
    animation: x4-rotate 2s linear infinite

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)
      animation-duration: 1s!important

  .x4-circle
    animation: x4-dash 1.5s ease-in-out infinite
    @include stroke($primary, .75)
    stroke-dasharray: 6,1200
    stroke-dashoffset: 0
    stroke-linecap: round

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)
      stroke-dasharray: 300,1200

  @keyframes x4-rotate
    100%
      transform: rotate(360deg)

  @keyframes x4-dash
    0%
      stroke-dasharray: 6,1200
      stroke-dashoffset: 0
    50%
      stroke-dasharray: 534,1200
      stroke-dashoffset: -210
    100%
      stroke-dasharray: 534,1200
      stroke-dashoffset: -744

</style>
