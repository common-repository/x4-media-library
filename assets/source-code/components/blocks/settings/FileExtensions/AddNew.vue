<template lang="pug">

  div.x4-add-new

    UIButton(
      icon="add"
      :label="labelButton"
      @click="toggle")

    UISlidedown(
      :opened="visible")

      AddNewForm(
        key="add-new-form")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UIButton from '~/components/ui/Button';
  import UISlidedown from '~/components/ui/Slidedown';
  import AddNewForm from './AddNewForm';


  export default {

    components: {
      UIButton,
      UISlidedown,
      AddNewForm,
    },


    computed: {

      visible({ state }) {
        return state.settings.fileExtensions.addNew.visible;
      },

      labelButton() {
        return i18n.__('Add New', 'x4-media-library');
      },

    },


    methods: {

      toggle({ dispatch }) {
        dispatch('FILE_EXTENSIONS_ADD_NEW_VISIBLE_TOGGLE');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-add-new
    align-items: flex-start
    display: flex
    flex-direction: column

</style>
