<template lang="pug">

  div.x4-add-new-form

    UIInput(
      ref="inputExt"
      :value="ext"
      icon="attach_file"
      :label="labelExt"
      :error="errorExt"
      @keydown.native.stop="keydown"
      @keyup.native.stop
      @change="changeExt")

    UIInput(
      :value="mimeType"
      icon="insert_drive_file"
      :label="labelMimeType"
      :error="errorMimeType"
      @keydown.native.stop
      @keyup.native.stop
      @change="changeMimeType")

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
  import { isExt, isMimeType } from '~/utils/validators';
  import UIInput from '~/components/ui/Input';
  import UIButton from '~/components/ui/Button';


  export default {

    components: {
      UIInput,
      UIButton,
    },


    data() {
      return {
        ext: '',
        mimeType: 'text/plain',
      }
    },


    mounted() {
      this.$refs.inputExt.$refs.input.focus();
    },


    computed: {

      labelExt() {
        return i18n.__('File Extension', 'x4-media-library');
      },

      labelMimeType() {
        return i18n.__('Mime Type', 'x4-media-library');
      },

      labelButton() {
        return i18n.__('Create', 'x4-media-library');
      },

      labelCancel() {
        return i18n.__('Cancel', 'x4-media-library');
      },

      errorExt() {
        return this.ext && !isExt(this.ext)
          ? i18n.__('file extension is not valid', 'x4-media-library')
          : null;
      },

      errorMimeType() {
        return this.mimeType && !isMimeType(this.mimeType)
          ? i18n.__('mime type is not valid', 'x4-media-library')
          : null;
      },

      disabled() {
        return !this.ext || !this.mimeType ||
          !isExt(this.ext) || !isMimeType(this.mimeType);
      },

    },


    methods: {

      changeExt(context, ext) {
        this.ext = ext;
      },

      changeMimeType(context, mimeType) {
        this.mimeType = mimeType;
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
        dispatch('FILE_EXTENSIONS_ADD_NEW_VISIBLE_CHANGE', { visible: false });
      },

      save({ dispatch }) {
        dispatch('FILE_EXTENSION_CREATE', { ext: this.ext, mimeType: this.mimeType });
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
