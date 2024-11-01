<template lang="pug">

  div.x4-tabs

    Tab(
      v-for="(tab, index) of tabs"
      :key="index"
      :tab="tab")

</template>


<script>

  import i18n from '~/utils/i18n';
  import Tab from './Tab';


  export default {

    components: {
      Tab,
    },


    computed: {

      tabs({ state }) {
        return [
          {
            value: 'view',
            icon: 'view_comfy',
            label: i18n.__('View', 'x4-media-library'),
            changed: false,
          },
          {
            value: 'sortby',
            icon: 'sort_by_alpha',
            label: i18n.__('Sort By', 'x4-media-library'),
            changed: false,
          },
          {
            value: 'filters',
            icon: 'filter_list',
            label: i18n.__('Filters', 'x4-media-library'),
            changed: state.filters.mime || state.filters.ext || state.filters.year || state.filters.month || state.filters.day,
          },
          {
            value: 'search',
            icon: 'search',
            label: i18n.__('Search', 'x4-media-library'),
            changed: !!state.search.text,
          },
        ];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-tabs
    align-items: center
    display: flex
    margin-left: auto

</style>
