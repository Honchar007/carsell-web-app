<template>
  <h2 class="modal-title">
    <slot/>
  </h2>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalTitleWrapper',
});

</script>

<style scoped lang="scss">
@import 'src/styles/mixins';
@import 'src/styles/colors';
@import 'src/styles/variables';

.modal-title {
  @include typo-headline-3;
}
</style>
