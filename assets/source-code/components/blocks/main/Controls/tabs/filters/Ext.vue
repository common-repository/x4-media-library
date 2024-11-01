<template lang="pug">

  UISelect.x4-ext(
    :value="ext"
    :options="exts"
    icon="attach_file"
    :label="labelExt"
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

      ext({ state }) {
        return state.filters.ext;
      },

      exts({ state }) {
        let result = {};

        for (let file of Object.values(state.files)) {
          result[file.ext] = true;
        }

        result = Object.keys(result).sort().map(value => {
          return { value, label: value };
        });

        return result;
      },

      labelExt() {
        return i18n.__('File Extension', 'x4-media-library');
      },

    },


    methods: {

      change({ dispatch }, ext) {
        dispatch('FILTERS_EXT_CHANGE_APPLY', { ext });
      },

    },

  };

</script>
