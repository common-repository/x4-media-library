<template lang="pug">

  Item.x4-tab(
    :icon="tab.icon"
    :label="alabel"
    :class="classObject"
    @click.native.stop="click")


</template>


<script>

  import Item from '../Item';


  export default {

    props: [
      'tab',
    ],


    components: {
      Item,
    },


    computed: {

      alabel({ getters }) {
        return getters['centerColumn'].width >= 644
          ? this.tab.label
          : null;
      },

      classObject({ state }) {
        return {
          'x4-active': this.tab.value === state.controls.active,
          'x4-changed': this.tab.changed,
        };
      },

    },


    methods: {

      click({ dispatch }) {
        dispatch('CONTROLS_TOGGLE', { active: this.tab.value });
      },

    },

  };

</script>
