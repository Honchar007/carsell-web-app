<template>
  <div>
    <label for="fileUploader" class="file-label">{{ label }}</label>
    <input
      ref="fileUploaderRef"
      id="fileUploader"
      type="file"
      multiple
      @change="handleFileChange"
      style="display: none"
    />
    <div v-if="files.length > 0" class="file-preview">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <img :src="imagePreviews[index]" alt="Preview" class="preview-image" />
        <span>{{ file.name }}</span>
        <button @click="removeFile(index)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilesUploader',
  props: {
    label: String,
  },
  setup() {
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
      files.value.splice(index, 1);
    };

    return {
      files,
      imagePreviews,
      handleFileChange,
      removeFile,
    };
  },
});
</script>

<style>
.file-label {
  cursor: pointer;
  /* Add your styling for the file label */
}

.file-preview {
  /* Add your styling for the file preview */
}

.file-item {
  /* Add your styling for each file item */
}
</style>
