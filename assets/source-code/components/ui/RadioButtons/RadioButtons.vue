<template lang="pug">

  div.x4-ui-radio-buttons

    RadioButton(
      v-for="option in options"
      :key="option.value"
      :option="option"
      :value="value"
      @change="change")

</template>


<script>

  import RadioButton from './RadioButton';


  export default {

    props: [
      'options',
      'value',
    ],


    components: {
      RadioButton,
    },


    methods: {

      change(context, value) {
        this.$emit('change', value);
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-radio-buttons
    display: flex
    flex-direction: column

</style>
