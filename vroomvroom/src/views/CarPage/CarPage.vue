<template>
  <div class="car-page">
    <Carousel v-if="UploadedFiles.length > 0" :images="UploadedFiles" />
    <div v-else class="car-image-wrapper">
      <!-- <div v-if="UploadedFiles.length > 0">
        <div v-for="(file, index) in UploadedFiles" :key="index" class="car-block-img">
          <img :src="getBase64Img(file.type, decodeURIComponent(file.content))" :alt="car.brand">
        </div>
      </div> -->
      <div class="car-block-no-img">
        <img :src="require(`@/assets/car-default.jpg`)" :alt="car.brand">
      </div>
    </div>
    <div class="car-info-main">
      <div class="car-header">
        <div>{{ info }}</div>
        <div>Ціна: {{ priceTemp }}</div>
      </div>
      <div class="car-info">
        <div class="car-info-item"><span class="car-info-headline">Пробіг:</span> {{ odometrTemp }} тис. км</div>
        <div class="car-info-item"><span class="car-info-headline">Об'єм:</span> {{ volumeTemp }} л.</div>
        <div class="car-info-item"><span class="car-info-headline">КПП:</span> {{ transmissionTemp }}</div>
        <div class="car-info-item"><span class="car-info-headline">Колір:</span> {{ colorTemp }}</div>
      </div>
      <div class="car-description">
        <div>
          <span class="car-info-headline">Опис:</span> {{ descriptionTemp }}
        </div>
      </div>
      <div class="car-comments" v-if="isNoComOwnCar">
        <template v-if="comments.length > 0">
          <div class="comment-item" v-for="(item, index) in comments" :key="index">
            <div>
              <span class="car-info-headline">{{item.name}}:</span>
            </div>
            <div class="comment-text">
              {{ item.text }}
            </div>
          </div>
          <div v-if="curUserId != carOwnerId" class="car-description-wrapper">
            <span class="car-info-headline">Ваш Коментар:</span>
            <textarea class="text-area" v-model="curUserComment"/>
            <Button class="btn-comment" @click="comment">Відправити</Button>
          </div>
        </template>
        <div class="no-comments" v-else-if="curUserId != carOwnerId">
          <div v-if="curUserId != carOwnerId" class="car-description-wrapper">
            <div>
              <span class="car-info-headline">Ваш Коментар:</span>
            </div>
              <textarea class="text-area" v-model="curUserComment"/>
              <Button class="btn-comment" @click="comment">Відправити</Button>
          </div>
        </div>
      </div>
      <div class="car-actions">
        <div v-if="loadingActions" class="loading">
          Триває перевірка...
        </div>
        <div v-else>
          <div v-if="actions.length > 0" class="actions">
            <div class="car-info-headline">Операції з даним авто</div>
            <div class="car-action-info">
              <div class="car-official-info">
                <div>
                  Марка: {{ actions[0].BRAND }}
                </div>
                <div>
                  Модель: {{ actions[0].MODEL }}
                </div>
                <div>
                  Рік: {{ actions[0].MAKE_YEAR }}
                </div>
                <div> Об'єм: {{ actions[0].CAPACITY }} </div>
                <div> Тип пального: {{ actions[0].FUEL }} </div>
                <div> Колір: {{ actions[0].COLOR }} </div>
              </div>
              <div v-for="(action, index) in actions" :key="index" class="action-item">
                <div class="car-info-headline">
                  Операція:
                </div>
                <div> {{ action.OPER_NAME }} </div>
              </div>
            </div>
          </div>
          <div v-else class="no-info">
            Інформацію по даному він коду не знайдено
          </div>
        </div>
      </div>
    </div>
    <div class="car-menu">
      <Button @click="handleShowTel"> {{showTel ? phone : 'Дізнатися контакти'}}</Button>
      <Button v-if="curUserId == carOwnerId" @click="$router.push(`/car-edit/${$route.params.id}`)">Редагувати</Button>
      <Button v-if="curUserId != carOwnerId && isAuthenticated" @click="makeCarCheck">Замовити перевірку</Button>
      <Button v-if="curUserId == carOwnerId" @click="deleteCar" class="delete" outlined>Видалити</Button>
    </div>
  </div>
  </template>

<script lang="ts">
import CommonApi from '@/api/common.api';
import Button from '@/components/Button';
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';

