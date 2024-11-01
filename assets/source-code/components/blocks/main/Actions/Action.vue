<template lang="pug">

  UIButton(
    type="accent"
    :label="action.name"
    :disabled="disabled"
    @click="click")

</template>


<script>

  import UIButton from '~/components/ui/Button';


  export default {

    props: ['action'],


    components: {
      UIButton,
    },


    computed: {

      disabled({ state }) {
        return this.action.required && state.selection.items.length === 0;
      },

    },


    methods: {

      click({ dispatch }) {
        dispatch('ACTION_CLICK', { action: this.action });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-button
    margin-top: 4px

    &:first-child
      margin-top: 0

</style>
