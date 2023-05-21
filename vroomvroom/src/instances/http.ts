import axios from 'axios';

const http = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api` as string,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      // eslint-disable-next-line
    } as any,
  },
});

export default http;
