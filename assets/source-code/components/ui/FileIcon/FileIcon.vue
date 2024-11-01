<template lang="pug">

  div.x4-ui-file-icon(
    :class="classObject")

    img.x4-image(
      v-if="file.mime === 'image'"
      draggable="false"
      :src="asrc"
      @error="setTiny")

    div.x4-icons(
      v-else)

      UIIcon.x4-other-icon(
        icon="insert_drive_file"
        :size="size")

      UIIcon.x4-mime-icon(
        :icon="mimeIcon"
        :size="mimeSize")

</template>


<script>

  import $ from 'jquery';
  import UIIcon from '~/components/ui/Icon';

  let cache = {};


  export default {

    props: [
      'file',
      'src',
      'size',
      'lazy',
    ],


    components: {
      UIIcon,
    },


    data() {
      return {
        asrc: this.file.mime === 'image'
          ? this.lazy && !cache[this.src]
            ?  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
            : this.src
          : this.src,
      };
    },


    watch: {

      src(value) {
        this.asrc = value;
      },

    },


    created() {
      if (this.lazy && !cache[this.src] && this.file.mime === 'image') {
        $.get({ url: this.src })
          .done(resp => {
            cache[this.src] = true;
            this.asrc = this.src;
          });
      }
    },


    computed: {

      

      classObject() {
        return {
          'x4-tiny': this.file.tiny,
        };
      },

      mimeSize() {
        return this.size / 3;
      },

      mimeIcon() {
        let icon = '';

        switch (this.file.mime) {
          case 'text':
            icon = 'text_fields';
            break;
          case 'audio':
            icon = 'library_music';
            break;
          case 'video':
            icon = 'video_library';
            break;
          case 'application':
            icon = 'library_books';
            break;
        }

        return icon;
      },

    },


    methods: {

      setTiny({ dispatch }) {
        dispatch('FILE_TINY_CHANGE_APPLY', { file: this.file, tiny: true });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-file-icon
    display: flex
    flex-direction: column
    max-height: 100%
    max-width: 100%

  .x4-image
    object-fit: cover
    overflow: hidden

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)
      flex-shrink: 0
      height: auto
      max-width: 100%

  .x4-icons
    align-items: center
    display: flex
    flex-direction: column
    justify-content: center
    position: relative

  .x4-other-icon
    @include color($black, .12)

  .x4-mime-icon
    align-items: center
    bottom: 0
    @include color($black, .12)
    display: flex
    flex-direction: column
    justify-content: center
    left: 0
    padding-top: 28%
    position: absolute
    right: 0
    top: 0

</style>
