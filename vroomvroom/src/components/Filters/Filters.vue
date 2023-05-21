<template>
  <div class="filters-wrapper">
    <h2>Оберіть фільтри для уточнення пошуку:</h2>
    <div class="filters-item">
      <Checkbox :label="'В Україні 🇺🇦'" v-model="isInUkraine"/>
    </div>
    <h3>Тип кузова</h3>
    <div class="filters-item">
      <Checkbox :label="'Тип кузова'" v-model="isInUkraine"/>
    </div>
    <Checkbox class="filters-item" :label="'Можливий торг'" v-model="isInUkraine"/>
    <Checkbox class="filters-item" :label="'Ціна з ПДВ'" v-model="isInUkraine"/>
    <Checkbox class="filters-item" :label="'Для ЗСУ - дешевше'" v-model="isInUkraine"/>
    <Checkbox class="filters-item" :label="'Можлива оплата частинами'" v-model="isInUkraine"/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';
import Checkbox from '../Checkbox';

// models

// constants

export default defineComponent({
  name: 'Filters',
  emits: ['update:modelValue'],
  components: { Checkbox },
  setup() {
    // refs
    const isInUkraine = ref<boolean>(true);
    // computed
    return {
      isInUkraine,
    };
  },
});

</script>

<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";

.filters-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  gap: 1rem;
  margin: 2rem;

  .filters-item {
    display: flex;
    padding-left: 4rem;
  }
  .label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #394a56;
  }

  .label-text {
    margin-left: 16px;
  }

  .toggle {
    isolation: isolate;
    position: relative;
    height: 30px;
    width: 60px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow:
      -8px -4px 8px 0px #ffffff,
      8px 4px 12px 0px #d1d9e6,
      4px 4px 4px 0px #d1d9e6 inset,
      -4px -4px 4px 0px #ffffff inset;
  }

  .toggle-state {
    display: none;
    width: 100%;
  }

  .indicator {
    height: 100%;
    width: 200%;
    background: #ecf0f3;
    border-radius: 15px;
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    box-shadow:
      -8px -4px 8px 0px #ffffff,
      8px 4px 12px 0px #d1d9e6;
  }

  .toggle-state:checked ~ .indicator {
    transform: translate3d(25%, 0, 0);
  }
}
</style>
