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

      folders({ state }) {
        return Object.values(state.selected.folders);
      },

      files({ state }) {
        return Object.values(state.selected.files);
      },

      foldersCount({ getters }) {
        return getters['selected/folders/count'];
      },

      filesCount({ getters }) {
        return getters['selected/files/count'];
      },

      foldersTotal({ state, getters }) {
        let allFolders = this.folders.slice();

        for (let folder of this.folders) {
          allFolders = allFolders.concat(getters['folders/children'][folder.path] || []);
        }

        allFolders = allFolders.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

        return allFolders.length;
      },

      filesTotal({ state, getters }) {
        let allFiles = this.files.slice();

        for (let folder of this.folders) {
          let children = getters['folders/children'][folder.path] || [];
          allFiles = allFiles.concat(getters['files/perDir'][folder.path] || []);

          for (let child of children) {
            allFiles = allFiles.concat(getters['files/perDir'][child.path] || []);
          }
        }

        allFiles = allFiles.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

        return allFiles.length;
      },

      labelCount() {
        return i18n.__('%1$d folders, %2$d files', 'x4-media-library')
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