import getBase64Img from '@/shared/helpers/get-base64-img';
import { useRoute, useRouter } from 'vue-router';
import Carousel from '@/components/Carousel';
import { useStore } from 'vuex';
import AuthApi from '@/api/auth.api';
import CarAction from '@/store/models/car-action';
import CarActionsApi from '@/api/caractions.api';

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
    Carousel,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // refs
    const UploadedFiles = ref<any>([]);
    const id = ref<string>('');
    const phone = ref<string>('');
    const carOwnerId = ref<string>('');
    const info = ref<string>('');
    const brand = ref<string>('');
    const model = ref<string>('');
    const town = ref<string>('');
    const priceTemp = ref<number>(car.price);
    const volumeTemp = ref<number>(car.volume);
    const colorTemp = ref<string>(car.color);
    const yearTemp = ref<number>(car.year);
    const odometrTemp = ref<number>(car.odometr);
    const transmissionTemp = ref<string>(car.transmission);
    const descriptionTemp = ref<string>(car.description);
    const carImages = ref<any>([]);
    const showTel = ref<boolean>(false);
    const comments = ref<Array<any>>([]);
    const curUserComment = ref<string>('');
    const isNoComOwnCar = ref<boolean>(false);
    const loadingActions = ref<boolean>(false);
    const actions = ref<CarAction[]>([]);

    // computed
    const curUserId = computed(() => store.getters.getId);
    const curUser = computed(() => store.getters.getUser);
    const token = computed(() => store.getters.getToken);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    // helpers
    const handleShowTel = () => {
      showTel.value = !showTel.value;
    };
    // async helpers
    const deleteCar = async () => {
      await CommonApi.DeleteCar(token.value, route.params.id as string).then(() => router.back());
    };

    const makeCarCheck = async () => {
      const wanter = await AuthApi.getUserInfo('', curUser.value.email);
      const carCheck = {
        model: model.value,
        brand: brand.value,
        town: town.value,
        link: route.params.id as string,
        wantToCheckId: wanter._id,
        firstName: wanter.firstName,
        email: wanter.email,
        phone: wanter.phone,
      };
      await CommonApi.CreateCarCheck(token.value, carCheck);
    };

    const comment = async () => {
      await CommonApi.AddCarComment(token.value, {
        name: curUser.value.firstName,
        text: curUserComment.value,
      }, route.params.id as string);
      curUserComment.value = '';
    };

    onMounted(async () => {
      const data = await CommonApi.getCarInfo(route.params.id as string);
      const imgPaths = data.carPicsPath.join(',');
      info.value = `${data.brand} ${data.model} ${data.year}`;
      carOwnerId.value = data.ownerId;
      priceTemp.value = data.price;
      volumeTemp.value = data.volume;
      colorTemp.value = data.color;
      brand.value = data.brand;
      model.value = data.model;
      town.value = data.town;
      comments.value = data.comments;
      yearTemp.value = data.year;
      odometrTemp.value = data.odometr;
      transmissionTemp.value = data.transmission;
      descriptionTemp.value = data.description;
      isNoComOwnCar.value = !(data.comments.length === 0 && curUserId.value === data.ownerId);

      if (imgPaths.length > 0) {
        UploadedFiles.value = await CommonApi.getImages(route.params.id as string, imgPaths);
      }
      phone.value = await CommonApi.getUserPhone(data.ownerId);
      loadingActions.value = true;
      await CarActionsApi.getCarActions(data.vincode).then((response) => {
        actions.value = response;
        loadingActions.value = false;
      });
      // UploadedFiles.value = await CommonApi.getImage('21', 'car-default.jpg', 'asd');
    });

    return {
      car,
      loadingActions,
      actions,
      carOwnerId,
      info,
      priceTemp,
      volumeTemp,
      colorTemp,
      yearTemp,
      odometrTemp,
      transmissionTemp,
      descriptionTemp,
      comments,
      phone,
      curUserComment,
      carImages,
      UploadedFiles,
      getBase64Img,
      deleteCar,
      comment,
      makeCarCheck,
      curUserId,
      curUser,
      isNoComOwnCar,
      isAuthenticated,
      showTel,
      handleShowTel,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
@import "src/styles/mixins";

.car-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $color-viridian-green;
  margin-top: 2rem;

  .car-image-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 2rem;

    .car-block-no-img {
      height: 80%;
      margin: 0 auto;
      margin-bottom: 1rem;
      img {
        max-height: 20rem;
        width: 100%;
      }
    }

    .car-block-img {
        width: 100%;
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
    }
    .car-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;

      @include for-xs-sm-md-width {
        flex-direction: column;
      }

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

    .car-actions {
      width: 100%;
      border-radius: 1rem;
      border: 0.15rem solid $color-secondary-component-background;
      color: $color-neutrals-6;
      margin-bottom: 1rem;

      .loading {
        padding: 2rem;
      }

      .no-info {
        padding: 2rem;
      }

      .actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;

        .car-action-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .car-official-info {
            display: grid;
            grid-template-columns: auto auto auto;
            row-gap: 1rem;
            border: 0.15rem solid $color-secondary-component-background;
            border-radius: 2rem;
            padding: 1rem;

            @include for-xs-sm-md-width {
              grid-template-columns: auto auto;
            }
          }

          .action-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 0.15rem solid $color-secondary-component-background;
            border-radius: 2rem;
          }
        }
      }
    }

    .car-comments {
      width: 100%;
      border-radius: 1rem;
      border: 0.15rem solid $color-secondary-component-background;
      color: $color-neutrals-6;
      margin-bottom: 1rem;

      .btn-comment {
        align-self: center;
        margin-bottom: 1rem;
      }
      .comment-item {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;

        .comment-text {
          display: flex;
          text-align: start;
          padding: 0.5rem;
          border-radius: 1rem;
          border: 0.15rem solid $color-secondary-component-background;
          color: $color-neutrals-6;
        }
      }
      .no-comments {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .car-description-wrapper {
        display: flex;
        flex-direction: column;
        padding-top: 1rem;

        ::-webkit-scrollbar {
          // Width of vertical scroll bar
          width: 2rem;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 2rem;
          border: 0.5rem solid rgba(0, 0, 0, 0);
          background: #c2c9d2;
          background-clip: padding-box;
        }

        .text-area {
          @include typo-headline-4;
          padding: 1rem;
          margin: 1rem;
          color: $color-white;
          background: $color-secondary-background-molecules;
          border: 2px solid transparent;
          border-radius: 1.5rem;
          -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
          -moz-box-sizing: border-box;    /* Firefox, other Gecko */
          box-sizing: border-box;
          resize: none;
          transition: 0.5s ease-in-out all;
        }
      }
    }
    .car-description {
      width: 100%;
      border-radius: 1rem;
      border: 0.15rem solid $color-secondary-component-background;
      color: $color-neutrals-6;
      margin-bottom: 1rem;

      div {
        display: flex;
        align-items: start;
        gap: 0.5rem;
        padding: 0.5rem;

        @include for-xs-sm-md-width {
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
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
    }

    .delete {
      border: 2px solid $color-secondary-component-background;
      opacity: 0.8;
    }
  }
}
</style>
