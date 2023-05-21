import {
  onMounted, onUnmounted, Ref, ref,
} from 'vue';

function useWindowResize(): { width: Ref<number | null>; height: Ref<number | null> } {
  const height = ref<number | null>(null);
  const width = ref<number | null>(null);

  function resize() {
    height.value = window.innerHeight;
    width.value = window.innerWidth;
  }

  onMounted(() => {
    resize();
    window.addEventListener('resize', resize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });

  return { height, width };
}

export default useWindowResize;
