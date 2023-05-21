<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
    <div
      class="slot-container"
      @click="inputRef?.click()"
    >
      <slot>
        <Button
          :small="btnSmall"
          :outlined="btnOutlined"
        >
          {{ btnText }}
        </Button>
      </slot>
    </div>
    <input
      ref="inputRef"
      type="file"
      multiple
      hidden
      :accept="fileTypes"
      @input="selectFile"
    />
    <div v-for="value, key in inputRef?.files" v-bind:key="key">
      {{ inputRef }}
    </div>

    <!--  modals  -->

    <Modal
      v-if="openBigSizeErrorModal"
      has-cancel-button
      cancel-button-label="ok"
      :has-close-button="false"
      @close="openBigSizeErrorModal = false"
    >
      <template v-slot:header>
        <h3>Error</h3>
      </template>
      <template v-slot:body>
        <p>Selected file size is too big. File size should be less than 72 MB.</p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// components
import MAX_FILE_SIZE from '@/shared/constants/max-file-size';
import Modal from '@/components/Modal/Modal.vue';
import Button from '../Button';

export default defineComponent({
  name: 'CommonFileUploader',
  components: { Modal, Button },
  props: {
    btnText: {
      type: String,
      default: '',
    },
    btnOutlined: {
      type: Boolean,
      default: true,
    },
    btnSmall: {
      type: Boolean,
      default: false,
    },
    fileTypes: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    // refs
    const inputRef = ref<HTMLInputElement | null>(null);

    const openBigSizeErrorModal = ref<boolean>(false);

    // helpers
    function selectFile(): void {
      if (inputRef.value) {
        const file = inputRef.value.files?.[0];

        if (file && file.size > MAX_FILE_SIZE) {
          openBigSizeErrorModal.value = true;
        } else {
          emit('update:modelValue', file);
        }

        inputRef.value.value = '';
      }
    }

    return {
      inputRef,
      openBigSizeErrorModal,
      selectFile,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/typography';

div {
  .slot-container {
    display: flex;

    button {
      width: 100%;
    }
  }
}

h3 {
  @include typo-headline-3;
}

p {
  @include typo-body-large-medium;
}
</style>
