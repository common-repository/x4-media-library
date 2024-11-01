<template lang="pug">

  UISelect.x4-mime(
    :value="mime"
    :options="mimes"
    icon="insert_drive_file"
    :label="labelMime"
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

      mime({ state }) {
        return state.filters.mime;
      },

      mimes({ state }) {
        let result = {};

        for (let file of Object.values(state.files)) {
          if (file.mime) {
            result[file.mime] = true;
          }
        }

        result = Object.keys(result).sort().map(value => {
          let label = value;

          if (label === 'application') {
            label = 'document';
          }

          label = label.substr(0, 1).toUpperCase() + label.substr(1);

          return { value, label };
        });

        return result;
      },

      labelMime() {
        return i18n.__('Mime Type', 'x4-media-library');
      },

    },


    methods: {

      change({ dispatch }, mime) {
        dispatch('FILTERS_MIME_CHANGE_APPLY', { mime });
      },

    },

  };

</script>
