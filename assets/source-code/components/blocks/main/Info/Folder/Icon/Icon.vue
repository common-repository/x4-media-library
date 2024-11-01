<template lang="pug">
  
  div.x4-icon(
    :class="classObject")

    div.x4-header(
      @click.stop="toggle")

      UIIcon.x4-expand.x4-transition(
        icon="chevron_right"
        :size="24")

      UILabel.x4-label(
        :label="labelHeader")

    UISlidedown.x4-controls(
      :opened="expanded")

      div.x4-controls-inside(
        key="inside")

        UIRadioButtons(
          :value="type"
          :options="types"
          @change="typeChange")

        div.x4-material(
          v-if="type === 'material'")

          UIInput(
            icon="info"
            :value="icon"
            :label="labelIconField"
            :error="errorIconField"
            @keydown.native.stop
            @keyup.native.stop
            @change="iconChange")

          div.x4-hint

            UILabel(
              :label="labelHint")

            a(
              target="_blank"
              href="https://material.io/tools/icons/?style=baseline")

              UILabel(
                :label="labelHintLink")

</template>


<script>

  import i18n from '~/utils/i18n';
  import debounce from '~/utils/debounce';
  import { isIcon } from '~/utils/validators';
  import UIIcon from '~/components/ui/Icon';
  import UILabel from '~/components/ui/Label';
  import UISlidedown from '~/components/ui/Slidedown';
  import UIRadioButtons from '~/components/ui/RadioButtons';
  import UIInput from '~/components/ui/Input';

  
  export default {

    components: {
      UIIcon,
      UILabel,
      UISlidedown,
      UIRadioButtons,
      UIInput,
    },


    data({ getters }) {
      let folder = getters['info/entity'];

      return {
        expanded: false,
        icon: folder.icon,
        type: folder.icon === ''
          ? 'default'
          : 'material',
      };
    },


    computed: {

      folder({ getters }) {
        return getters['info/entity'];
      },

      types() {
        return [
          {
            value: 'default',
            label: i18n.__('default icon', 'x4-media-library'),
          },
          {
            value: 'material',
            label: i18n.__('material icon', 'x4-media-library'),
          },
        ];
      },

      classObject() {
        return {
          'x4-expanded': this.expanded,
        };
      },

      labelHeader() {
        return i18n.__('Change Icon', 'x4-media-library');
      },

      labelIconField() {
        return i18n.__('Icon code', 'x4-media-library');
      },

      labelHint() {
        return i18n.__('Click here to see a list of', 'x4-media-library');
      },

      labelHintLink() {
        return i18n.__('available icons', 'x4-media-library');
      },

      errorIconField() {
        return this.icon && !isIcon(this.icon)
          ? i18n.__('icon is not valid', 'x4-media-library')
          : null;
      },

    },


    methods: {

      toggle() {
        this.expanded = !this.expanded;
      },

      typeChange({ dispatch }, type) {
        this.type = type;

        if (type === 'default' && this.folder.icon !== '') {
          dispatch('FOLDER_ICON_CHANGE_APPLY', { folder: this.folder, icon: '' });
        }

        if (type === 'material' && this.icon !== this.folder.icon) {
          dispatch('FOLDER_ICON_CHANGE_APPLY', { folder: this.folder, icon: this.icon });
        }
      },

      iconChange({ dispatch }, icon) {
        this.icon = icon;

        if (!isIcon(icon)) {
          return;
        }

        debounce('info:icon', 1000, true, () => {
          dispatch('FOLDER_ICON_CHANGE_APPLY', { folder: this.folder, icon });
        });
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-icon
    display: flex
    flex-direction: column
    padding: 32px 16px 0

  .x4-header
    align-items: center
    cursor: pointer
    display: flex

  .x4-expand
    @include color($black, .54)

    .x4-icon.x4-expanded > .x4-header > &
      transform: rotate(90deg)

  .x4-label
    flex-shrink: 100000
    font-size: 16px
    font-weight: 500
    line-height: 1.5

  .x4-controls
    display: flex
    flex-direction: column

  .x4-controls-inside
    display: flex
    flex-direction: column
    flex-shrink: 0

  .x4-ui-radio-buttons
    padding-top: 8px

    /deep/ .x4-radio-button
      height: 28px

  .x4-material
    display: flex
    flex-direction: column

  .x4-ui-input
    padding-top: 8px

  .x4-hint
    display: flex
    font-size: 10px
    line-height: 1.5

    > .x4-ui-label
      padding-right: 2px
  
</style>
