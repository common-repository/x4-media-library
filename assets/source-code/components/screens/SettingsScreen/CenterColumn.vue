<template lang="pug">

  div.x4-center-column(
    @dragenter="dragOver"
    @dragover="dragOver")

    div.x4-top-row

      MenuButtonLeft
      Title

    div.x4-subtop-row

    div.x4-content-row.x4-scrollable

      IgnoredFolders(
        v-if="page === 'ignored-folders'")

      FileExtensions(
        v-if="page === 'file-extensions'")

</template>


<script>

  import Title from '~/components/blocks/settings/Title';
  import MenuButtonLeft from '~/components/blocks/common/buttons/MenuButtonLeft';
  import IgnoredFolders from '~/components/blocks/settings/IgnoredFolders';
  import FileExtensions from '~/components/blocks/settings/FileExtensions';


  export default {

    components: {
      Title,
      MenuButtonLeft,
      IgnoredFolders,
      FileExtensions,
    },


    computed: {

      page({ getters }) {
        return getters['settings/menu/active'].page;
      },

    },


    methods: {

      dragOver({ dispatch }, event) {
        dispatch('LEFT_RESIZER_DRAG_OVER', { event });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-center-column
    display: flex
    flex-direction: column
    flex-shrink: 100000
    height: 100%
    width: 100%

  .x4-top-row
    align-items: center
    @include background-color($primary)
    display: flex
    height: 64px
    padding: 0 12px

  .x4-subtop-row
    @include background-color($black, .04)
    display: flex
    height: 48px

  .x4-content-row
    @include background-color($white)
    display: flex
    flex-direction: column
    flex-shrink: 100000
    padding: 32px 32px
    position: relative
    height: 100%

    &.x4-scrollable::-webkit-scrollbar
      width: 8px!important

    > div
      flex-shrink: 0

</style>
