<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="main-edit">
    <div class="car-block-buttons">
      <input
        type="file"
        ref="idFileInput"
        multiple
        @change="handleFileChangeUp"
      >
      <div class="car-block-btn">
        <span @click="idFileInput.click()">
          Choose fIle
        </span>
        <div class="car-block-btn-bg"></div>
      </div>
    </div>
    <div v-if="identityDocumentFiles.length > 0" class="car-blocks">
      <div v-for="(file, index) in identityDocumentFiles" :key="index" class="car-block">
        <div class="car-block-img">
          <img :src="getFileUrl(file)" alt="id-file">
        </div>
        <div class="info-img">
          <input
            type="text"
            readonly
            :value="identityDocumentFiles[index].name"
            placeholder="file name"
          >
          <Button @click="removeFile(index)">Remove</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';

import CommonApi from '@/api/common.api';
import getBase64Img from '@/shared/helpers/get-base64-img';
import Button from '../Button';

export default defineComponent({
  name: 'FilesUploader',
  components: {
    Button,
  },
  props: {
    label: String,
    modelValue: {
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const idFileInput = ref<any>([]);
    const identityDocumentFiles = ref<any>([]);

    const files = ref<any>([]);
    const imagePreviews = ref<any>([]);

    const handleFileChange = async (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      const fileList: File[] = Array.from(inputElement.files!);
      files.value = fileList;

      // Generate image previews
      const imagePreviewsPromises: Promise<string>[] = fileList.map((file) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          resolve(result);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsDataURL(file);
      }));

      try {
        const imagePreviewsResults = await Promise.all(imagePreviewsPromises);
        imagePreviews.value = imagePreviewsResults;
      } catch (error) {
        // Handle error if FileReader fails
        console.error('Error generating image previews:', error);
      }
    };

    const removeFile = (index: number) => {
      identityDocumentFiles.value.splice(index, 1);
    };

    const getFileUrl = (file: any) => URL.createObjectURL(file);

    const handleFileChangeUp = async (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      const fileList: File[] = Array.from(inputElement.files!);
      identityDocumentFiles.value = fileList;
    };

    watch(identityDocumentFiles, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return {
      files,
      imagePreviews,
      handleFileChange,
      removeFile,
      idFileInput,
      identityDocumentFiles,
      getFileUrl,
      handleFileChangeUp,
      getBase64Img,
    };
  },
});
</script>

<style lang="scss">
@import "src/styles/typography";
@import "src/styles/colors";

.main-edit {
  margin: 1rem;

  .car-save-btn {
    cursor: pointer;
    margin-top: 2rem;
  }
}

.car-block-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;

  input[type='file'] {
    display: none;
  }
  .car-block-btn {
    display: flex;
    cursor: pointer;
    span {
      @include typo-headline-3;

      padding: 17.5px 75.5px;
      background: #29ABE2;
      border-radius: 10px;
      color: #FFFFFF;
      position: relative;
      z-index: 2;
      @media (max-width: 911px) {
        padding: 7.5px 0;
        width: 170px;
        text-align: center;
        font-size: 16px;
        line-height: 138%;
      }
    }
    .car-block-btn-bg {
      position: absolute;
      width: 211px;
      height: 100%;
      top: 50%;
      transform: translateX(-50%);
      left: 50%;
      background: rgba(95, 122, 126, 0.22);
      filter: blur(54px);
      border-radius: 10px;
      pointer-events: none;
    }
  }
  .car-block-img-input {
    display: flex;
    margin-right: auto;
    margin-left: 16px;
    width: 100%;
    max-width: 250px;
    @media (max-width: 911px) {
      margin: 15px 0;
      max-width: 170px;
    }
    input {
      width: 100%;
      border: 1px solid #29ABE2;
      border-radius: 10px;
      padding: 17px;
      font-family: Open Sans, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 17px;
      line-height: 26px;
      color: #102941;
    }
  }
}
.car-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  height: 100%;
  width: 100%;

  .car-block {
    height: 100%;
    .car-block-img {
      height: 80%;
      margin: 0 auto;
      margin-bottom: 1rem;
      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .info-img {
      display: flex;

      input {
        @include typo-headline-3;

        width: 100%;
        border: 1px solid #29ABE2;
        border-radius: 10px;
        color: #102941;
      }
    }
  }
}
</style>
