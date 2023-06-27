// Transforms model to FormData
// Current possible value types of model props: string, number, File
// May be extended if needed

export default function toFormData(model: any) {
  const formData = new FormData();
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(model)) {
    const value = model[key];

    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (Array.isArray(value)) {
        value.forEach((part) => formData.append(`${key}[]`, part));
      } else {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
}
