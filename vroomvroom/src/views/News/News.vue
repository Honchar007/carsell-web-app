<template>
  <div class="news">
    <h1>10 свіжих новин про автомобілі</h1>
    <div v-for="(item, index) in news" :key="index" class="news-item">
      <div class="news-headline">{{ item.source.name }}</div>
      <div>{{ item.description }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

// components

// api
import NewsApi from '@/api/news.api';

export default defineComponent({
  name: 'News',
  components: {
  },
  setup() {
    const news = ref<any>([]);

    // async helpers
    onMounted(async () => {
      const res = await NewsApi.getNews();
      if (res.articles.length > 10) news.value = res.articles.slice(0, 10);
      else news.value = res.articles;
    });

    return {
      news,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
@import "src/styles/mixins";

.news-item {
  @include typo-headline-4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid $color-secondary-background-molecules;
  border-radius: 2rem;
  gap: 1rem;
  padding: 2rem;
  margin: 1rem;

  .news-headline {
    @include typo-card-body;
    margin-bottom: 0.5rem;
    color: $color-viridian-green;
  }
}
</style>
