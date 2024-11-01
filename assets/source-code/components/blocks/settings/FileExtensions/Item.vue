<template lang="pug">

  div.x4-item(
    :class="classObject")

    div.x4-inside

      UICheckbox(
        :value="fileExtension.allowed"
        :title="fileExtension.mimeType"
        :label="fileExtension.ext"
        @change="change")

      UIIcon.x4-remove.x4-transition(
        v-if="fileExtension.custom"
        icon="close"
        :size="16"
        @click.native.stop="remove")
    
</template>


<script>

  import UICheckbox from '~/components/ui/Checkbox';
  import UIIcon from '~/components/ui/Icon';


  export default {

    props: [
      'fileExtension',
    ],


    components: {
      UICheckbox,
      UIIcon,
    },


    computed: {

      classObject() {
        return {
          'x4-custom': this.fileExtension.custom,
        };
      },

    },


    methods: {

      change({ dispatch }, value) {
        dispatch('FILE_EXTENSION_ALLOWED_CHANGE_APPLY', { fileExtension: this.fileExtension, allowed: value });
      },

      remove({ dispatch }, value) {
        dispatch('FILE_EXTENSION_DELETE', { fileExtension: this.fileExtension });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-item
    display: flex
    flex-direction: column
    padding-right: 8px
    width: 160px

  .x4-inside
    display: flex

    &:hover
      @include background-color($black, .04)

    .x4-item.x4-custom > &
      @include background-color($accent, .08)

  .x4-ui-checkbox
    flex-shrink: 100000
    width: 100%

  .x4-remove
    cursor: pointer
    opacity: 0
    padding-right: 8px
    padding-top: 8px

    .x4-item:hover > .x4-inside > &
      opacity: 1

</style>
