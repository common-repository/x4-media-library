<template lang="pug">
  
  div.x4-stats(
    v-if="attachment")

    div.x4-line(
      v-for="stat of stats")

      UILabel.x4-label(
        :label="stat.label")

      UILabel.x4-value(
        :label="stat.value")

</template>


<script>

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

      bitrate() {
        return parseFloat(this.attachment.get('meta').bitrate || 0);
      },

      bitrateMode() {
        return this.attachment.get('meta').bitrate_mode || '';
      },

      stats() {
        let result = [];

        if (this.file.mime === 'audio' || this.file.mime === 'video') {
          result = result.concat([{
            label: i18n.__('Length:', 'x4-media-library'),
            value: this.attachment.get('fileLength'),
          }]);
        }

        result = result.concat([
          {
            label: i18n.__('File size:', 'x4-media-library'),
            value: this.attachment.get('filesizeHumanReadable'),
          },
          {
            label: i18n.__('File type:', 'x4-media-library'),
            value: this.attachment.get('mime'),
          },
        ]);

        if (this.file.mime === 'image') {
          result = result.concat([{
            label: i18n.__('Image size:', 'x4-media-library'),
            value: this.attachment.get('width') + 'x' + this.attachment.get('height'),
          }]);
        }

        if ((this.file.mime === 'audio' || this.file.mime === 'video') && this.bitrate) {
          result = result.concat([{
            label: i18n.__('Bitrate:', 'x4-media-library'),
            value: Math.round(this.bitrate / 1000) + i18n.__('kb/s', 'x4-media-library') + ' ' + this.bitrateMode.toUpperCase(),
          }]);
        }

        return result;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-stats
    display: flex
    flex-direction: column
    padding: 32px 16px 0

  .x4-line
    display: flex
    font-size: 13px
    font-weight: 500
    line-height: 1.5
    justify-content: center
    user-select: text

  .x4-label
    padding-right: 3px

  .x4-value
    font-weight: 400

</style>
