<template lang="pug">

  div.x4-preview(
    :class="classObject")

    div.x4-inside(
      :style="styleInside")

      a.x4-link(
        v-if="visible"
        target="_blank"
        :href="file.url")

        UIFileIcon(
          :size="iconSize"
          :file="file"
          :src="url")

</template>


<script>

  import UIFileIcon from '~/components/ui/FileIcon';

  
  export default {

    components: {
      UIFileIcon,
    },


    computed: {

      size({ state }) {
        return state.rightColumn.width;
      },

      classObject() {
        return {
          'x4-image': this.file.mime === 'image',
        };
      },

      styleInside({ state }) {
        return {
          height: this.file.mime === 'image'
            ?  this.size + 'px'
            : null,
        };
      },

      attachment({ state, storage }) {
        return state.attachments[this.file.id]
          ? storage.attachments[this.file.id]
          : null;
      },

      visible() {
        return this.file.mime === 'image'
          ? !!this.attachment
          : true;
      },

      url() {
        let url = this.file.url;

        if (this.file.mime === 'image') {
          let sizes = this.attachment.get('sizes');

          if (sizes) {
            let thumbs = Object.values(sizes);
            let minSize = 1000000;

            for (let thumb of thumbs) {
              let propName = thumb.orientation === 'landscape'
                ? 'height'
                : 'width';

              if (thumb[propName] >= this.size && thumb[propName] < minSize) {
                minSize = thumb[propName];
                url = thumb.url;
              }
            }
          }
        }

        return url;
      },

      iconSize({ state }) {
        return state.rightColumn.width * .64;
      },

      file({ getters }) {
        return getters['info/entity'];
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-preview
    display: flex
    flex-direction: column
    padding-top: 12px

    &.x4-image
      padding-bottom: 12px
      padding-top: 0

  .x4-inside
    display: flex
    flex-direction: column

  .x4-link
    align-items: center
    display: flex
    flex-direction: column
    height: 100%
    justify-content: center
  
</style>
