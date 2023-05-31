/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import CreateCar from '../components/CarCreate/CarCreate.vue';

describe('CreateCar', () => {
  it('should render the component correctly', () => {
    const wrapper = shallowMount(CreateCar);
    expect(wrapper.exists()).toBe(true);
  });

  it('should set the brandTemp value when a brand is selected', async () => {
    const wrapper = shallowMount(CreateCar);
    const brandSelect = wrapper.findComponent({ name: 'Select' });

    // Simulate selecting a brand
    brandSelect.vm.$emit('update:modelValue', 'Brand 1');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.brandTemp).toBe('Brand 1');
  });

  it('should call $router.back() method when the return button is clicked', async () => {
    const backMock = jest.fn(); // Create a mock function
    const $router = {
      back: backMock, // Assign the mock function to the $router.back() method
    };
    const wrapper = shallowMount(CreateCar, {
      global: {
        mocks: {
          $router, // Provide the mocked $router object
        },
      },
    });
    const returnButton = wrapper.find('.delete');

    // Simulate clicking the return button
    await returnButton.trigger('click');

    // Assert that $router.back() method was called
    expect(backMock).toHaveBeenCalled();
  });
});
