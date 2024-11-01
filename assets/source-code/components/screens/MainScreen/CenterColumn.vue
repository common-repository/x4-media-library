<template lang="pug">

  div.x4-center-column(
    @dragenter="dragOver"
    @dragover="dragOver")

    div.x4-top-row

      MenuButtonLeft

      Breadcrumb

      MenuButtonRight

    div.x4-subtop-row
      
      MenuControls

    div.x4-content-row

      Controls(
        v-if="controlsVisible")

      UpButton(
        v-if="upButtonVisible")

      Explorer

    div.x4-bottom-row(
      v-if="selectionVisible")

      Selection

</template>


<script>

  import MenuButtonLeft from '~/components/blocks/common/buttons/MenuButtonLeft';
  import MenuButtonRight from '~/components/blocks/common/buttons/MenuButtonRight';
  import Breadcrumb from '~/components/blocks/main/Breadcrumb';
  import MenuControls from '~/components/blocks/main/Controls/Menu';
  import Controls from '~/components/blocks/main/Controls';
  import UpButton from '~/components/blocks/main/buttons/UpButton';
  import Explorer from '~/components/blocks/main/Explorer';
  import Selection from '~/components/blocks/main/Selection';


  export default {

    components: {
      MenuButtonLeft,
      MenuButtonRight,
      Breadcrumb,
      MenuControls,
      Controls,
      UpButton,
      Explorer,
      Selection,
    },


    computed: {

      controlsVisible({ state }) {
        return !!state.controls.active;
      },

      upButtonVisible({ state }) {
        return state.upButton.visible;
      },

      selectionVisible({ state, $frame }) {
        return $frame.modal && state.selection.multiple;
      },

    },


    methods: {

      dragOver({ dispatch }, event) {
        dispatch('LEFT_RESIZER_DRAG_OVER', { event });
        dispatch('RIGHT_RESIZER_DRAG_OVER', { event });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-center-column
    display: flex
    flex-direction: column
    flex-shrink: 100000
    height: 100%
    width: 100%

  .x4-top-row
    align-items: center
    @include background-color($primary)
    display: flex
    height: 64px
    padding: 0 12px

  .x4-subtop-row
    @include background-color($black, .04)
    display: flex
    height: 48px

  .x4-content-row
    @include background-color($white)
    display: flex
    flex-direction: column
    flex-shrink: 100000
    position: relative
    height: 100%

  .x4-bottom-row
    @include background-color($white)
    display: flex
    height: 68px

</style>
