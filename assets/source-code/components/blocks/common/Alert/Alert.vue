<template lang="pug">

  transition(name="x4" appear)
    div.x4-alert.x4-transition(
      :class="classObject")

      UIBackdrop(
        @click.native.stop="close")

      div.x4-inside

        UIIcon.x4-close(
          icon="close"
          :size="32"
          @click.native.stop="close")

        UIIcon.x4-type(
          :style="styleColor"
          :icon="icon"
          :size="64")

        UILabel.x4-title(
          :style="styleColor"
          :label="title")

        div.x4-message

          template(
            v-if="htmlPrefix")

            UILabel.x4-html-suffix(
              :html="htmlPrefix")

            | &nbsp;

          UILabel.x4-message-value(
            :label="message")

          template(
            v-if="htmlSuffix")

            | &nbsp;

            UILabel.x4-html-suffix(
              :html="htmlSuffix")

        div.x4-buttons

          UIButton.x4-submit-button(
            v-if="submitButton.visible"
            :url="submitButton.url"
            :icon="submitButton.icon"
            :label="submitButton.label"
            :color="color"
            @click="submit")

          UIButton.x4-close-button(
            v-if="closeButton.visible"
            type="gray"
            :icon="closeButton.icon"
            :label="closeButton.label"
            @click="close")

</template>


<script>

  import UIBackdrop from '~/components/ui/Backdrop';
  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UIButton from '~/components/ui/Button';


  export default {

    components: {
      UIBackdrop,
      UIIcon,
      UILabel,
      UIButton,
    },


    computed: {

      type({ state }) {
        return state.alert.type;
      },

      classObject({ getters }) {
        return {
          'x4-mobile': getters['responsive/isMobile'],
        };
      },

      icon() {
        let result = '';

        switch (this.type) {
          case 'error':
            result = 'cancel';
            break;
          case 'warning':
            result = 'error';
            break;
          case 'info':
            result = 'info';
            break;
          case 'success':
            result = 'check_circle';
            break;
          default:
            result = 'account_circle';
            break;
        }

        return result;
      },

      color() {
        let result = '';

        switch (this.type) {
          case 'error':
            result = '#f44336';
            break;
          case 'warning':
            result = '#ff9800';
            break;
          case 'info':
            result = '#03a9f4';
            break;
          case 'success':
            result = '#00c853';
            break;
          default:
            result = '#000000';
            break;
        }

        return result;
      },

      styleColor() {
        return {
          color: this.color,
        };
      },

      title({ state }) {
        return state.alert.title;
      },

      message({ state }) {
        return state.alert.message;
      },

      htmlPrefix({ state }) {
        return state.alert.html.prefix;
      },

      htmlSuffix({ state }) {
        return state.alert.html.suffix;
      },
      
      submitButton({ state }) {
        return state.alert.buttons.submit;
      },

      closeButton({ state }) {
        return state.alert.buttons.close;
      },

    },


    methods: {

      submit({ dispatch }) {
        dispatch('ALERT_SUBMIT');
      },

      close({ dispatch }) {
        dispatch('ALERT_CLOSE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-alert
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
    @include background-color($black, .5)

  .x4-inside
    @include background-color($white)
    display: flex
    flex-direction: column
    margin-top: 180px
    padding: 32px 32px
    position: relative
    width: 480px
    z-index: 20

    .x4-alert.x4-mobile > &
      margin-top: 0

  .x4-close
    @include color($black, .32)
    cursor: pointer
    position: absolute
    right: 8px
    top: 8px

    &:hover
      @include color($black, .64)

  .x4-type
    align-items: center

  .x4-title
    font-size: 32px
    line-height: 1.5
    padding-top: 8px
    text-align: center
    user-select: text

  .x4-message
    @include color($black, .64)
    font-size: 16px
    padding-top: 8px
    text-align: center
    user-select: text

    > div
      display: inline
      white-space: normal

    /deep/ a
      @include color($primary, 1, !important)

  .x4-buttons
    display: flex
    justify-content: center
    padding-top: 32px

  .x4-submit-button
    min-width: 100px

  .x4-close-button
    margin-left: 24px

</style>
