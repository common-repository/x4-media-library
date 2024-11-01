<template lang="pug">

  textarea.x4-rename(
    :draggable="true"
    :rows="arows"
    @click.stop
    @dblclick.stop
    @mousedown.stop
    @mouseup.stop
    @contextmenu.stop
    @keydown.stop="keydown"
    @blur.stop="rename"
    @dragstart.prevent.stop
    @dragend.prevent.stop
    @drag.prevent.stop)

    | {{ value }}

</template>


<script>

  export default {

    props: [
      'rows',
    ],


    data({ state }) {
      return {
        value: state.rename.type === 'folders'
          ? state.rename.entity.base
          : state.rename.entity.name,
      };
    },


    mounted({ dispatch }) {
      this.$el.focus();
      this.$el.select();

      dispatch('RENAME_INIT', { rename: this });
    },


    computed: {

      arows() {
        return this.rows || 2;
      },

    },


    methods: {

      keydown({ dispatch }, event) {
        dispatch('RENAME_KEYDOWN', { event });
      },

      rename({ state, dispatch }) {
        if (!state.rename.visible) {
          return;
        }

        dispatch('RENAME_APPLY', { value: this.$el.value });
      },

      cancel({ dispatch }) {
        dispatch('RENAME_CANCEL');
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-rename
    @include background-color($white, 1, !important)
    border: 1px solid!important
    @include border-color($black, .32, !important)
    box-shadow: none!important
    font-size: 12px
    line-height: 1.5
    margin: 0
    outline: none!important
    padding: 0
    resize: none
    text-shadow: none
    width: 100%

</style>
