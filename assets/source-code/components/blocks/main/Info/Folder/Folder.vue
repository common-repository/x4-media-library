<template lang="pug">

  transition(name="x4" appear)
    div.x4-folder.x4-transition

      Preview

      Name

      Stats

      Actions

      Icon

      Color

</template>


<script>

  import Preview from './Preview';
  import Name from './Name';
  import Stats from './Stats';
  import Actions from './Actions';
  import Icon from './Icon';
  import Color from './Color';

  
  export default {

    components: {
      Preview,
      Name,
      Stats,
      Actions,
      Icon,
      Color,
    },

  };

</script>


<style lang="sass" scoped>

  .x4-folder
    display: flex
    flex-direction: column
    width: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1
  
</style>
