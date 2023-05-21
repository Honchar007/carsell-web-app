<template>
  <img v-if="fileUri" :src="fileUri" @load="$emit('loaded')" alt="car photo"/>
  <img v-else src="@/assets/placeholder-image.svg"  alt="placeholder photo">
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';

// store

// services
import FilesLoadService from '@/services/files-load.service';

export default defineComponent({
  name: 'FilePreview',
  props: {
    story: {
      type: Boolean,
      default: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['loaded'],
  setup(props) {
    // common
    // refs
    const { filePath } = toRefs(props);
    const fileUri = ref<string>('');

    // computed
    watch(filePath, (newFilePath) => {
      fileUri.value = FilesLoadService.getFileUri(newFilePath, 'token.value');
    });

    onMounted(() => {
      fileUri.value = FilesLoadService.getFileUri(filePath.value, 'token.value');
    });
    return {
      fileUri,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

video {
  display: block;
  width: 100%;
  min-height: 25.125rem;
  border-radius: 1rem;

  &.blocked {
    filter: blur(1rem);
  }
}

img {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 1rem;
  min-height: 25.125rem;
  overflow: hidden;

  &::before {
    background: $color-background url("../../assets/placeholder-image.svg") no-repeat;
    background-size: cover;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    content: '';
  }
}
</style>
