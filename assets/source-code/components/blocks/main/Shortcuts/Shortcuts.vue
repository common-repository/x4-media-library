<template lang="pug">

  transition(name="x4" appear)
    div.x4-shortcuts.x4-transition

      UIBackdrop(
        @click.native.stop="close")

      div.x4-wrapper

        div.x4-inside

          UIIcon.x4-close(
            icon="close"
            :size="32"
            @click.native.stop="close")

          UILabel.x4-title(
            :label="title")

          div.x4-items.x4-scrollable

            div.x4-item(
              v-for="(shortcut, index) of shortcuts"
              :key="index")

              div.x4-keys
                UILabel.x4-key(
                  v-for="(key, index2) of shortcut.keys"
                  :key="index2"
                  :label="key")

              UILabel.x4-description(
                :label="shortcut.description")

          div.x4-buttons

            UIButton.x4-button(
              icon="check"
              :label="labelButton"
              @click="close")

</template>


<script>

  import i18n from '~/utils/i18n';
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

      title() {
        return i18n.__('Shortcuts', 'x4-media-library');
      },

      shortcuts({ storage }) {
        return storage.shortcuts.items;
      },

      labelButton() {
        return i18n.__('OK', 'x4-media-library');
      },

    },


    methods: {

      close({ dispatch }) {
        dispatch('SHORTCUTS_CLOSE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-shortcuts
    align-items: center
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

  .x4-ui-backdrop
    @include background-color($black, .5)

  .x4-wrapper
    display: flex
    flex-direction: column
    max-height: 100%
    position: relative
    width: 480px
    z-index: 20

  .x4-inside
    @include background-color($white)
    display: flex
    flex-direction: column
    margin: 24px 0
    padding: 16px 24px 24px 32px
    position: relative

  .x4-close
    @include color($black, .32)
    cursor: pointer
    position: absolute
    right: 8px
    top: 8px

    &:hover
      @include color($black, .64)

  .x4-title
    font-size: 32px
    line-height: 1.5

  .x4-items
    display: flex
    flex-direction: column
    flex-shrink: 100000
    padding-right: 8px
    padding-top: 24px

  .x4-item
    align-items: center
    border-top: 1px solid
    @include border-color($black, .16)
    display: flex
    flex-shrink: 0
    font-size: 14px
    line-height: 1.5
    padding: 4px 0

    &:first-child
      border-top: none

  .x4-keys
    display: flex
    flex-direction: column
    font-weight: 500
    width: 100px

  .x4-description
    flex-shrink: 100000
    padding-left: 24px

  .x4-buttons
    display: flex
    justify-content: center
    padding-top: 32px

  .x4-button
    min-width: 100px

</style>
