/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import Select from '../components/Select/Select.vue';

describe('Select', () => {
  const options = [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
    { value: '3', text: 'Option 3' },
  ];

  it('should render the options correctly', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: null,
      },
    });

    const optionElements = wrapper.findAll('option');
    expect(optionElements).toHaveLength(options.length);

    optionElements.forEach((option, index) => {
      const optionData = options[index];
      expect(option.attributes('value')).toBe(optionData.value);
      expect(option.text()).toBe(optionData.text);
    });
  });

  it('should update the model value when an option is selected', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: null,
      },
    });

    const select = wrapper.find('select');
    const optionValue = options[1].value;

    await select.setValue(optionValue);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(optionValue);
  });

  it('should disable the select element when disabled prop is true', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: null,
        disabled: true,
      },
    });

    const selectInput = wrapper.find('.search-input');
    expect(selectInput.element.disabled).toBeTruthy();
    // expect(select.attributes('disabled')).toBeTruthy();
  });

  it('should display the nameLabel when provided', () => {
    const nameLabel = 'Select an option';

    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: null,
        nameLabel,
      },
    });

    const headSelect = wrapper.find('.head-select');
    expect(headSelect.text()).toBe(nameLabel);
  });
});
