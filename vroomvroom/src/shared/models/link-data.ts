// models
interface LinkData {
  icon: string,
  name: string,
  // eslint-disable-next-line
  dynamicPath?: any,
  path?: string | { name: string },
  href?: string,
}

export default LinkData;
