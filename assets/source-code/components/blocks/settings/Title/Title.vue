<template lang="pug">

  UILabel.x4-title(
    :label="title")

</template>


<script>

  import UILabel from '~/components/ui/Label';


  export default {

    components: {
      UILabel,
    },


    computed: {

      title({ getters }) {
        return getters['settings/menu/active'].name;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-title
    @include color($white)
    font-size: 20px
    line-height: 1.5
    padding-left: 20px

</style>
