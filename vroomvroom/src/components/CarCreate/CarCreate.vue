<template>
  <form class="car-page" @submit.prevent="saveAll">
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
            :error="v$.brandTemp && v$.brandTemp.$error ? v$.brandTemp.$errors[0].$message as string : ''"
          >
          </Select>
        </div>
        <div class="car-info-item">
          <Select
          v-model="modelTemp"
          :options="[{ text: '', value: '' },...models]"
          :disabled="models.length == 0"
          :name-label="'Оберіть модель автомобіля'"
          :error="(v$.brandTemp && v$.brandTemp.$error) || modelError
          ? 'Необхідно вказати модель авто' || v$.brandTemp.$errors[0].$message as string : ''"
          >
          </Select>
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Ціна:</span>
          <Input class="car-info-input"
            v-model="priceTemp"
            :error="v$.priceTemp && v$.priceTemp.$error ? v$.priceTemp.$errors[0].$message as string : ''"
        />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Пробіг (тис. км):</span>
          <Input
            class="car-info-input"
            v-model="odometrTemp"
            :error="v$.odometrTemp && v$.odometrTemp.$error ? v$.odometrTemp.$errors[0].$message as string : ''"
          />
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Об'єм (л.):</span>
          <Input
            class="car-info-input"
            v-model="volumeTemp"
            :error="v$.volumeTemp && v$.volumeTemp.$error ? v$.volumeTemp.$errors[0].$message as string : ''"
          />
        </div>
        <div class="car-info-item">
          <Select
            v-model="fuelTemp"
            :options="Fuels"
            :name-label="'Вид палива:'"
            :error="v$.fuelTemp && v$.fuelTemp.$error ? v$.fuelTemp.$errors[0].$message as string : ''"
          ></Select>
        </div>
        <div class="car-info-item">
          <Select
            v-model="transmissionTemp"
            :options="Transmissions"
            :name-label="'Вид КПП:'"
            :error="v$.transmissionTemp && v$.transmissionTemp.$error ? v$.transmissionTemp.$errors[0].$message as string : ''"
          ></Select>
        </div>
        <div class="car-info-item">
          <Select
            v-model="colorTemp"
            :options="CarColors"
            :name-label="'Колір:'"
            :error="v$.colorTemp && v$.colorTemp.$error ? v$.colorTemp.$errors[0].$message as string : ''"
          ></Select>
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">VIN:</span>
          <Input
            class="car-info-input"
            v-model="vinTemp"
            :error="v$.vinTemp && v$.vinTemp.$error ? v$.vinTemp.$errors[0].$message as string : ''"
          />
        </div>
        <div class="car-info-item">
          <Select
            v-model="yearTemp"
            :options="getRangeYear(1970)"
            :name-label="'Рік випуску:'"
            :error="v$.yearTemp && v$.yearTemp.$error ? v$.yearTemp.$errors[0].$message as string : ''"
          >
          </Select>
        </div>
        <div class="car-info-item">
          <span class="car-info-headline">Номер авто:</span>
          <Input
            class="car-info-input"
            v-model="platesTemp"
            :error="v$.platesTemp && v$.platesTemp.$error ? v$.platesTemp.$errors[0].$message as string : ''"
          />
        </div>
        <div class="car-info-item">
          <Select
            v-model="townTemp"
            :options="RegionalCenters"
            :name-label="'Місто:'"
            :error="v$.townTemp && v$.townTemp.$error ? v$.townTemp.$errors[0].$message as string : ''"
          ></Select>
        </div>
        <div class="car-info-item">
          <Checkbox v-model="isAvtovukypSaleTemp" :label="'Автовикуп'" />
        </div>
      </div>
      <div class="car-description-wrapper">
        <span class="car-description-headline">Опис:</span>
        <TextArea
          class="car-description"
          v-model="descriptionTemp"
          :error="v$.descriptionTemp && v$.descriptionTemp.$error ? v$.descriptionTemp.$errors[0].$message as string : ''"
        />
      </div>
    </div>
    <div class="car-menu">
      <Button type="submit" class="save-btn">Зберегти</Button>
      <Button @click="$router.back()" class="delete" outlined>Повернутися назад</Button>
    </div>
  </form>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, watch,
} from 'vue';

