<template lang="pug">

  transition(
    name="x4"
    :css="true"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave")

    transition-group.x4-ui-slidedown.x4-transition(
      v-if="opened"
      tag="div"
      name="x4")

      slot

</template>


<script>

  export default {

    props: [
      'opened',
    ],


    beforeCreate() {
      this.timeout = null;
    },


    methods: {

      enter(context, el) {
        this.$element = el;

        clearTimeout(this.timeout);

        if (!this.$element) {
          return;
        }

        let height = this.$element.scrollHeight;
        this.$element.style['max-height'] = 0;

        setTimeout(() => {
          this.$element.style['max-height'] = height + 'px';
        }, 50);
      },

      afterEnter() {
        if (!this.$element) {
          return;
        }

        this.timeout = setTimeout(() => {
          this.$element.style.removeProperty('max-height');
        }, 300);
      },

      leave() {
        clearTimeout(this.timeout);

        if (!this.$element) {
          return;
        }

        this.$element.style['max-height'] = this.$element.scrollHeight + 'px';

        setTimeout(() => {
          this.$element.style['max-height'] = 0;
        }, 50);
      },

      afterLeave() {
        if (!this.$element) {
          return;
        }

        this.timeout = setTimeout(() => {
          this.$element.style.removeProperty('max-height');
        }, 300);
      },

    },

  };

</script>
