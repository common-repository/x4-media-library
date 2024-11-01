<template lang="pug">

  div.x4-right-resizer(
    draggable="true"
    @dragstart.stop="dragStart"
    @dragend.stop="dragEnd"
    @drag.stop
    @dragenter="dragOver"
    @dragover="dragOver")

</template>


<script>

  export default {

    methods: {

      dragStart({ dispatch }, event) {
        dispatch('RIGHT_RESIZER_DRAG_START', { event });
      },

      dragEnd({ dispatch }, event) {
        dispatch('RIGHT_RESIZER_DRAG_END', { event });
      },

      dragOver({ dispatch }, event) {
        dispatch('LEFT_RESIZER_DRAG_OVER', { event });
        dispatch('RIGHT_RESIZER_DRAG_OVER', { event });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-right-resizer
    cursor: w-resize
    height: 100%
    margin: 0 -2px 0 -2px
    position: relative
    width: 4px
    z-index: 40

</style>