import { useVuelidate } from '@vuelidate/core';
import {
  minLength, minValue, helpers, maxValue,
} from '@vuelidate/validators';

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
    const priceTemp = ref<number>();
    const volumeTemp = ref<number>();
    const colorTemp = ref<string>('');
    const yearTemp = ref<number>();
    const odometrTemp = ref<number>();
    const transmissionTemp = ref<string>('');
    const descriptionTemp = ref<string>('');
    const isAvtovukypSaleTemp = ref<boolean>(false);

    const modelError = ref<boolean>(false);

    const validations = {
      brandTemp: {
        required: helpers.withMessage('Необхідно вказати марку авто', (value) => !!value),
      },
      modelTemp: {
        // eslint-disable-next-line eqeqeq
        required: helpers.withMessage('Необхідно вказати модель авто', (value) => !!value),
        minLength: helpers.withMessage(
          'Необхідно вказати модель авто',
          minLength(1),
        ),
      },
      priceTemp: {
        required: helpers.withMessage('Необхідно вказати ціну', (value) => !!value),
        minValue: helpers.withMessage(
          'Ціна повинна бути більша за 1',
          minValue(1),
        ),
      },
      volumeTemp: {
        required: helpers.withMessage('Необхідно вказати об\'єм', (value) => !!value),
        minValue: helpers.withMessage(
          'Ціна повинна бути більша за 0.1',
          minValue(0.1),
        ),
      },
      yearTemp: {
        required: helpers.withMessage('Необхідно вказати рік випуску', (value) => !!value),
        minValue: helpers.withMessage(
          'Рік випуску повинен бути більше за 1970',
          minValue(1970),
        ),
      },
      vinTemp: {
        required: helpers.withMessage('Необхідно вказати він код', (value) => !!value),
      },
      platesTemp: {
        required: helpers.withMessage('Необхідно вказати номер', (value) => !!value),
      },
      townTemp: {
        required: helpers.withMessage('Необхідно вказати місто', (value) => !!value),
      },
      transmissionTemp: {
        required: helpers.withMessage('Необхідно вказати тип коробки передач', (value) => !!value),
      },
      colorTemp: {
        required: helpers.withMessage('Необхідно вказати колір', (value) => !!value),
      },
      odometrTemp: {
        required: helpers.withMessage('Необхідно вказати пробіг', (value) => !!value),
        minValue: helpers.withMessage(
          'Пробіг повинен бути більше або рівний 1 тис. км',
          minValue(1),
        ),
        maxValue: helpers.withMessage(
          'Пробіг повинен бути менше або рівний 9999 тис. км',
          maxValue(9999),
        ),
      },
      descriptionTemp: {
        required: helpers.withMessage('Необхідно вказати опис', (value) => !!value),
      },
      fuelTemp: {
        required: helpers.withMessage('Необхідно вказати тип палива', (value) => !!value),
      },
    };

    const v$ = useVuelidate(validations, {
      brandTemp,
      modelTemp,
      priceTemp,
      volumeTemp,
      yearTemp,
      vinTemp,
      platesTemp,
      townTemp,
      transmissionTemp,
      colorTemp,
      odometrTemp,
      descriptionTemp,
      fuelTemp,
    });

    const carImages = ref<any>([]);

    const models = ref<Array<any>>([]);

    const ownerId = computed(() => store.getters.getId);

    const saveAll = async () => {
      v$.value.$touch();
      if (modelTemp.value === '') modelError.value = true;
      if (!v$.value.$invalid && modelTemp.value !== '') {
        const data = { ...carImages.value };
        // const validation = brandTemp.value && modelTemp.value
        //   && priceTemp.value && volumeTemp.value && yearTemp.value
        //   && vinTemp.value && platesTemp.value && townTemp.value
        //   && townTemp.value && transmissionTemp.value && colorTemp.value
        //   && odometrTemp.value && descriptionTemp.value && fuelTemp.value;
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

        await CommonApi.CreateCar('646bde2c9cf75853200b1ee6', car).then(async (carresp) => {
          await CommonApi.uploadImages(carresp._id, { ...data }, '646bde2c9cf75853200b1ee6').then(() => router.push('/home'));
        });
      } else { console.log('Not valid'); }
    };

    watch(brandTemp, async (newBrand) => {
      if (newBrand !== '') {
        const brandmodel = await CommonApi.getModels(newBrand);
        models.value = brandmodel.models;
      } else {
        modelTemp.value = '';
      }
    });

    watch(modelTemp, () => {
      modelError.value = false;
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
      modelError,
      v$,
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
