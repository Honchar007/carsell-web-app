function getBase64Img(type: string, base64String: string): string {
  if (base64String !== undefined) {
    return `data:${type};base64,${base64String}`;
  }
  return '';
}

export default getBase64Img;
