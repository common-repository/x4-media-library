<template lang="pug">
  
  div.x4-url
    
    UILabel.x4-label(
      :label="labelFileUrl")

    UILabel.x4-value(
      :label="file.url"
      @click.native.stop="copy")

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

      labelFileUrl() {
        return i18n.__('File URL:', 'x4-media-library');
      },

    },


    methods: {

      copy() {
        document.execCommand('copy');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-url
    display: flex
    flex-direction: column
    padding: 32px 16px 0

  .x4-label
    font-size: 14px
    font-weight: 500
    line-height: 1.5
    text-align: center

  .x4-value
    font-size: 13px
    line-height: 1.5
    text-align: center
    user-select: all
    white-space: normal
    word-break: break-word
  
</style>
