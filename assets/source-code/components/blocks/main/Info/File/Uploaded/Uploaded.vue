<template lang="pug">
  
  div.x4-uploaded

    UILabel.x4-label(
      :label="labelTitle")

    UILabel.x4-value(
      :label="labelCreated")

    template(
      v-if="attachment")

      div.x4-value.x4-post-parent(
        v-if="uploadedTo")

        UILabel(
          :label="labelTo")

        a(
          target="_blank"
          :href="uploadedToLink")

          UILabel(
            :label="uploadedToTitle")

      div.x4-value.x4-author

        UILabel(
          :label="labelBy")

        a(
          target="_blank"
          :href="urlAuthor")

          UILabel(
            :label="authorName")

</template>


<script>

  import { settings } from 'X4MediaLibrary';
  import UILabel from '~/components/ui/Label';
  import i18n from '~/utils/i18n';


  export default {

    components: {
      UILabel,
    },


    computed: {

      file({ getters }) {
        return getters['info/entity'];
      },

      attachment({ state, storage }) {
        return state.attachments[this.file.id]
          ? storage.attachments[this.file.id]
          : null;
      },

      uploadedTo() {
        return parseFloat(this.attachment.get('uploadedTo'));
      },

      uploadedToLink() {
        return this.attachment.get('uploadedToLink');
      },

      uploadedToTitle() {
        return this.attachment.get('uploadedToTitle');
      },

      urlAuthor() {
        return settings.adminUrl + 'user-edit.php?user_id=' + parseFloat(this.attachment.get('author'));
      },

      authorName() {
        return this.attachment.get('authorName');
      },

      labelTitle() {
        return i18n.__('Uploaded on:', 'x4-media-library');
      },

      labelCreated() {
        return this.file.uploaded.toLocaleDateString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
      },

      labelTo() {
        return i18n.__('to', 'x4-media-library');
      },

      labelBy() {
        return i18n.__('by', 'x4-media-library');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-uploaded
    display: flex
    flex-direction: column
    padding: 24px 16px 0

  .x4-label
    font-size: 14px
    font-weight: 500
    line-height: 1.5
    text-align: center

  .x4-value
    font-size: 13px
    justify-content: center
    line-height: 1.5
    text-align: center
    user-select: text

  .x4-post-parent, .x4-author
    display: flex
    font-size: 12px
    line-height: 1.5

    > .x4-ui-label
      padding-right: 3px

</style>
