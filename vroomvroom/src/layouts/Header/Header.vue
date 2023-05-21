<template>
  <MobileHeader
    class="mobile"
    :links="links"
    :height="height || 0"
  />
  <TabletHeader
    class="desktop"
    :links="links"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// models
import LinkData from '@/shared/models/link-data';

// components
import TabletHeader from './TabletHeader';
import MobileHeader from './MobileHeader';

export default defineComponent({
  name: 'Header',
  components: {
    TabletHeader,
    MobileHeader,
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
  emits: [],
});
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins';

.desktop, .mobile {
  display: none;
}
@include for-xxl-width {
  .desktop {
    display: flex;
  }
}

@include for-xs-sm-md-lg-xl-width {
  .desktop {
    display: flex;
  }
}

@include for-xs-width {
  .desktop {
    display: none;
  }

  .mobile {
    display: flex;
  }
}
</style>
