// instances
import http from '@/instances/http';

// models
const CommonApi = {
  async getFile(fileUri: string, token: string | null): Promise<Blob> {
    const headers: { [key: string]: string } = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await http.get('/File', { params: { fileUri }, headers, responseType: 'blob' });
    return res.data;
  },
};

export default CommonApi;
