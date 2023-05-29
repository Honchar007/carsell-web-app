<template>
  <div class="car-page">
    <h1>Редагування</h1>
    <FilesUploader v-model="carImages" label="FILE UPLOAD" />
    <!-- <CommonFileUploader
        btn-text="Upload"
        file-types=".jpeg, .jpg, .png, .gif"
        @update:model-value="$emit('update:modelValue', $event)"
    /> -->
    <div class="car-info-main">
      <div class="car-info">
        <div class="car-info-item">
          <Select
            v-model="brandTemp"
            :options="Brands"
            :name-label="'Оберіть марку автомобіля'"
          >
            Оберіть марку авто
          </Select>
        </div>
        <div class="car-info-item">
          <Select
          v-model="modelTemp"
          :options="[{ text: '', value: '' },...models]"
          :disabled="models.length == 0"
          :name-label="'Оберіть модель автомобіля'"
          >
          </Select>
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Ціна:</span>
          <Input class="car-info-input" v-model="priceTemp" />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Пробіг (тис. км):</span>
          <Input class="car-info-input" v-model="odometrTemp" />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Об'єм (л.):</span>
          <Input class="car-info-input" v-model="volumeTemp" />
        </div>
        <div class="car-info-item">
          <Select v-model="fuelTemp" :options="Fuels" :name-label="'Вид палива:'"></Select>
        </div>
        <div class="car-info-item">
          <Select v-model="transmissionTemp" :options="Transmissions" :name-label="'Вид КПП:'"></Select>
        </div>
        <div class="car-info-item">
          <Select v-model="colorTemp" :options="CarColors" :name-label="'Колір:'"></Select>
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">VIN:</span>
          <Input class="car-info-input" v-model="vinTemp" />
        </div>
        <div class="car-info-item">
          <Select
            v-model="yearTemp"
            :options="getRangeYear(1970)"
            :name-label="'Рік випуску:'">
          </Select>
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Номер авто:</span>
          <Input class="car-info-input" v-model="platesTemp" />
        </div>
        <div class="car-info-item">
          <Select v-model="townTemp" :options="RegionalCenters" :name-label="'Місто:'"></Select>
        </div>
        <div class="car-info-item">
          <Checkbox v-model="isAvtovukypSaleTemp" :label="'Автовикуп'" />
        </div>
      </div>
      <div class="car-description-wrapper">
        <span class="car-description-headline">Опис:</span>
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
import {
  computed,
  defineComponent, reactive, ref, watch,
} from 'vue';

// constants
import Brands from '@/shared/constants/brands';
import Transmissions from '@/shared/constants/transmissions';
import Fuels from '@/shared/constants/fuels';
import CarColors from '@/shared/constants/carColors';
import RegionalCenters from '@/shared/constants/regional-centers';

// components
import Select from '@/components/Select';
import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import FilesUploader from '@/components/FilesUploader';

// api
import CommonApi from '@/api/common.api';

// helpers
import getRangeYear from '@/shared/helpers/get-range-years';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Checkbox from '../Checkbox';

export default defineComponent({
  name: 'CreateCar',
  components: {
    Button,
    Select,
    Input,
    TextArea,
    FilesUploader,
    Checkbox,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const brandTemp = ref<string>('');
    const modelTemp = ref<string>('');
    const townTemp = ref<string>('');
    const platesTemp = ref<string>('');
    const vinTemp = ref<string>('');
    const fuelTemp = ref<string>('');
    const priceTemp = ref<number>(0);
    const volumeTemp = ref<number>(0);
    const colorTemp = ref<string>('');
    const yearTemp = ref<number>(0);
    const odometrTemp = ref<number>(0);
    const transmissionTemp = ref<string>('');
    const descriptionTemp = ref<string>('');
    const isAvtovukypSaleTemp = ref<boolean>(false);

    const errorMsg = ref<string>('');
    const validations = reactive({
      brand: '',
      model: '',
      price: 0,
      volume: 0,
      year: 0,
      vin: '',
      plates: '',
      town: '',
      transmission: '',
      color: '',
      odometr: '',
      description: '',
      fuel: '',
    });

    const carImages = ref<any>([]);

    const models = ref<Array<any>>([]);

    const ownerId = computed(() => store.getters.getId);

    const saveAll = async () => {
      const data = { ...carImages.value };
      const validation = brandTemp.value && modelTemp.value
      && priceTemp.value && volumeTemp.value && yearTemp.value
      && vinTemp.value && platesTemp.value && townTemp.value
      && townTemp.value && transmissionTemp.value && colorTemp.value
      && odometrTemp.value && descriptionTemp.value && fuelTemp.value;
      const car = {
        ownerId: ownerId.value,
        brand: brandTemp.value,
        model: modelTemp.value,
        price: priceTemp.value,
        volume: volumeTemp.value,
        year: yearTemp.value,
        vincode: vinTemp.value,
        plates: platesTemp.value,
        town: townTemp.value,
        transmission: transmissionTemp.value,
        color: colorTemp.value,
        odometr: odometrTemp.value,
        description: descriptionTemp.value,
        fuel: fuelTemp.value,
        isAvtovukypSale: isAvtovukypSaleTemp.value,
      };
      if (validation) {
        await CommonApi.CreateCar('646bde2c9cf75853200b1ee6', car).then(async (carresp) => {
          await CommonApi.uploadImages(carresp._id, { ...data }, '646bde2c9cf75853200b1ee6').then(() => router.push('/profile'));
        });
        errorMsg.value = '';
      } else {
        errorMsg.value = 'Всі поля повинні бути заповнені';
      }
    };

    watch(brandTemp, async (newBrand) => {
      if (newBrand !== '') {
        const brandmodel = await CommonApi.getModels(newBrand);
        models.value = brandmodel.models;
      } else {
        modelTemp.value = '';
      }
    });

    return {
      Brands,
      Transmissions,
      CarColors,
      RegionalCenters,
      Fuels,
      getRangeYear,
      townTemp,
      platesTemp,
      vinTemp,
      fuelTemp,
      brandTemp,
      modelTemp,
      priceTemp,
      volumeTemp,
      colorTemp,
      yearTemp,
      odometrTemp,
      transmissionTemp,
      descriptionTemp,
      isAvtovukypSaleTemp,
      carImages,
      saveAll,
      models,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins';
@import "src/styles/typography";

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
    margin-left: 1.75rem;
    color: $color-viridian-green;
  }

  .car-description-headline {
    margin-bottom: 0.5rem;
    color: $color-viridian-green;
  }

  .car-description-wrapper {
    @include typo-headline-3;

    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 1rem;
    border-radius: 1rem;
    border: 0.15rem solid $color-secondary-component-background;
    color: $color-neutrals-6;
    margin-bottom: 1rem;
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
</style>
