<template lang="pug">

  UISelect.x4-day(
    :value="day"
    :options="days"
    icon="date_range"
    :label="labelDay"
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

      day({ state }) {
        return state.filters.day;
      },

      days({ state }) {
        let result = {};

        for (let file of Object.values(state.files)) {
          result[file.day] = true;
        }

        result = Object.keys(result).map(parseFloat).sort((a, b) => a - b).map(value => {
          return { value, label: value };
        });

        return result;
      },

      labelDay() {
        return i18n.__('Day', 'x4-media-library');
      },

    },


    methods: {

      change({ dispatch }, day) {
        dispatch('FILTERS_DAY_CHANGE_APPLY', { day });
      },

    },

  };

</script>
