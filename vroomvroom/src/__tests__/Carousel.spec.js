/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import Carousel from '../components/Carousel/Carousel.vue';

describe('Carousel', () => {
  it('renders the images correctly', () => {
    const images = [
      { type: 'image/png', content: 'base64-encoded-image-data-1' },
    ];
    const wrapper = shallowMount(Carousel, {
      props: {
        images,
      },
    });

    const imgElements = wrapper.findAll('.content-img img');

    expect(imgElements.length).toBe(images.length);
    imgElements.forEach((imgElement, index) => {
      const image = images[index];
      expect(imgElement.attributes('src')).toBe(
        `data:${image.type};base64,${encodeURIComponent(image.content)}`,
      );
      expect(imgElement.attributes('alt')).toBe(`${index}`);
    });
  });

  it('shows the navigation buttons if there are multiple images', () => {
    const images = [
      { type: 'image/png', content: 'base64-encoded-image-data-1' },
      { type: 'image/jpeg', content: 'base64-encoded-image-data-2' },
    ];
    const wrapper = shallowMount(Carousel, {
      props: {
        images,
      },
    });

    const menuElement = wrapper.find('.menu');
    const prevButton = wrapper.find('.btn-prev');
    const nextButton = wrapper.find('.btn-next');

    expect(menuElement.exists()).toBe(true);
    expect(prevButton.exists()).toBe(true);
    expect(nextButton.exists()).toBe(true);
  });

  it('does not show the navigation buttons if there is only one image', () => {
    const images = [
      { type: 'image/png', content: 'base64-encoded-image-data-1' },
    ];
    const wrapper = shallowMount(Carousel, {
      props: {
        images,
      },
    });

    const menuElement = wrapper.find('.menu');
    const prevButton = wrapper.find('.btn-prev');
    const nextButton = wrapper.find('.btn-next');

    expect(menuElement.exists()).toBe(false);
    expect(prevButton.exists()).toBe(false);
    expect(nextButton.exists()).toBe(false);
  });
});
