<template lang="pug">

  UISelect.x4-month(
    :value="month"
    :options="months"
    icon="date_range"
    :label="labelMonth"
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

      month({ state }) {
        return state.filters.month;
      },

      months({ state }) {
        let result = {};

        let labels = {
          1: 'January',
          2: 'February',
          3: 'March',
          4: 'April',
          5: 'May',
          6: 'June',
          7: 'July',
          8: 'August',
          9: 'September',
          10: 'October',
          11: 'November',
          12: 'December',
        };

        for (let file of Object.values(state.files)) {
          result[file.month] = true;
        }

        result = Object.keys(result).map(parseFloat).sort((a, b) => a - b).map(value => {
          return { value, label: labels[value] };
        });

        return result;
      },

      labelMonth() {
        return i18n.__('Month', 'x4-media-library');
      },

    },


    methods: {

      change({ dispatch }, month) {
        dispatch('FILTERS_MONTH_CHANGE_APPLY', { month });
      },

    },

  };

</script>
