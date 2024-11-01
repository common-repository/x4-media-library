<template lang="pug">

  UISelect.x4-year(
    :value="year"
    :options="years"
    icon="date_range"
    :label="labelYear"
    @change="change")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UISelect from '~/components/ui/Select';


  export default {

    components: {
      UISelect,
    },


    computed: {

      year({ state }) {
        return state.filters.year;
      },

      years({ state }) {
        let result = {};

        for (let file of Object.values(state.files)) {
          result[file.year] = true;
        }

        result = Object.keys(result).map(parseFloat).sort((a, b) => a - b).map(value => {
          return { value, label: value };
        });

        return result;
      },

      labelYear() {
        return i18n.__('Year', 'x4-media-library');
      },

    },


    methods: {

      change({ dispatch }, year) {
        dispatch('FILTERS_YEAR_CHANGE_APPLY', { year });
      },

    },

  };

</script>
