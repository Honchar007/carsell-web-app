<template>
  <header>
    <Search class="search"/>
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
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

// components

// models
import LinkData from '@/shared/models/link-data';
import Search from '@/components/Search';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Header',
  components: {
    Search,
  },
  props: {
    links: {
      type: Array as () => LinkData[],
      required: true,
    },
  },
  emits: [],
  setup() {
    return {
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

  .search {
    flex-shrink: 1;
    flex-grow: 1;
    width: unset;
    max-width: 26rem;
  }
  .menu {
    display: flex;
    justify-content: space-around;
    width: 70%;
    margin-left: 0.5rem;

    @include for-xs-sm-width {
      flex-direction: column;
      gap: 1rem;
    }
    .menu-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 2rem;
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
