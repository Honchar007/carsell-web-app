<template>
  <div class="car-page">
    <h1>Редагування</h1>
    <FilesUploader label="FILE UPLOAD" />
    <CommonFileUploader
        btn-text="Upload"
        file-types=".jpeg, .jpg, .png, .gif"
        @update:model-value="$emit('update:modelValue', $event)"
    />
    <div class="car-image-wrapper">
      <img :src="require(`@/assets/${car.image}`)" :alt="car.brand">
    </div>
    <div class="car-info-main">
      <div class="car-header">
        <div>{{ car.brand + ' ' + car.model + ' ' + car.year }}</div>
        <div class="price-input-wrapper">
          Ціна:
          <Input class="price-input" v-model="priceTemp" />
        </div>

      </div>
      <div class="car-info">
        <div class="car-info-item">
          <span class="car-info-headline">Пробіг (тис. км):</span>
          <Input class="car-info-input" v-model="odometrTemp" />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Об'єм (л.):</span>
          <Input class="car-info-input" v-model="volumeTemp" />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">КПП:</span>
          <Input class="car-info-input" v-model="transmissionTemp" />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Колір:</span>
          <Input class="car-info-input" v-model="colorTemp" />
        </div>
      </div>
      <div class="car-description-wrapper">
        <span class="car-info-headline">Опис:</span>
        <TextArea class="car-description" v-model="descriptionTemp"/>
      </div>
    </div>
    <div class="car-menu">
      <Button>Зберегти</Button>
      <Button class="delete" outlined>Повернутися назад</Button>
    </div>
  </div>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// components
import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import FilesUploader from '@/components/FilesUploader';
import CommonFileUploader from '@/components/CommonFileUploader';

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
  name: 'CarEdit',
  components: {
    Button,
    Input,
    TextArea,
    CommonFileUploader,
    FilesUploader,
  },
  setup() {
    const imageTemp = ref<string>(car.image);
    const priceTemp = ref<number>(car.price);
    const volumeTemp = ref<number>(car.volume);
    const colorTemp = ref<string>(car.color);
    const yearTemp = ref<number>(car.year);
    const odometrTemp = ref<number>(car.odometr);
    const transmissionTemp = ref<string>(car.transmission);
    const descriptionTemp = ref<string>(car.description);
    const media = ref<File | null>(null);

    return {
      car,
      imageTemp,
      priceTemp,
      volumeTemp,
      colorTemp,
      yearTemp,
      odometrTemp,
      transmissionTemp,
      descriptionTemp,
      media,
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

      .price-input-wrapper {
        display: flex;
        gap: 0.5rem;
      }
    }

    .car-info {
      @include typo-headline-3;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;

      .car-info-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        padding: 0.5rem;
        border-radius: 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        border: 0.15rem solid $color-secondary-component-background;
        color: $color-neutrals-6;

        .car-info-input {
          width: 100%;
        }
      }
    }
    .car-info-headline {
      margin-bottom: 0.5rem;
      color: $color-viridian-green;
    }
    .car-description-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-top: 1rem;
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
