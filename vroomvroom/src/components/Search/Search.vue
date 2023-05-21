<template>
  <div class="search-wrapper" ref="searchRef">
    <Input
      class="search-input"
      type="search"
      placeholder="Search AUTO Fans..."
      vertical-padding="0.25rem"
      :small="true"
      :rounded="true"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from 'vue';

// store
import Input from '@/components/Input';

// components

export default defineComponent({
  name: 'Search',
  components: {
    Input,
  },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // common

    // refs
    const inputFocused = ref<boolean>(false);

    const searchRef = ref<null | HTMLElement>(null);

    // computed

    // helpers

    // eslint-disable-next-line
    function checkWindowClick(event: any): void {
      if (searchRef.value) {
        for (let curNode = event.target; curNode; curNode = curNode.parentNode) {
          if (curNode === searchRef.value) {
            return;
          }
        }
      }

      inputFocused.value = false;
    }

    // async helpers

    // watchers
    watch(inputFocused, (value) => {
      if (value) {
        setTimeout(() => document.body.addEventListener('click', checkWindowClick));
      } else {
        document.body.removeEventListener('click', checkWindowClick);
      }
    });

    return {
      inputFocused,
      searchRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/typography';
.search-wrapper {
  position: relative;
  width: 100%;
  .search-input {
    width: 100%;
  }
}
</style>
