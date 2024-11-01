<template lang="pug">

  div.x4-media-library(
    v-if="visible"
    :class="classObject"
    :style="styleObject")

    Alert(
      v-if="alertVisible")

    Loader(
      v-if="loaderVisible")

    SelectPopup(
      v-if="selectVisible")

    Progress(
      v-if="progressVisible")

    MainScreen(
      v-if="screen === 'main'")

    BootstrapScreen(
      v-else-if="screen === 'bootstrap'")

    SettingsScreen(
      v-else-if="screen === 'settings'")

</template>


<script>

  import Alert from '~/components/blocks/common/Alert';
  import Loader from '~/components/blocks/common/Loader';
  import SelectPopup from '~/components/ui/Select/Popup';
  import Progress from '~/components/blocks/common/Progress';
  import MainScreen from '~/components/screens/MainScreen';
  import BootstrapScreen from '~/components/screens/BootstrapScreen';
  import SettingsScreen from '~/components/screens/SettingsScreen';


  export default {

    components: {
      Alert,
      Loader,
      SelectPopup,
      Progress,
      MainScreen,
      BootstrapScreen,
      SettingsScreen,
    },


    computed: {

      visible({ state }) {
        return state.active;
      },

      classObject({ $frame }) {
        return {
          'x4-main-app': !$frame.modal,
          'x4-modal-app': !!$frame.modal,
        };
      },

      styleObject({ getters, $frame }) {
        return {
          left: !$frame.modal
            ? getters['offset'].left + 'px'
            : null,
          top: !$frame.modal
            ? getters['offset'].top + 'px'
            : null,
        };
      },

      alertVisible({ state }) {
        return state.alert.visible;
      },

      loaderVisible({ state }) {
        return state.loader.visible;
      },

      selectVisible({ state }) {
        return state.select.visible;
      },

      progressVisible({ state }) {
        return state.progress.visible;
      },

      screen({ state }) {
        return state.screen;
      },

    },

  };

</script>


<style lang="sass">

  body.upload-php

    #wpbody
      display: none

    #wpfooter
      display: none

    #adminmenuwrap, #wpadminbar
      z-index: 1000000

  .x4-moxie-shim
    margin-left: -1000000px
    margin-top: -1000000px

  .material-icons
    font-feature-settings: 'liga'

</style>


<style lang="sass" scoped>

  .x4-media-library
    @include background-color($white)
    bottom: 0
    box-sizing: border-box
    @include color($black, .87)
    display: flex
    flex-direction: column
    font-family: Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif
    font-size: 12px
    font-style: normal
    font-weight: 400
    left: 0
    line-height: 1.5
    position: absolute
    right: 0
    top: 0
    user-select: none
    z-index: 100000

    &.x4-main-app
      position: fixed

    /deep/ *
      box-sizing: border-box
      overflow: hidden

    /deep/ a
      box-shadow: none
      @include color($black, .87)

    /deep/ img
      margin: 0

    /deep/ input, /deep/ textarea
      @include color($black, .87)
      font-family: Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif
      font-style: normal
      font-weight: 400

    /deep/ .x4-transition
      transition: .3s cubic-bezier(.4,0,.2,1)

    /deep/ .x4-scrollable
      overflow-y: auto
      @include scrollbar-color($black, $black, .16, .08)
      scrollbar-width: thin

      &::-webkit-scrollbar
        @include background-color($black, .08)
        height: 4px
        width: 4px

      &::-webkit-scrollbar-button
        display: none
        height: 0
        width: 0

      &::-webkit-scrollbar-corner
        background-color: transparent

      &::-webkit-scrollbar-thumb
        background-clip: padding-box
        @include background-color($black, .16)

    /deep/ .x4-scrollable-horiz
      overflow-x: auto
      overflow-y: hidden

</style>
