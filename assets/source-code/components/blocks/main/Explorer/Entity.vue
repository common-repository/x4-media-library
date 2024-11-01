<template lang="pug">

  div.x4-entity(
    :draggable="true"
    :class="classObject"
    @mousedown.left.stop="mouseDownLeft"
    @mousedown.right.stop="mouseDownRight"
    @mousedown.middle.stop
    @mouseup.left.stop="mouseUpLeft"
    @mouseup.right.stop
    @mouseup.middle.stop
    @contextmenu.prevent.stop="contextMenu"
    @dragstart.stop="dragStart"
    @dragend.stop="dragEnd"
    @drag.stop)

    slot(
      name="multiple_remove")

    div.x4-wrapper

      transition(name="x4")
        div.x4-last(
          v-if="entity.explorer.last")

      div.x4-inside(
        :style="styleInside")

        div.x4-preview(
          :style="stylePreview")
          
          slot(name="main")

        div.x4-name

          Rename(
            v-if="renameVisible"
            :rows="2")

          div.x4-name-text(
            v-else)
            | {{ entity.base }}

</template>


<script>

  import Rename from '~/components/blocks/main/Rename';


  export default {

    props: [
      'entity',
      'type',
      'unique',
    ],


    components: {
      Rename,
    },


    created({ storage }) {
      storage.explorer[this.type][this._uid] = this;
    },


    beforeDestroy({ storage }) {
      delete storage.explorer[this.type][this._uid];
    },


    computed: {

      renameVisible({ state }) {
        return this.entity.explorer.rename;
      },

      classObject({ state, $frame }) {
        return {
          'x4-selected': this.entity.explorer.selected,
          'x4-moveto': this.entity.explorer.moveto,
          'x4-cut': this.entity.explorer.cut,
        };
      },

      styleInside({ state }) {
        return { 
          width: state.explorer.entitySize + 'px',
        };
      },

      stylePreview({ state }) {
        return {
          height: state.explorer.entitySize + 'px',
        };
      },

    },


    methods: {

      mouseDownLeft({ dispatch }, event) {
        dispatch('SELECTED_MOUSE_DOWN_LEFT', { event, entity: this.entity, type: this.type, unique: this.unique });
      },

      mouseDownRight({ dispatch }, event) {
        dispatch('SELECTED_MOUSE_DOWN_RIGHT', { event, entity: this.entity, type: this.type, unique: this.unique });
      },

      mouseUpLeft({ dispatch }, event) {
        dispatch('SELECTED_MOUSE_UP_LEFT', { event, entity: this.entity, type: this.type, unique: this.unique });
      },

      contextMenu({ dispatch }, event) {
        dispatch('CONTEXT_SHOW', { event, block: 'explorer', entity: this.entity, type: this.type, single: true });
      },

      dragStart({ dispatch }, event) {
        dispatch('MOVE_DRAG_START', { event, block: 'explorer', entity: this.entity, type: this.type });
      },

      dragEnd({ dispatch }, event) {
        dispatch('MOVE_DRAG_END', { event, block: 'explorer', entity: this.entity, type: this.type });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-entity
    display: flex
    flex-direction: column
    position: relative

    &.x4-selection
      @include background-color($accent, .16)

    &.x4-selected
      @include background-color($primary, .24)

    &.x4-selected.x4-selection
      @include background-color($mixed, .24)

    &.x4-moveto
      @include background-color($accent, .16)

    .x4-entities.x4-view-huge > &
      margin: 2px 8px

    .x4-entities.x4-view-large > &
      margin: 2px 6px

    .x4-entities.x4-view-medium > &
      margin: 2px 4px

    .x4-entities.x4-view-small > &
      margin: 2px 2px

  .x4-multiple-remove
    @include background-color($white, .8)
    cursor: pointer
    display: flex
    position: absolute
    right: 0
    top: 0
    z-index: 1

  .x4-wrapper
    transition-property: none!important

    &:hover
      @include background-color($primary, .16)

      .x4-entity.x4-selected > &
        transition-property: all!important
        background-color: transparent

    .x4-entities.x4-view-huge > .x4-entity > &
      padding: 10px 10px

    .x4-entities.x4-view-large > .x4-entity > &
      padding: 8px 8px

    .x4-entities.x4-view-medium > .x4-entity > &
      padding: 6px 6px

    .x4-entities.x4-view-small > .x4-entity > &
      padding: 4px 4px

  .x4-last
    border: 1px solid transparent
    @include border-color($primary, .32)
    bottom: 0
    left: 0
    position: absolute
    right: 0
    top: 0

  .x4-inside
    display: flex
    flex-direction: column

  .x4-preview
    align-items: center
    display: flex
    justify-content: center
    position: relative

    .x4-entity.x4-cut > .x4-wrapper > .x4-inside > &
      opacity: .48

  .x4-name
    display: flex
    flex-direction: column
    padding-top: 2px
    position: relative

  .x4-rename
    line-height: 1.5
    margin-top: -2px
    padding: 0 4px
    text-align: center

    .x4-entities.x4-view-huge > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 12px

    .x4-entities.x4-view-large > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 11px

    .x4-entities.x4-view-medium > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 10px

    .x4-entities.x4-view-small > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 9px

  .x4-name-text
    display: -webkit-box
    line-height: 1.5
    text-align: center
    word-break: break-word
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical

    .x4-entities.x4-view-huge > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 12px
      height: 36px

    .x4-entities.x4-view-large > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 11px
      height: 32px

    .x4-entities.x4-view-medium > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 10px
      height: 30px

    .x4-entities.x4-view-small > .x4-entity > .x4-wrapper > .x4-inside > .x4-name > &
      font-size: 9px
      height: 26px

</style>
