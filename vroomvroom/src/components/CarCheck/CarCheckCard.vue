<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="car-link">
    <div class="card-wrapper">
      <div class="car-data">
        <div class="carcheck-info">
          <div class="">
            <div>
              Марка: {{ brand }}
            </div>
            <div>
              Модель: {{ model }}
            </div>
            <div>Ім'я замовника: {{ firstName }}</div>
          </div>
          <div class="">
            <div>Номер телефону: {{ phone }}</div>
            <div>Email: {{ email }}</div>
            <div>Місто: {{ town }}</div>
          </div>
        </div>
        <div class="btn-menu">
          <Button class="btn-sign" @click="openCarPage">Перейти до авто</Button>
          <Button v-if="deleteCheck" class="btn-sign" @click="deleteCheckById">Перевірено</Button>
          <Button v-else class="btn-sign" @click="signCheck">Зайняти</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

// components
import { useStore } from 'vuex';
import CommonApi from '@/api/common.api';
import Button from '../Button';

export default defineComponent({
  name: 'CarCheckCard',
  props: {
    idCheck: {
      type: String,
      default: '',
      required: true,
    },
    linkPath: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      default: '',
      required: true,
    },
    brand: {
      type: String,
      default: '',
      required: true,
    },
    town: {
      type: String,
      default: '',
      required: true,
    },
    phone: {
      type: String,
      default: '',
      required: true,
    },
    firstName: {
      type: String,
      default: '',
      required: true,
    },
    email: {
      type: String,
      default: '',
      required: true,
    },
    deleteCheck: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Button,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const user = computed(() => store.getters.getUser);

    const openCarPage = () => {
      router.push(`/car-page/${props.linkPath}`);
    };

    const signCheck = async () => {
      await CommonApi.signCarCheck(
        props.idCheck,
        {
          checker: {
            checkerId: user.value.id,
            name: user.value.firstName,
            phone: user.value.phone,
          },
        },
        '',
      ).then(() => router.push('/home'));
    };

    const deleteCheckById = async () => {
      await CommonApi.deleteCarCheck(
        props.idCheck,
      ).then(() => router.push('/home'));
    };

    return {
      openCarPage,
      signCheck,
      deleteCheckById,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
@import "src/styles/mixins";

.car-link {
  text-decoration: none;
  color: #2c3e50;
  .card-wrapper {
    display: flex;
    justify-content: center;
    border-radius: 2rem;
    background: $color-viridian-green;
    margin-top: 1rem;
    padding: 1rem;
    margin: 1rem;
    cursor: pointer;
    transition: 0.3s;

    .car-data {
      @include typo-headline-3;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: start;
      width: 80%;
      margin-top: 0.5rem;
      margin-left: 0.5rem;

      .carcheck-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: start;
        gap: 2rem;

        @include for-xs-sm-width {
          flex-direction: column;
          justify-content: center;
          align-items: start;
          gap: 0;
          margin-left: 0rem;
        }
      }
      .btn-menu {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .btn-sign {
          height: 100%;
          border-radius: 2rem;
          cursor: pointer;
        }
      }

      @include for-xs-sm-width {
        flex-direction: column;
        text-align: start;
        margin-left: 0rem;
      }

      .double-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;

        div {
          text-align: start;
        }

        @include for-xs-width {
          flex-direction: column;
        }

        @include for-md-width {
          flex-direction: row;
        }
      }
      @include for-md-width {
        .additional-info {
          display: none;
        }
      }
      @include for-xs-width {
        .additional-info {
          display: none;
        }
      }

      div {
        margin-bottom: 0.25rem;
      }
    }

    .car-description {
      @include typo-body-large-medium;
    }

    &:hover {
      box-shadow: 0 0 0.5rem 0.25rem #fff, /* inner white */
      0 0 0.75rem 0.35rem $color-viridian-green, /* middle magenta */
      0 0 1rem 0.5rem $color-viridian-green; /* outer cyan */
    }
  }
}
</style>
