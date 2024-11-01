<template lang="pug">
  
  UIInput.x4-alt(
    :icon="field.icon"
    :label="field.label"
    :value="field.value"
    @change="change")

</template>


<script>

  import debounce from '~/utils/debounce';
  import UIInput from '~/components/ui/Input';

  
  export default {

    props: [
      'field',
    ],


    components: {
      UIInput,
    },


    computed: {

      file({ getters }) {
        return getters['info/entity'];
      },

    },


    methods: {

      change({ dispatch }, value) {
        debounce('info:file:fields:' + this.field.name, 1000, true, () => {
          dispatch('ATTACHMENT_FIELD_CHANGE_APPLY', { file: this.file, name: this.field.name, value });
        });
      },

    },

  };

</script>
