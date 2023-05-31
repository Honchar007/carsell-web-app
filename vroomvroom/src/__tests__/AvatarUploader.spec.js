/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import AvatarUploader from '../components/AvatarUploader/AvatarUploader.vue';

URL.createObjectURL = jest.fn();

describe('AvatarUploader', () => {
  it('should emit the selected file when a file is chosen', async () => {
    const wrapper = mount(AvatarUploader);
    const input = wrapper.find('input[type="file"]');

    // Mock file
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    Object.defineProperty(input.element, 'files', {
      value: [file],
    });

    // Trigger file input change event
    await input.trigger('change');

    // Check if emitted event has correct value
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(file);
  });

  it('should remove the selected file when remove button is clicked', async () => {
    const wrapper = mount(AvatarUploader);

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
    await wrapper.find('.delete').trigger('click');

    // Check if emitted event has null value
    expect(wrapper.vm.identityDocumentFile).toBeNull();
  });
});
