<template lang="pug">

  UIIcon.x4-ui-folder-icon.x4-is-icon(
    v-if="icon"
    :icon="icon"
    :size="size"
    :style="styleObject")

  div.x4-ui-folder-icon(
    v-else)

    svg.x4-inside(
      draggable="false"
      viewBox="0 0 134 105"
      xmlns="http://www.w3.org/2000/svg"
      :style="styleObject")

      path(:fill="darkColor" d="M0 5a5 5 0 0 1 5-5h35a10 10 0 0 1 7 3l6 6a10 10 0 0 0 7 3h69a5 5 0 0 1 5 5v83a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z")

      path(v-if="count > 1" fill="#eeeeee" d="M13.328 11.678l115.84 6.071-3.401 64.91L9.926 76.59z")
      path(v-if="count > 0" fill="#ffffff" d="M8 16h116v65H8z")

      path(:fill="mainColor" d="M0 25a5 5 0 0 1 5-5h124a5 5 0 0 1 5 5v75a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z")

      g(:fill="darkColor")
        circle(r="2" cx="10" cy="87")
        circle(r="2" cx="15" cy="87")
        circle(r="2" cx="20" cy="87")
        circle(r="2" cx="25" cy="87")
        circle(r="2" cx="30" cy="87")
        circle(r="2" cx="35" cy="87")
        circle(r="2" cx="40" cy="87")
        circle(r="2" cx="45" cy="87")
        circle(r="2" cx="50" cy="87")
        circle(r="2" cx="55" cy="87")
        circle(r="2" cx="60" cy="87")
        circle(r="2" cx="65" cy="87")
        circle(r="2" cx="70" cy="87")
        circle(r="2" cx="75" cy="87")
        circle(r="2" cx="80" cy="87")
        circle(r="2" cx="85" cy="87")
        circle(r="2" cx="90" cy="87")
        circle(r="2" cx="95" cy="87")
        circle(r="2" cx="100" cy="87")
        circle(r="2" cx="105" cy="87")
        circle(r="2" cx="110" cy="87")
        circle(r="2" cx="115" cy="87")
        circle(r="2" cx="120" cy="87")
        circle(r="2" cx="125" cy="87")

      g(:fill="darkColor")
        circle(r="2" cx="10" cy="92")
        circle(r="2" cx="15" cy="92")
        circle(r="2" cx="20" cy="92")
        circle(r="2" cx="25" cy="92")
        circle(r="2" cx="30" cy="92")
        circle(r="2" cx="35" cy="92")
        circle(r="2" cx="40" cy="92")
        circle(r="2" cx="45" cy="92")
        circle(r="2" cx="50" cy="92")
        circle(r="2" cx="55" cy="92")
        circle(r="2" cx="60" cy="92")
        circle(r="2" cx="65" cy="92")
        circle(r="2" cx="70" cy="92")
        circle(r="2" cx="75" cy="92")
        circle(r="2" cx="80" cy="92")
        circle(r="2" cx="85" cy="92")
        circle(r="2" cx="90" cy="92")
        circle(r="2" cx="95" cy="92")
        circle(r="2" cx="100" cy="92")
        circle(r="2" cx="105" cy="92")
        circle(r="2" cx="110" cy="92")
        circle(r="2" cx="115" cy="92")
        circle(r="2" cx="120" cy="92")
        circle(r="2" cx="125" cy="92")

      g(:fill="darkColor")
        circle(r="2" cx="10" cy="97")
        circle(r="2" cx="15" cy="97")
        circle(r="2" cx="20" cy="97")
        circle(r="2" cx="25" cy="97")
        circle(r="2" cx="30" cy="97")
        circle(r="2" cx="35" cy="97")
        circle(r="2" cx="40" cy="97")
        circle(r="2" cx="45" cy="97")
        circle(r="2" cx="50" cy="97")
        circle(r="2" cx="55" cy="97")
        circle(r="2" cx="60" cy="97")
        circle(r="2" cx="65" cy="97")
        circle(r="2" cx="70" cy="97")
        circle(r="2" cx="75" cy="97")
        circle(r="2" cx="80" cy="97")
        circle(r="2" cx="85" cy="97")
        circle(r="2" cx="90" cy="97")
        circle(r="2" cx="95" cy="97")
        circle(r="2" cx="100" cy="97")
        circle(r="2" cx="105" cy="97")
        circle(r="2" cx="110" cy="97")
        circle(r="2" cx="115" cy="97")
        circle(r="2" cx="120" cy="97")
        circle(r="2" cx="125" cy="97")

</template>


<script>

  import { get as getColor } from '~/utils/colors';
  import UIIcon from '~/components/ui/Icon';


  export default {

    props: [
      'folder',
      'size',
    ],


    components: {
      UIIcon,
    },


    computed: {

      icon() {
        return this.folder.icon;
      },

      mainColor({ storage }) {
        return getColor(this.folder.color || storage.constants.folderDefColor);
      },

      darkColor({ storage }) {
        return getColor(this.folder.color || storage.constants.folderDefColor, true);
      },

      count({ getters }) {
        return getters['files/count'][this.folder.path] || 0;
      },

      styleObject() {
        let style = {
          width: this.size + 'px',
        };

        if (this.folder.icon) {
          style.color = this.mainColor;
        }

        return style;
      },

    },

  };

</script>


<style lang="sass" scoped>

  .x4-ui-folder-icon
    display: flex
    flex-direction: column

</style>
