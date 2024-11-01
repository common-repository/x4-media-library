<template lang="pug">

  transition(name="x4" appear)
    div.x4-progress.x4-transition(
      :class="classObject")

      UIBackdrop(
        @click.native.stop="hideApply")

      div.x4-inside(
        :class="classInside")

        UILabel.x4-title(
          :label="title")
          
        div.x4-progress1(
          v-if="progress1.visible && !finished")

          UILabel.x4-progress1-label(
            :label="progress1.label")

          UIProgress(
            :chunks="progress1.chunks"
            :completed="progress1.completed")

        div.x4-progress2(
          v-if="progress2.visible && !finished")

          UILabel.x4-progress2-label(
            :label="progress2.label")

          UIProgress(
            :chunks="progress2.chunks"
            :completed="progress2.completed")

        div.x4-errors(
          v-if="errors.length > 0")

          UILabel.x4-errors-label(
            :label="labelErrors")

          div.x4-errors-inside.x4-scrollable(
            ref="errors")

            div.x4-error(
              v-for="err of errors")

              UILabel.x4-error-title(
                :label="err.title")

              UILabel.x4-error-message(
                :label="err.message")

        div.x4-buttons

          UIButton.x4-cancel-button(
            v-if="!finished"
            type="gray"
            :icon="cancelButton.icon"
            :label="cancelButton.label"
            @click="cancel")

          UIButton.x4-close-button(
            v-if="finished"
            type="accent"
            :icon="closeButton.icon"
            :label="closeButton.label"
            @click="cancel")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UIBackdrop from '~/components/ui/Backdrop';
  import UIProgress from '~/components/ui/Progress';
  import UILabel from '~/components/ui/Label';
  import UIButton from '~/components/ui/Button';


  export default {

    components: {
      UIBackdrop,
      UIProgress,
      UILabel,
      UIButton,
    },


    watch: {

      errors(value) {
        if (value.length > 0) {
          setTimeout(() => {
            this.$refs.errors.scrollTop = 1000000;
          });
        }
      },

    },


    computed: {

      finished({ state }) {
        return state.progress.finished;
      },

      classObject({ getters }) {
        return {
          'x4-mobile': getters['responsive/isMobile'],
        };
      },

      classInside() {
        return {
          'x4-finished': this.finished,
        };
      },

      title({ state }) {
        return state.progress.title;
      },

      progress1({ state }) {
        return state.progress.progress1;
      },

      progress2({ state }) {
        return state.progress.progress2;
      },

      errors({ state }) {
        return state.progress.errors;
      },

      labelErrors() {
        return i18n.__('Errors', 'x4-media-library');
      },

      cancelButton({ state }) {
        return state.progress.buttons.cancel;
      },

      closeButton({ state }) {
        return state.progress.buttons.close;
      },

    },


    methods: {

      hideApply() {
        if (this.finished) {
          dispatch('PROGRESS_HIDE');
        }
      },

      cancel({ dispatch }) {
        dispatch('PROGRESS_CANCEL');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-progress
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
    padding: 16px 32px 24px
    position: relative
    width: 480px
    z-index: 20

    .x4-progress.x4-mobile > &
      margin-top: 0

  .x4-title
    font-size: 32px
    line-height: 1.5

  .x4-progress1
    padding-top: 24px

  .x4-progress1-label, .x4-progress2-label
    font-size: 12px
    line-height: 1.5

  .x4-progress2
    padding-top: 8px

  .x4-errors
    padding-top: 16px

    .x4-inside.x4-finished > &
      padding-top: 24px

  .x4-errors-label
    font-size: 12px
    line-height: 1.5

  .x4-errors-inside
    @include background-color($black, .08)
    height: 80px
    padding: 8px 8px
    user-select: text

    .x4-inside.x4-finished > .x4-errors > &
      height: 204px

  .x4-error-title
    font-size: 11px
    line-height: 1.5

  .x4-error-message
    @include color($accent)
    font-size: 11px
    line-height: 1.5
    white-space: normal

  .x4-buttons
    display: flex
    justify-content: center
    padding-top: 32px

</style>
