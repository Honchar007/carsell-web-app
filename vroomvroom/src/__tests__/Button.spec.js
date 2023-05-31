/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import Button from '../components/Button/Button.vue';

describe('Button', () => {
  test('renders a button element', () => {
    const wrapper = mount(Button);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  test('applies small class when small prop is true', () => {
    const wrapper = mount(Button, { props: { small: true } });
    expect(wrapper.classes('button-small')).toBe(true);
  });

  test('renders a button element with the correct classes', () => {
    const wrapper = mount(Button, {
      props: {
        small: true,
        primary: true,
        outlined: true,
        disabled: true,
        fullWidth: true,
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.classes()).toContain('button-small');
    expect(wrapper.classes()).toContain('primary');
    expect(wrapper.classes()).toContain('outlined');
    expect(wrapper.classes()).toContain('disabled');
    expect(wrapper.classes()).toContain('full-width');
  });

  test('renders prefix and postfix slots if provided', () => {
    const wrapper = mount(Button, {
      slots: {
        prefix: '<span class="prefix-slot">Prefix</span>',
        postfix: '<span class="postfix-slot">Postfix</span>',
      },
    });

    expect(wrapper.find('.prefix-slot').exists()).toBe(true);
    expect(wrapper.find('.postfix-slot').exists()).toBe(true);
  });

  test('emits a click event when clicked', async () => {
    const wrapper = mount(Button);

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
