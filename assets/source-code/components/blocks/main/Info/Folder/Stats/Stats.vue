<template lang="pug">
  
  div.x4-stats

    UILabel.x4-count(
      :label="labelCount")

    UILabel.x4-total(
      :label="labelTotal")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UILabel from '~/components/ui/Label';

  
  export default {

    components: {
      UILabel,
    },


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

      foldersCount({ getters }) {
        return (getters['folders/perDir'][this.folder.path] || []).length;
      },

      filesCount({ getters }) {
        return (getters['files/perDir'][this.folder.path] || []).length;
      },

      foldersTotal({ getters }) {
        return getters['folders/count'][this.folder.path] || 0;
      },

      filesTotal({ getters }) {
        return getters['files/count'][this.folder.path] || 0;
      },

      labelCount() {
        return i18n.__('%1$d folders, %2$d files inside', 'x4-media-library')
          .replace('%1$d', this.foldersCount)
          .replace('%2$d', this.filesCount);
      },

      labelTotal() {
        return i18n.__('%1$d folders, %2$d files in total', 'x4-media-library')
          .replace('%1$d', this.foldersTotal)
          .replace('%2$d', this.filesTotal);
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-stats
    display: flex
    flex-direction: column
    padding: 16px 16px 0

  .x4-count
    font-size: 13px
    line-height: 1.5
    text-align: center
    user-select: text

  .x4-total
    font-size: 13px
    line-height: 1.5
    text-align: center
    user-select: text

</style>
