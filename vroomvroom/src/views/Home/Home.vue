<template>
  <div class="container">
    <div class="card-wrapper">
      <div>
        <span>Оберіть марку автомобіля: {{ carBrand }} {{ carModel }}</span>
      </div>
      <div class="menu-item menu-double">
        <Select
          v-model="carBrand"
          :options="Brands" :name-label="'Оберіть марку автомобіля'">Оберіть марку авто</Select>
        <Select v-model="carModel" :options="Brands" :name-label="'Оберіть модель автомобіля'"></Select>
      </div>
      <Select class="menu-item" v-model="carModel" :options="Brands" :name-label="'asd'"></Select>
      <div class="menu-item menu-double">
        <Input
          class="card-input"
          v-model="priceFrom"
          label="Ціна від:"
        />
        <Input
          class="card-input"
          v-model="priceTo"
          label="Ціна до:"
        />
      </div>
      <div class="menu-item menu-double">
        <Select v-model="carModel" :options="Brands" :name-label="'Від якого року випуску:'"></Select>
        <Select v-model="carModel" :options="Brands" :name-label="'До якого року випуску:'"></Select>
      </div>
      <div class="menu-item menu-double">
        <Input
          class="card-input"
          v-model="priceFrom"
          label="Пробіг від:"
        />
        <Input
          class="card-input"
          v-model="priceTo"
          label="Пробіг до:"
        />
      </div>
      <Button class="menu-item" :outlined="true" @click="openDropdown">Додадткові параметри</Button>
      <div v-if="dropdownOpened" class="menu-item dropdown">
        <div class="menu-item menu-double">
          <Input
            class="card-input"
            v-model="priceFrom"
            label="Пробіг від:"
          />
          <Input
            class="card-input"
            v-model="priceTo"
            label="Пробіг до:"
          />
          <Select class="caryear" v-model="carModel" :options="Brands" :name-label="'До якого року випуску:'"></Select>
        </div>
        <div class="menu-item menu-double">
          <Select v-model="carModel" :options="Brands" :name-label="'Вид палива:'"></Select>
          <Select v-model="carModel" :options="Brands" :name-label="'Вид КПП:'"></Select>
          <Select v-model="carModel" :options="Brands" :name-label="'Стан:'"></Select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue';

// store

// components
import Select from '@/components/Select';
import Input from '@/components/Input';
import Button from '@/components/Button';
// models

// constants
import Brands from '@/shared/constants/brands';

export default defineComponent({
  name: 'Home',
  components: {
    Select,
    Input,
    Button,
  },
  setup() {
    // refs
    const carBrand = ref<string>('Toyota');
    const carModel = ref<string>('');
    const priceFrom = ref<number>(0);
    const priceTo = ref<number>(0);
    const dropdownOpened = ref<boolean>(false);

    const openDropdown = (): void => {
      dropdownOpened.value = !dropdownOpened.value;
    };
    // computed

    // helpers

    // async helpers

    // watchers

    // lifecycle hooks

    return {
      Brands,
      carModel,
      carBrand,
      priceFrom,
      priceTo,
      dropdownOpened,
      openDropdown,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/styles/typography';

.container {
  @import 'src/styles/colors';

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;

  .card-wrapper {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1rem;
    .menu-item {
      margin-bottom: 1rem;
      width: 100%;
    }

    .menu-double {
      display: flex;
      flex-direction: row;
      gap: 5rem;
    }

    .dropdown {
      .caryear {
        margin-top: 1.5rem;
      }
    }

    .card-input {
      @include typo-headline-3;
      position: relative;
      width: 100%;
      padding: 0 1rem 1rem 1rem;
      color: $color-grey;
      background: $color-secondary-background-molecules;
      border: 2px solid transparent;
      border-radius: 1rem;
      transition: 0.3s ease-in-out all;

      &::placeholder {
        color: $color-white;
      }

      &:hover {
        box-shadow: $shadow-common;
      }

      &:focus {
        border: 2px solid $color-white;
        box-shadow: $shadow-common;
      }

      &.small {
        padding: 0.5rem;
      }

      &.icon {
        padding-left: 3rem;
      }

      &.success {
        border: 2px solid $color-peach-secondary;
        padding-right: 3rem;
      }

      &.error {
        color: $color-error;
        border: 2px solid $color-error;
        padding-right: 3rem;
      }
    }
  }
  .posts-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    .post {
      margin-bottom: 2rem;
    }

    .loader {
      padding: 2rem 0;
    }

    .no-data-text {
      @include typo-body-regular;
      padding: 2rem 0;
      text-align: center;
      color: $color-peach-primary;
    }
  }
}
</style>
