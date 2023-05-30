<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="car-page">
    <h1>Редагування</h1>
    <FilesUploader v-model="carImages" label="FILE UPLOAD" />
    <!-- <CommonFileUploader
        btn-text="Upload"
        file-types=".jpeg, .jpg, .png, .gif"
        @update:model-value="$emit('update:modelValue', $event)"
    /> -->
    <div v-if="UploadedFiles.length > 0" class="car-blocks">
      <div v-for="(file, index) in UploadedFiles" :key="index" class="car-block-img">
        <img :src="getBase64Img(file.type, decodeURIComponent(file.content))" :alt="car.brand">
      </div>
    </div>
    <div class="car-info-main">
      <div class="car-header">
        <div>{{ info }}</div>
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
      <Button @click="saveAll">Зберегти</Button>
      <Button @click="$router.back()" class="delete" outlined>Повернутися назад</Button>
    </div>
  </div>
  </template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

// components
import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import FilesUploader from '@/components/FilesUploader';
import CommonApi from '@/api/common.api';
import getBase64Img from '@/shared/helpers/get-base64-img';
import { useRoute, useRouter } from 'vue-router';

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
    FilesUploader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const UploadedFiles = ref<any>([]);
    const id = ref<string>('');
    const info = ref<string>('');
    const priceTemp = ref<number>(car.price);
    const volumeTemp = ref<number>(car.volume);
    const colorTemp = ref<string>(car.color);
    const yearTemp = ref<number>(car.year);
    const odometrTemp = ref<number>(car.odometr);
    const transmissionTemp = ref<string>(car.transmission);
    const descriptionTemp = ref<string>(car.description);
    const carImages = ref<any>([]);

    const saveAll = async () => {
      const data = { ...carImages.value };
      const car = {
        price: priceTemp.value,
        volume: volumeTemp.value,
        transmission: transmissionTemp.value,
        color: colorTemp.value,
        odometr: odometrTemp.value,
        description: descriptionTemp.value,
      };
      await CommonApi.UpdateCar('646bde2c9cf75853200b1ee6', car, route.params.id as string);
      if (carImages.value) CommonApi.uploadImages('646bde2c9cf75853200b1ee6', { ...data }, '646bde2c9cf75853200b1ee6');
      router.back();
    };

    onMounted(async () => {
      const data = await CommonApi.getCarInfo('21', route.params.id as string);
      const imgPaths = data.carPicsPath.join(',');
      info.value = `${data.brand} ${data.model} ${data.year}`;
      priceTemp.value = data.price;
      volumeTemp.value = data.volume;
      colorTemp.value = data.color;
      yearTemp.value = data.year;
      odometrTemp.value = data.odometr;
      transmissionTemp.value = data.transmission;
      descriptionTemp.value = data.description;
      if (data.carPicsPath.length > 0) { UploadedFiles.value = await CommonApi.getImages(route.params.id as string, imgPaths, 'asd'); }
      // UploadedFiles.value = await CommonApi.getImage('21', 'car-default.jpg', 'asd');
    });

    return {
      car,
      info,
      priceTemp,
      volumeTemp,
      colorTemp,
      yearTemp,
      odometrTemp,
      transmissionTemp,
      descriptionTemp,
      carImages,
      UploadedFiles,
      getBase64Img,
      saveAll,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
@import 'src/styles/mixins';

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
    margin-bottom: 2rem;

    img {
      border-radius: 2rem;
      width: 100%;
    }
  }

  .car-blocks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    height: 100%;
    width: 80%;

    @include for-xs-sm-md-width {
      grid-template-columns: 1fr;
    }
    .car-block-img {
      height: 80%;
      margin: 0 auto;
      margin-bottom: 1rem;
      img {
        width: 100%;
        object-fit: contain;
      }
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

      @include for-xs-sm-md-lg-width {
        flex-direction: column;
        gap: 1rem;
      }
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

    @include for-xs-sm-md-width {
      flex-direction: column;
      gap: 1rem;
    }

    .delete {
      border: 2px solid $color-secondary-component-background;
      opacity: 0.8;
    }
  }
}
</style>
