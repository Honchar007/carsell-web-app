/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import FilesUploader from '../components/FilesUploader/FilesUploader.vue';
import Button from '../components/Button/Button.vue';

URL.createObjectURL = jest.fn();

describe('FilesUploader', () => {
  test('renders file input and button', () => {
    const wrapper = mount(FilesUploader);

    // Assert that the file input and button are rendered
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    expect(wrapper.find('div.car-block-btn span').text()).toBe('Choose fIle');
  });

  test('handles file change event', async () => {
    const wrapper = mount(FilesUploader);
    const input = wrapper.find('input[type="file"]');

    // Mock file
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    Object.defineProperty(input.element, 'files', {
      value: [file],
    });

    // Trigger file input change event
    await input.trigger('change');

    // Check if emitted event has correct value
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([file]);
  });

  test('removes file', async () => {
    const wrapper = mount(FilesUploader);

    const input = wrapper.find('input[type="file"]');

    // Mock file
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    Object.defineProperty(input.element, 'files', {
      value: [file],
    });

    // Trigger file input change event
    await input.trigger('change');

    // Click remove button
    await wrapper.vm.$nextTick();
    await wrapper.findComponent(Button).trigger('click');

    // Check if emitted event has null value
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([]);
  });
});
