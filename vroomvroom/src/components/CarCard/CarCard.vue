<template>
  <div class="card-container">
    <img class="card-image" src="@/assets/car-default.jpg" alt="slavuta" />
    <div class="card-info">
      <div class="card-info-item">Марка: ЗАЗ</div>
      <div class="card-info-item">Модель: Славута</div>
      <div class="card-info-item">Рік випуску: 2007</div>
      <div class="card-info-item">Пробіг: 50000 тис.</div>
      <div class="card-info-item">Ціна: 1000$</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

// models

// constants

export default defineComponent({
  name: 'Select',
  emits: ['update:modelValue'],
  setup() {
    // refs
    // computed

    return {
    };
  },
});

</script>

<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";

.card-container {
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  overflow: hidden;
  background: $color-secondary-background-molecules;
  .card-info {
    @include typo-headline-3;
    color: $color-viridian-green;
    display: flex;
    flex-direction: column;
    align-items: start;

    .card-info-item {
      @include typo-button-small;
      margin: 1rem 0 0 1rem;

      &:last-child {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
