<template lang="pug">

  div.x4-add-new-form

    UIInput(
      ref="inputPath"
      :value="path"
      icon="attach_file"
      :label="labelPath"
      :error="errorPath"
      @keydown.native.stop="keydown"
      @keyup.native.stop
      @change="changePath")

    div.x4-buttons

      UIButton.x4-create(
        icon="save"
        type="accent"
        :label="labelButton"
        :disabled="disabled"
        @click="save")

      UIButton.x4-cancel(
        icon="close"
        type="gray"
        :label="labelCancel"
        @click="cancel")

</template>


<script>

  import i18n from '~/utils/i18n';
  import { isPath, isMimeType } from '~/utils/validators';
  import UIInput from '~/components/ui/Input';
  import UIButton from '~/components/ui/Button';


  export default {

    components: {
      UIInput,
      UIButton,
    },


    data() {
      return {
        path: '',
      }
    },


    mounted() {
      this.$refs.inputPath.$refs.input.focus();
    },


    computed: {

      labelPath() {
        return i18n.__('Folder Path', 'x4-media-library');
      },

      labelButton() {
        return i18n.__('Create', 'x4-media-library');
      },

      labelCancel() {
        return i18n.__('Cancel', 'x4-media-library');
      },

      errorPath() {
        return this.path && !isPath(this.path)
          ? i18n.__('folder path is not valid', 'x4-media-library')
          : null;
      },

      disabled() {
        return !this.path || !isPath(this.path);
      },

    },


    methods: {

      changePath(context, path) {
        this.path = path;
      },

      keydown({ dispatch }, event) {
        if (event.key === 'Escape') {
          this.cancel();
          return;
        }

        if (event.key === 'Enter' && !this.disabled) {
          this.save();
          return;
        }
      },

      cancel({ dispatch }) {
        dispatch('IGNORED_FOLDERS_ADD_NEW_VISIBLE_CHANGE', { visible: false });
      },

      save({ dispatch }) {
        dispatch('IGNORED_FOLDER_CREATE', { path: this.path });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-add-new-form
    align-items: flex-start
    display: flex
    flex-direction: column
    padding: 16px 0

  .x4-ui-input
    padding-top: 8px
    width: 280px

  .x4-buttons
    display: flex
    padding-top: 16px

  .x4-cancel
    padding-left: 8px

</style>
