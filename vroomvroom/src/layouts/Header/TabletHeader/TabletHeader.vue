<template>
  <header>
    <div class="menu">
      <template v-for="link in links" :key="link.name">
        <a v-if="link.href" class="menu-item" :href="link.href">
          <img :src="link.icon" :alt="link.name" />
          <span>{{ link.name }}</span>
        </a>
        <router-link
          v-else
          class="menu-item"
          :to="link.path as any"
        >
          <img :src="link.icon" :alt="link.name" />
          <span>{{ link.name }}</span>
        </router-link>
      </template>
      <Button v-if="isAuthenticated" @click="logout" class="menu-item btn-logout">
        Вихід
      </Button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

// components

// models
import LinkData from '@/shared/models/link-data';
import { useStore } from 'vuex';
import Button from '@/components/Button';
import { Actions } from '@/store/props';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Header',
  components: {
    Button,
  },
  props: {
    links: {
      type: Array as () => LinkData[],
      required: true,
    },
  },
  emits: [],
  setup() {
    const store = useStore();
    const router = useRouter();
    // computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    // helpers
    const logout = () => {
      console.log('logout');
      store.dispatch(Actions.logout).then(() => {
        router.push('/home');
      });
    };

    return {
      isAuthenticated,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/typography';
@import 'src/styles/mixins';

header {
  background: $color-background;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem 0 1rem;
  border-radius: 20rem;

  @include for-xs-sm-md-lg-width {
    flex-direction: column;
    gap: 1rem;

    .search {
      margin-top: 1rem;
    }
  }

  @include for-xs-sm-width {
    border-radius: 2rem;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    .btn-logout {
      height: 80%;
      width: 100%;
      max-width: 8rem;
      max-height: 2rem;

      @include for-xs-sm-width {
        max-width: 80%;
        margin-bottom: 1rem;
      }
    }

    @include for-xs-sm-width {
      flex-direction: column;
      gap: 1rem;
    }
    .menu-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 1rem;
      padding: 1rem 0;
      filter: brightness(1);
      transition: filter 0.3s ease-in-out;
      cursor: pointer;
      text-decoration: none;

      @include for-xs-sm-width {
        justify-content: center;
      }

      &.active, &:hover {
        filter: brightness(2);
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.75rem;
      }

      span {
        @include typo-button-small;
        color: $color-grey;
      }
    }
  }
}
</style>
