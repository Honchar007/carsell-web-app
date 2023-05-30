<template>
  <div class="main-container-wrapper">
    <div class="container">
      <div class="content-wrapper">
        <Header
          :links="LinksHeaderAvtovukyp"
          :height="height || 0"
          :logout="logout"
        />
        <div class="content" :style="{ height: disableScroll ? `${contentHeight}px` : undefined }">
          <main>
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
  <!-- <Footer v-if="!disableFooter" /> -->

  <!-- modals -->

</template>

<script lang="ts">
import {
  computed,
  defineComponent,
} from 'vue';

// store

// components

// hooks
import useWindowResize from '@/shared/hooks/use-window-resize';

// helpers

// models
import Header from '@/layouts/Header';

// constants
import Links, {
  LinkAuth, LinkExpert, LinkNotAuth, LinkIsAvtovukyp,
} from '@/shared/constants/links';
import { useStore } from 'vuex';
import { Actions } from '@/store/props';
import { useRouter } from 'vue-router';

const DESKTOP_PADDING = 32;
const TABLET_PADDING = 102;
const MOBILE_PADDING = 52;

const MD_LG = 991;
const XS_SM = 575;

export default defineComponent({
  name: 'MainLayout',
  components: {
    Header,
  },
  props: {
    disableFooter: {
      type: Boolean,
      default: false,
    },
    disableFeatured: {
      type: Boolean,
      default: false,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // common
    const { height, width } = useWindowResize();

    // refs

    // computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const isExpert = computed(() => store.getters.isExpert);
    const isAvtovukypMan = computed(() => store.getters.isAvtovukyp);

    const LinksHeader = computed(() => (isAuthenticated.value ? [...Links, LinkAuth] : [...Links, LinkNotAuth]));
    const LinksHeaderExpert = computed(() => (isAuthenticated.value && isExpert.value ? [...LinksHeader.value, LinkExpert] : [...LinksHeader.value]));
    const LinksHeaderAvtovukyp = computed(() => (isAuthenticated.value && isAvtovukypMan.value
      ? [...LinksHeaderExpert.value, LinkIsAvtovukyp]
      : [...LinksHeaderExpert.value]
    ));

    const contentHeight = computed(() => {
      const h = height.value;
      const w = width.value;

      return (h || 0) - (
        (!w || w > MD_LG)
          ? DESKTOP_PADDING
          : w > XS_SM
            ? TABLET_PADDING
            : MOBILE_PADDING
      );
    });

    // helpers
    // async helpers
    const logout = () => {
      store.dispatch(Actions.logout).then(() => {
        router.push('/home');
      });
    };
    // watchers

    // lifecycle hooks

    return {
      height,
      contentHeight,
      LinksHeader,
      isAuthenticated,
      LinksHeaderExpert,
      LinksHeaderAvtovukyp,
      logout,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';
@import 'src/styles/colors';

.main-container-wrapper {
  @include main-layout-wrapper;
  flex-grow: 1;
  padding-top: 2rem;
  // background: $gradient-dark;

  @include for-xs-sm-md-width {
    padding-top: 1rem;
  }

  @include for-xs-width {
    padding-top: 0;
  }

  .container {
    display: flex;
    width: 100%;
    .sidebar {
      @include for-xs-width {
        display: none;
      }
    }

    .content-wrapper {
      flex-grow: 1;
      width: 100%;

      @include for-xs-sm-md-width {
        width: calc(100% - 4.5rem);
      }

      @include for-xs-width {
        width: 100%;
        padding-left: 0;
      }

      .content {
        display: flex;
        width: 100%;
        background: $color-background;
        border-radius: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;

        main {
          flex-grow: 1;
          width: 100%;

          &.without-featured {
            width: 100%;
            margin-right: 0;
          }

          @include for-xs-sm-md-lg-width {
            width: calc(100% - 16rem - 3.375rem);
          }

          @include for-xs-sm-md-width {
            width: 100%;
            margin-right: 0;
          }
        }

        .featured-creators {
          flex-shrink: 0;
          width: 22rem;

          @include for-xs-sm-md-lg-width {
            width: 16rem;
          }

          @include for-xs-sm-md-width {
            display: none;
          }
        }
      }
    }
  }
}
</style>
