import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:3000/' as string,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      // eslint-disable-next-line
    } as any,
  },
});

export default http;
