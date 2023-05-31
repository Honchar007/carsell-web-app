/* eslint-disable no-undef */
import toFormData from '@/shared/helpers/to-form-data';

describe('toFormData', () => {
  it('should convert a model object to FormData', () => {
    const model = {
      name: 'John Doe',
      age: 30,
      avatar: new File(['avatar'], 'avatar.png', { type: 'image/png' }),
      hobbies: ['reading', 'running'],
    };

    const formData = toFormData(model);

    // Check if the FormData contains the correct values
    expect(formData.get('name')).toBe('John Doe');
    expect(formData.get('age')).toBe('30');
    expect(formData.get('avatar')).toBeInstanceOf(File);
    expect(formData.get('hobbies[]')).toBe('reading');
    expect(formData.getAll('hobbies[]')).toEqual(['reading', 'running']);
  });

  it('should ignore undefined and null values', () => {
    const model = {
      name: 'John Doe',
      age: undefined,
      avatar: null,
      hobbies: ['reading', null, undefined],
    };

    const formData = toFormData(model);

    // Check if the FormData does not contain undefined and null values
    expect(formData.get('name')).toBe('John Doe');
    expect(formData.get('age')).toBeNull();
    expect(formData.get('avatar')).toBeNull();
  });

  // Add more test cases for different scenarios
});
