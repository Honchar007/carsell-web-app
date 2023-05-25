<template>
  <div class="loader-wrapper">
    <img src="@/assets/icons/loading.svg" alt="loading">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loader',
});
</script>

<style lang="scss" scoped>
@keyframes loading-rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    animation: 3s linear 1s infinite running loading-rotating;
  }
}
</style>
