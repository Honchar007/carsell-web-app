// instances
import http from '@/instances/http';
import toFormData from '@/shared/helpers/to-form-data';
import CarInfo from '@/store/models/car-info';
import SearchCars from '@/store/models/search-cars';

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

  async uploadImage(email: string, data: any) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    console.log(data);
    const res = await http.post(
      `/upload-avatar/${email}`,
      toFormData({ 0: data }),
      {
        headers,
      },
    );

    return res.data;
  },

  async uploadImages(id: string, data: any, token: string) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };

    const res = await http.post(
      `/upload-many/${id}`,
      toFormData(data),
      {
        headers,
      },
    );

    return res.data;
  },

  async getImages(id: string, filename: any) {
    const res = await http.get(`/files/${filename}`);
    return res.data;
  },

  async getImage(id: string, filename: any) {
    const res = await http.get(`/upload/${filename}`);
    return res.data;
  },

  async getOwnCars(token: string, id: string): Promise<CarInfo[]> {
    const res = await http.get(
      `http://127.0.0.1:3000/my-cars/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async getCars(params: any) {
    const res = await http.get('http://127.0.0.1:3000/cars', {
      params,
    });
    return res.data;
  },

  async getCarsAvtovukyp(token: string): Promise<CarInfo[]> {
    const res = await http.get(
      'http://127.0.0.1:3000/cars-avtovukyp',
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async getModels(brand: string) {
    const res = await http.get(`http://127.0.0.1:3000/models/${brand}`);
    return res.data;
  },

  async getUserPhone(id: string) {
    const res = await http.get(
      `http://127.0.0.1:3000/user-phone/${id}`,
    );
    return res.data;
  },

  async getCarInfo(id: string) {
    const res = await http.get(
      `http://127.0.0.1:3000/car/${id}`,
    );
    return res.data;
  },

  async CreateCar(token: string, payload: any) {
    const res = await http.post(
      'http://127.0.0.1:3000/create-car',
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async UpdateCar(token: string, payload: any, id: string): Promise<CarInfo> {
    const res = await http.put(
      `http://127.0.0.1:3000/car-update/${id}`,
      { payload },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async AddCarComment(token: string, comment: any, id: string): Promise<CarInfo> {
    console.log(token);

    const res = await http.put(
      `http://127.0.0.1:3000/car-comment/${id}`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async DeleteCar(token: string, id: string): Promise<CarInfo> {
    const res = await http.delete(
      `http://127.0.0.1:3000/car-delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async CreateCarCheck(token: string, payload: any) {
    const res = await http.post(
      'http://127.0.0.1:3000/car-checks',
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async getCarChecks(token: string) {
    const res = await http.get(
      'http://127.0.0.1:3000/car-checks',
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async getOwnCarChecks(token: string, id: string) {
    const res = await http.get(
      `http://127.0.0.1:3000/car-checks-expert/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async deleteCarCheck(token: string, id: string) {
    const res = await http.delete(
      `http://127.0.0.1:3000/car-check-delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  async signCarCheck(id: string, checker: any, token: string) {
    const res = await http.put(
      `http://127.0.0.1:3000/car-check-sign/${id}`,
      checker,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },
};

export default CommonApi;
