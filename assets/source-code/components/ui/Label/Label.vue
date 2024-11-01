<template lang="pug">

  div.x4-ui-label(
    v-html="value")

</template>


<script>

  export default {

    props: [
      'label',
      'html',
    ],


    computed: {

      value() {
        return this.label !== undefined
          ? this.label
          : this.html;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-label
    text-overflow: ellipsis
    white-space: nowrap

</style>
