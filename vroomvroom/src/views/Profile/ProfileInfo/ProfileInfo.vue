<template>
  <div class="profile-wrapper">
    <div class="profile-avatar">
      <img v-if="image != ''" :src="getBase64Img(image.type, decodeURIComponent(image.content))" :alt="user.firstName">
      <img v-else src="@/assets/profile-default.jpg" alt="profile"></div>
    <div class="profile-info">
      <div>
        Ім'я: {{ user.firstName }}
      </div>
      <div>
        Прізвище: {{ user.secondName }}
      </div>
      <div>
        Номер телефону: {{ user.phone }}
      </div>
    </div>
  </div>
  </template>

<script lang="ts">
import AuthApi from '@/api/auth.api';
import CommonApi from '@/api/common.api';
import getBase64Img from '@/shared/helpers/get-base64-img';
import {
  computed, defineComponent, onBeforeMount, onMounted, ref, watch,
} from 'vue';
import { useStore } from 'vuex';

// components

export default defineComponent({
  name: 'ProfileInfo',
  components: {
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const isPageReloaded = true;

    const image = ref<any>('');
    // computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const token = computed(() => store.getters.getToken);

    const user = computed(() => store.getters.getUser);

    // helpers
    const fetchCarImages = async () => {
      const userEmail = window.localStorage.getItem('user_email');
      const userTemp = await AuthApi.getUserInfo(token.value, JSON.parse(userEmail ?? ''));
      console.log(userTemp);

      if (userTemp && userTemp.avatarPath) {
        console.log(userTemp.avatarPath);
        const imageTemp = await CommonApi.getImages(userTemp.email ?? '', user.value.avatarPath);
        const [imageProfile] = imageTemp;
        image.value = { ...imageProfile };
        console.log(image.value);
      }
    };

    onMounted(() => {
      console.log('reload');
      fetchCarImages();
    });

    watch(user, async (newUser) => {
      fetchCarImages();
    });

    return {
      getBase64Img,
      image,
      user,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'src/styles/typography';
@import 'src/styles/colors';
@import 'src/styles/mixins';

.profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  @include for-xs-sm-md-width {
    width: 100%;
  }

  .profile-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;
    width: 100%;

    @include for-xs-sm-width {
      width: 100%;
    }

    @include for-md-width {
      width: 50%;
    }

    img {
      object-fit: cover;
      width: 100%;
      border-radius: 2rem;
    }
  }

  .profile-info {
    @include typo-body-large-medium;
    width: 100%;

    border-radius: 2rem;
    background: $color-viridian-green;
    margin-bottom: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>
