<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="avatar-input-wrapper">
    <div class="select-file">
      <input
        type="file"
        ref="idFileInput"
        accept="image/png, image/gif, image/jpeg"
        @change="handleFileChangeUp"
      >
      <Button @click="idFileInput.click()">
        Choose fIle
      </Button>
    </div>
    <div class="avatar-block">
      <div v-if="identityDocumentFile" class="">
        <div class="avatar-img">
          <img :src="getFileUrl(identityDocumentFile)" alt="id-file">
        </div>
        <div class="info-img">
          <input
            type="text"
            readonly
            :value="identityDocumentFile.name"
            placeholder="file name"
          >
          <Button class="delete" @click="removeFile">Remove</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue';

import getBase64Img from '../../shared/helpers/get-base64-img';
import Button from '../Button';

export default defineComponent({
  name: 'AvatarUploader',
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
    const identityDocumentFile = ref<any>(null);

    const files = ref<any>([]);
    const imagePreviews = ref<any>([]);

    const removeFile = () => {
      identityDocumentFile.value = null;
    };

    const getFileUrl = (file: any) => URL.createObjectURL(file);

    const handleFileChangeUp = async (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        identityDocumentFile.value = inputElement.files[0];
        if (inputElement) inputElement.value = '';
      }
    };

    watch(identityDocumentFile, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return {
      files,
      imagePreviews,
      identityDocumentFile,
      removeFile,
      idFileInput,
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
@import "src/styles/mixins";

.avatar-input-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;

  .select-file {
    display: flex;

    input[type='file'] {
      display: none;
    }
  }

  .avatar-block {
    .avatar-img {
      @include for-xs-sm-md-width {
        display: none;
      }
      img {
        max-width: 26rem;
        height: auto;
      }

    }
    .info-img {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      @include for-sm-md-lg-width {
      flex-direction: row;
      }

      @include for-xl-width {
        flex-direction: row;
        }

      input {
        @include typo-headline-3;

        width: 100%;
        text-align: center;
        border-radius: 2rem;
        color: #102941;
        margin-right: 0.5rem;

        @include for-xs-sm-md-lg-width {
          margin-right: 0rem;
        }
      }

      .delete {
        width: 100%;
      }
    }
  }
}

</style>
