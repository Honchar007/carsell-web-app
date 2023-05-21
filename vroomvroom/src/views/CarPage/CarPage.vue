<template>
  <div class="car-page">
    <div class="car-image-wrapper">
      <img :src="require(`@/assets/${car.image}`)" :alt="car.brand">
    </div>
    <div class="car-info-main">
      <div class="car-header">
        <div>{{ car.brand + ' ' + car.model + ' ' + car.year }}</div>
        <div>Ціна: {{car.price}}</div>
      </div>
      <div class="car-info">
        <div class="car-info-item"><span class="car-info-headline">Пробіг:</span> {{ car.odometr }} тис. км</div>
        <div class="car-info-item"><span class="car-info-headline">Об'єм:</span> {{ car.volume }} л.</div>
        <div class="car-info-item"><span class="car-info-headline">КПП:</span> {{ car.transmission }}</div>
        <div class="car-info-item"><span class="car-info-headline">Колір:</span> {{ car.color }}</div>
      </div>
      <div class="car-description">
        <span class="car-info-headline">Опис:</span> {{ car.description }}
      </div>
    </div>
    <div class="car-menu">
      <Button>Дізнатися контакти</Button>
      <Button @click="$router.push('car-edit')">Редагувати</Button>
      <Button>Замовити перевірку</Button>
      <Button class="delete" outlined>Видалити</Button>
    </div>
  </div>
  </template>

<script lang="ts">
import Button from '@/components/Button';
import { defineComponent } from 'vue';

// components

// constants
const car = {
  image: 'car-default.jpg',
  model: 'Slavuta',
  brand: 'ZAZ',
  price: 1300,
  volume: 1.2,
  transmission: 'Механіка',
  color: 'Червоний',
  year: 2007,
  odometr: 150,
  description: `машина после 1 хозяина , родной пробег 64 тысячи ,
  нечего не красилось не крутилось , все расходники поменяны , газ вписан в тех паспорт только переоформление`,
  link: '/car-page',
};

export default defineComponent({
  name: 'CarPage',
  components: {
    Button,
  },
  setup() {
    return {
      car,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
.car-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $color-viridian-green;
  margin-top: 2rem;

  .car-image-wrapper {
    display: flex;
    justify-content: center;
    width: 80%;
    border-radius: 2rem;

    img {
      border-radius: 2rem;
      width: 100%;
    }
  }

  .car-info-main {
    @include typo-headline-4;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;

    .car-header {
      @include typo-headline-2;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;
    }
    .car-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;

      .car-info-item {
        padding: 0.5rem;
        border-radius: 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        border: 0.15rem solid $color-secondary-component-background;
        color: $color-neutrals-6;
      }
    }
    .car-info-headline {
      @include typo-card-body;
      color: $color-viridian-green;
    }
    .car-description {
      padding: 0.5rem;
      border-radius: 1rem;
      border: 0.15rem solid $color-secondary-component-background;
      color: $color-neutrals-6;
      margin-bottom: 1rem;
    }
  }

  .car-menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 1rem;

    .delete {
      border: 2px solid $color-secondary-component-background;
      opacity: 0.8;
    }
  }
}
</style>
