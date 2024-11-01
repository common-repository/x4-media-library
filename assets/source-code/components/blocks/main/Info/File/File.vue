<template lang="pug">

  transition(name="x4" appear)
    div.x4-file.x4-transition

      Preview

      Name

      Uploaded

      Actions

      Stats

      Url

      Fields

</template>


<script>

  import Preview from './Preview';
  import Name from './Name';
  import Uploaded from './Uploaded';
  import Actions from './Actions';
  import Stats from './Stats';
  import Url from './Url';
  import Fields from './Fields';

  
  export default {

    components: {
      Preview,
      Name,
      Uploaded,
      Actions,
      Stats,
      Url,
      Fields,
    },


    created({ getters, dispatch }) {
      if (getters['rightColumn/visible']) {
        dispatch('ATTACHMENT_ENSURE', { file: getters['info/entity'] });
      }
    },

  };

</script>


<style lang="sass" scoped>

  .x4-file
    display: flex
    flex-direction: column
    width: 100%

    &.x4-enter, &.x4-leave-to
      opacity: 0

    &.x4-leave, &.x4-leave-to
      position: absolute
      z-index: 1
  
</style>
