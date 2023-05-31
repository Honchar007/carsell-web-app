/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import ProfileCarCard from '../components/ProfileCarCard/ProfileCarCard.vue';

describe('ProfileCarCard', () => {
  it('should navigate to car page when clicked', async () => {
    const mockRouter = createRouter({
      history: createWebHistory(),
      routes: [],
    });

    const pushSpy = jest.spyOn(mockRouter, 'push');

    const linkPath = 'car1';
    const wrapper = shallowMount(ProfileCarCard, {
      props: {
        linkPath,
      },
      global: {
        plugins: [mockRouter],
      },
    });

    // Invoke the openCarPage method directly
    wrapper.vm.openCarPage();

    // Assert that router.push was called with the correct path
    expect(pushSpy).toHaveBeenCalledWith(`/car-page/${linkPath}`);
  });

  it('should display car image if available', () => {
    // Mock data
    const linkPath = 'car123';
    const imageCar = 'car-image.jpg';
    const brand = 'Brand';
    const model = 'Model';
    const price = 10000;
    const volume = 2.0;
    const transmission = 'Manual';
    const description = 'Car description';
    const year = 2020;
    const odometr = 5000;

    // Mount the component
    const wrapper = shallowMount(ProfileCarCard, {
      props: {
        linkPath,
        imageCar,
        brand,
        model,
        price,
        volume,
        transmission,
        description,
        year,
        odometr,
      },
    });

    // Find the car image element
    const carImage = wrapper.find('.car-image img');

    // Assert that the car image source is set correctly
    expect(carImage.exists()).toBe(true);
    expect(carImage.attributes('src')).toBe(imageCar);
  });
});
