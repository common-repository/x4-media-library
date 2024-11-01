<template lang="pug">

  Item.x4-action(
    :icon="action.icon"
    :label="alabel"
    :disabled="action.disabled"
    @click.native.stop="click")

</template>


<script>

  import Item from '../Item';


  export default {

    props: [
      'action',
    ],


    components: {
      Item,
    },


    computed: {

      alabel({ getters }) {
        return getters['centerColumn'].width >= 840
          ? this.action.label
          : null;
      },

    },


    methods: {

      click() {
        this.action.click();
      },

    },

  };

</script>
