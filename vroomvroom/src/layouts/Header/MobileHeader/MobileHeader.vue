<template>
  <header>
    HElllo mobile
    <div class="overlay-wrapper">
      <div class="overlay" :style="{ maxHeight: `calc(${height}px - 1rem)` }">
        <template v-for="link in links" :key="link.name">
          <a v-if="link.href" class="menu-item" target="_blank" :href="link.href">
            <img :src="link.icon" :alt="link.name" />
            <span>{{ link.name }}</span>
          </a>
          <router-link
            v-else
            class="menu-item"
            :to="'/home'"
          >
            <img :src="link.icon" :alt="link.name" />
            <span>{{ link.name }}</span>
          </router-link>
        </template>
        <Button small class="create-post-btn">
          <template v-slot:prefix>
            <img src="@/assets/icons/plus-green.svg" alt="add new post" />
          </template>
          New post
        </Button>
        <template>
          <div class="separator" />
          <button class="menu-item">
            <img src="@/assets/icons/logout.svg" alt="logout" />
            <span>Disconnect</span>
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

// store

// components

// models
import LinkData from '@/shared/models/link-data';

// constants
import Colors from '@/shared/constants/colors';
import UserState from '@/shared/constants/user-state';

export default defineComponent({
  name: 'MobileHeader',
  components: {
  },
  props: {
    links: {
      type: Array as () => LinkData[],
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  emits: ['connect-wallet', 'disconnect'],
  setup() {
    // common

    // refs
    // computed

    // helpers

    // watchers

    return {
      Colors,
      UserState,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';
@import 'src/styles/colors';

header {
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;

  .avatar {
    border: 0.25rem solid $color-accent-component-background;
    border-radius: 50%;
  }

  .search {
    flex-grow: 1;
    width: unset;
  }

  .input-toggle {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
    height: 2.25rem;
    margin-left: 1rem;
    border-radius: 50%;
    background-color: $color-peach-secondary;
  }

  .overlay-wrapper {
    position: absolute;
    top: 0.5rem;
    width: 100%;

    .overlay {
      position: absolute;
      top: 0;
      z-index: 30;
      overflow: auto;
      display: flex;
      flex-direction: column;
      width: 19rem;
      padding: 0 1rem;
      border: 1px solid $color-card-border;
      border-radius: 1rem;
      background-color: $color-accent-component-background;
      box-shadow: $shadow-overlay;

      .profile {
        align-self: flex-start;
        margin: 0.5rem 0 1rem;
        box-shadow: 0 0 1px rgba(15, 23, 42, 0.06),
          0 4px 6px -1px rgba(15, 23, 42, 0.1),
          0px 2px 4px -1px rgba(15, 23, 42, 0.06);
      }

      .menu-item {
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 1rem 0;
        filter: brightness(1);
        transition: filter 0.3s ease-in-out;
        cursor: pointer;

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

      .create-post-btn {
        margin: 1rem 0 2rem;

        img {
          filter: brightness(0);
        }
      }

      .separator {
        flex-shrink: 0;
        height: 1px;
        margin: 1px 0;
        background-color: $color-card-border;
      }
    }
  }
}
</style>
