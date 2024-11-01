<template lang="pug">
  
  div.x4-fields(
    v-if="attachment"
    :class="classObject")

    div.x4-header(
      @click.stop="toggle")

      UIIcon.x4-expand.x4-transition(
        icon="chevron_right")

      UILabel.x4-label(
        :label="labelHeader")

    UISlidedown.x4-controls(
      :opened="expanded")

      Field(
        v-for="field of fields"
        :key="field.name"
        :field="field")
    
</template>


<script>

  import i18n from '~/utils/i18n';
  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UISlidedown from '~/components/ui/Slidedown';
  import Field from './Field';


  export default {

    components: {
      UIIcon,
      UILabel,
      UISlidedown,
      Field,
    },


    data() {
      return {
        expanded: false,
      };
    },


    computed: {

      file({ getters }) {
        return getters['info/entity'];
      },

      attachment({ state, storage }) {
        return state.attachments[this.file.id]
          ? storage.attachments[this.file.id]
          : null;
      },

      classObject() {
        return {
          'x4-expanded': this.expanded,
        };
      },

      labelHeader() {
        return i18n.__('Edit Meta Fields', 'x4-media-library');
      },

      fields() {
        let result = [];

        result = result.concat([{
          name: 'title',
          icon: 'title',
          value: this.attachment.get('title'),
          label: i18n.__('Title', 'x4-media-library'),
        }]);

        if (this.file.mime === 'audio') {
          result = result.concat([
            {
              name: 'artist',
              icon: 'music_note',
              value: this.attachment.get('artist') || this.attachment.get('meta').artist,
              label: i18n.__('Artist', 'x4-media-library'),
            },
            {
              name: 'album',
              icon: 'queue_music',
              value: this.attachment.get('album') || this.attachment.get('meta').album,
              label: i18n.__('Album', 'x4-media-library'),
            },
          ]);
        }

        result = result.concat([
          {
            name: 'caption',
            icon: 'copyright',
            value: this.attachment.get('caption'),
            label: i18n.__('Caption', 'x4-media-library'),
          },
          {
            name: 'description',
            icon: 'description',
            value: this.attachment.get('description'),
            label: i18n.__('Description', 'x4-media-library'),
          },
        ]);

        if (this.file.mime === 'image') {
          result = result.concat([{
            name: 'alt',
            icon: 'text_format',
            value: this.attachment.get('alt'),
            label: i18n.__('Alternative Text', 'x4-media-library'),
          }]);
        }

        return result;
      },

    },


    methods: {

      toggle() {
        this.expanded = !this.expanded;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-fields
    display: flex
    flex-direction: column
    padding: 32px 16px 0

  .x4-header
    align-items: center
    cursor: pointer
    display: flex

  .x4-expand
    @include color($black, .54)

    .x4-fields.x4-expanded > .x4-header > &
      transform: rotate(90deg)

  .x4-label
    flex-shrink: 100000
    font-size: 16px
    font-weight: 500
    line-height: 1.5

  .x4-ui-input
    padding-top: 8px
  
</style>
