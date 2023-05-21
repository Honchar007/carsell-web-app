<template>
  <div>
    <CommonFileUploader
      v-if="!modelValue"
      :file-types="fileTypes"
      :btn-text="btnText"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <slot />
    </CommonFileUploader>
    <div v-else class="img-block">
      <FilePreview
        class="file-uploader-img"
        :is-blocked="true"
        :preview="preview"
        :file-path="createImage(modelValue) as string"
        :mime-type="modelValue.type"
      />
      <button @click="$emit('delete-image')">
        <img src="@/assets/icons/close.svg" alt="close">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';

// services
import FilesLoadService from '@/services/files-load.service';

// components
import FilePreview from '@/components/FilePreview';
import CommonFileUploader from '../CommonFileUploader';

export default defineComponent({
  name: 'FileUploader',
  components: {
    FilePreview,
    CommonFileUploader,
  },
  props: {
    modelValue: {
      type: File,
      default: null,
    },
    btnText: {
      type: String,
      default: '',
    },
    fileTypes: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'delete-image'],
  setup(props) {
    // refs
    const { placeholder } = toRefs(props);
    const tempUrl = ref<string>('');

    // helpers
    function createImage(file: File | null): string | null {
      return file ? URL.createObjectURL(file) : props.placeholder && tempUrl.value;
    }

    // watchers
    watch(placeholder, () => {
      tempUrl.value = FilesLoadService.getFileUri(placeholder.value);
    });

    // lifecycle hooks
    onMounted(() => {
      tempUrl.value = FilesLoadService.getFileUri(placeholder.value);
    });

    return {
      createImage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/typography';

.img-block {
  position: relative;
  width: 12rem;
  height: 12rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 2.1rem;
    background: linear-gradient(270deg, rgba(17, 19, 27, 0.8) 0%,
      rgba(17, 19, 27, 0.6) 36.98%,
      rgba(17, 19, 27, 0) 100%);
    border-radius: 0 1rem 1rem 0;
    z-index: 1;
  }

  .file-uploader-img {
    height: 12rem;
    width: 12rem;
    min-height: 0;
    object-fit: cover;
  }

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    z-index: 1;

    img {
      width: 100%;
      filter: brightness(2)
    }
  }
}
</style>
