/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import Input from '../components/Input/Input.vue';

describe('Input', () => {
  it('should emit update:modelValue event when input value changes', async () => {
    const wrapper = shallowMount(Input);
    const inputElement = wrapper.find('input');

    // Simulate input value change
    await inputElement.setValue('New Value');

    // Assert that update:modelValue event was emitted with the new value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('New Value');
  });

  it('should emit focus event when input is focused', async () => {
    const wrapper = shallowMount(Input);
    const inputElement = wrapper.find('input');

    // Simulate input focus
    await inputElement.trigger('focus');

    // Assert that focus event was emitted
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('should have a label text when label prop is provided', () => {
    const label = 'Name';
    const wrapper = shallowMount(Input, {
      props: {
        label,
      },
    });
    const labelTextElement = wrapper.find('.label-text');

    // Assert that label text is rendered correctly
    expect(labelTextElement.exists()).toBe(true);
    expect(labelTextElement.text()).toBe(label);
  });

  it('should have an error message when error prop is provided', () => {
    const error = 'Invalid input';
    const wrapper = shallowMount(Input, {
      props: {
        error,
      },
    });
    const errorTextElement = wrapper.find('.error-text');

    // Assert that error message is rendered correctly
    expect(errorTextElement.exists()).toBe(true);
    expect(errorTextElement.text()).toBe(error);
  });

  it('should have a helper text when helper prop is provided', () => {
    const helper = 'Please enter your name';
    const wrapper = shallowMount(Input, {
      props: {
        helper,
      },
    });
    const helperTextElement = wrapper.find('.helper-text');

    // Assert that helper text is rendered correctly
    expect(helperTextElement.exists()).toBe(true);
    expect(helperTextElement.text()).toBe(helper);
  });

  // Add more tests as needed
});
