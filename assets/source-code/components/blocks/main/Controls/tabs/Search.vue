<template lang="pug">

  div.x4-search-tab.x4-transition

    UILabel(
      :label="labelSearch")

    UIInput.x4-search-text(
      ref="input"
      :value="text"
      icon="search"
      :label="labelText"
      @keydown.native.stop
      @keyup.native.stop
      @change="textChange")

    UICheckbox(
      :value="current"
      :label="labelCurrent"
      @change="currentChange")

    transition(name="x4")
      UICheckbox.x4-transition(
        v-if="current"
        :value="deep"
        :label="labelDeep"
        @change="deepChange")

    div.x4-buttons

      UIButton.x4-reset(
        icon="settings_backup_restore"
        :label="labelReset"
        @click="reset")

      UIButton.x4-close(
        type="gray"
        icon="close"
        :label="labelClose"
        @click="close")

</template>


<script>

  import i18n from '~/utils/i18n';
  import debounce from '~/utils/debounce';
  import UILabel from '~/components/ui/Label';
  import UIInput from '~/components/ui/Input';
  import UIButton from '~/components/ui/Button';
  import UICheckbox from '~/components/ui/Checkbox';


  export default {

    components: {
      UILabel,
      UIInput,
      UIButton,
      UICheckbox,
    },


    mounted() {
      this.$refs.input.$refs.input.focus();
    },


    computed: {

      text({ state }) {
        return state.search.text;
      },

      current({ state }) {
        return state.search.current;
      },

      deep({ state }) {
        return state.search.deep;
      },

      labelSearch() {
        return i18n.__('Search', 'x4-media-library');
      },

      labelText() {
        return i18n.__('Search Text', 'x4-media-library');
      },

      labelCurrent() {
        return i18n.__('search in the current folder only', 'x4-media-library');
      },

      labelDeep() {
        return i18n.__('search in subfolders also', 'x4-media-library');
      },

      labelReset() {
        return i18n.__('Reset', 'x4-media-library');
      },

      labelClose() {
        return i18n.__('Close', 'x4-media-library');
      },

    },


    methods: {

      close({ dispatch }) {
        dispatch('CONTROLS_CLOSE');
      },

      reset({ dispatch }) {
        dispatch('SEARCH_RESET');
      },

      textChange({ dispatch }, text) {
        debounce('search', 1000, true, () => {
          dispatch('SEARCH_TEXT_CHANGE_APPLY', { text });
        });
      },

      currentChange({ dispatch }, current) {
        dispatch('SEARCH_CURRENT_CHANGE_APPLY', { current });
      },

      deepChange({ dispatch }, deep) {
        dispatch('SEARCH_DEEP_CHANGE_APPLY', { deep });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-search-tab
    display: flex
    flex-direction: column
    flex-shrink: 0
    padding: 24px 32px 16px

  .x4-ui-checkbox
    height: 32px
    padding-left: 0

    &.x4-enter, &.x4-leave-to
      opacity: 0

  .x4-ui-label
    font-size: 18px
    font-weight: 500
    line-height: 1.5
    padding-bottom: 8px

  .x4-search-text
    padding-bottom: 8px

  .x4-buttons
    display: flex
    padding-top: 24px

  .x4-close
    padding-left: 8px

</style>
