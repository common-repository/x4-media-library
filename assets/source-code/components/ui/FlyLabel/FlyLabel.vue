<template lang="pug">

  transition(name="x4" appear)

    div.x4-ui-fly-label.x4-transition(
      v-if="visible")

      | {{ label }}

</template>


<script>

  export default {

    props: [
      'label',
    ],


    data() {
      return {
        visible: false,
      }
    },


    mounted() {
      this.$el.parentNode.addEventListener('click', this.click);
    },


    methods: {

      click(context, event) {
        if (event.button !== 0 || !this.$el.parentNode) {
          return;
        }

        this.visible = true;

        setTimeout(() => {
          this.visible = false;
        }, 1000);
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-fly-label
    font-size: 12px
    left: 0
    line-height: 1
    position: absolute
    right: 0
    text-align: center
    top: -18px

    &.x4-enter, &.x4-leave-to
      opacity: 0
      top: 0

</style>
