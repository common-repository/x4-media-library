<template lang="pug">

  div.x4-ui-ripple(
    v-show="count > 0")

    transition-group.x4-inside(
      tag="div"
      name="x4"
      @enter="count++"
      @after-leave="count--")

      div.x4-ripple(
        v-for="ripple in ripples"
        :style="ripple.style"
        :key="ripple.index")

</template>


<script>

  export default {

    props: [
      'opacity',
      'color',
    ],


    data() {
      return {
        index: 0,
        ripples: [],
        count: 0,
      }
    },


    mounted() {
      this.$el.parentNode.addEventListener('mousedown', this.mousedown);
    },


    methods: {

      mousedown(context, event) {
        if (event.button !== 0 || !this.$el.parentNode) {
          return;
        }

        this.index++;

        let parent = this.$el.parentNode;
        let rect = parent.getBoundingClientRect();

        let width = parent.clientWidth;
        let height = parent.clientHeight;

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let points = [
          [0, 0],
          [width, 0],
          [0, height],
          [width, height],
        ];

        points = points.map(point => {
          return Math.sqrt(Math.pow(point[0] - x, 2) + Math.pow(point[1] - y, 2));
        });

        let max = Math.max.apply({}, points);
        let size = max * 2;

        let left = x - size / 2;
        let top = y - size / 2;

        let ripple = {
          index: this.index,
          style: {
            'background-color': this.color,
            height: size + 'px',
            left: left + 'px',
            opacity: this.opacity,
            top: top + 'px',
            transform: 'scale(0)',
            'transition-duration': '.5s,.4s',
            'transition-timing-function': 'ease,ease-out',
            width: size + 'px',
            'z-index': this.index,
          },
        };

        setTimeout(() => {
          ripple.style.transform = 'scale(1)';
        }, 0);

        setTimeout(() => {
          this.ripples.splice(this.ripples.indexOf(ripple), 1);
        }, 500);

        this.ripples.push(ripple);
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-ripple
    bottom: 0
    left: 0
    pointer-events: none
    position: absolute
    right: 0
    top: 0

  .x4-inside
    height: 100%
    position: relative
    width: 100%

  .x4-ripple
    border-radius: 50%
    position: absolute

    &.x4-leave-to
      opacity: 0!important

</style>
