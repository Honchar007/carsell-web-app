/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import Checkbox from '../components/Checkbox/Checkbox.vue';

describe('Checkbox', () => {
  it('should render the label text correctly', () => {
    const labelText = 'Checkbox Label';
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: labelText,
      },
    });

    const labelElement = wrapper.find('.label');
    expect(labelElement.text()).toBe(labelText);
  });

  it('should emit the "update:modelValue" event when the checkbox is toggled', async () => {
    const wrapper = shallowMount(Checkbox);
    const checkboxInput = wrapper.find('input[type="checkbox"]');

    // Toggle the checkbox
    await checkboxInput.setChecked(true);

    // Assert that the "update:modelValue" event was emitted with the expected value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true);
  });

  it('should be disabled when the "disabled" prop is true', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        disabled: true,
      },
    });

    const checkboxInput = wrapper.find('input[type="checkbox"]');
    expect(checkboxInput.element.disabled).toBeTruthy();
  });

  it('should not be disabled when the "disabled" prop is false', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        disabled: false,
      },
    });

    const checkboxInput = wrapper.find('input[type="checkbox"]');
    expect(checkboxInput.element.disabled).toBeFalsy();
  });
});
