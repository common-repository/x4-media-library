<template lang="pug">

  UILabel.x4-name(
    :label="labelName")

</template>


<script>

  import i18n from '~/utils/i18n';
  import UILabel from '~/components/ui/Label';
  
  
  export default {

    components: {
      UILabel,
    },


    computed: {

      labelName() {
        return i18n.__('Selection', 'x4-media-library');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-name
    font-size: 16px
    line-height: 1.5
    padding: 0 16px
    text-align: center

</style>
