// instances
import http from '@/instances/http';
import toFormData from '@/shared/helpers/to-form-data';
import CarInfo from '@/store/models/car-info';

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

  async uploadImage(id: string, data: any, token: string) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const res = await http.post(
      '/upload',
      toFormData(data),
      {
        headers,
      },
    );

    return res.data;
  },

  async uploadImages(id: string, data: any, token: string) {
    const headers = {
      'Content-Type': 'multipart/form-data',
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

  async getImages(id: string, filename: any, token: string) {
    const res = await http.get(`/files/${filename}`);
    return res.data;
  },

  async getImage(id: string, filename: any, token: string) {
    const res = await http.get(`/upload/${filename}`);
    return res.data;
  },

  async getOwnCars(token: string, id: string): Promise<CarInfo[]> {
    const res = await http.get(
      `http://127.0.0.1:3000/my-cars/${id}`,
    );
    return res.data;
  },

  async getCars(params: any): Promise<CarInfo[]> {
    const res = await http.get('http://127.0.0.1:3000/cars', {
      params,
    });
    return res.data;
  },

  async getCarsAvtovukyp(token: string): Promise<CarInfo[]> {
    const res = await http.get('http://127.0.0.1:3000/cars-avtovukyp');
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

  async getCarInfo(token: string, id: string) {
    const res = await http.get(
      `http://127.0.0.1:3000/car/${id}`,
    );
    return res.data;
  },

  async CreateCar(token: string, payload: any) {
    const res = await http.post(
      'http://127.0.0.1:3000/create-car',
      payload,
    );
    return res.data;
  },

  async UpdateCar(token: string, payload: any, id: string): Promise<CarInfo> {
    const res = await http.put(
      `http://127.0.0.1:3000/car-update/${id}`,
      { payload },
    );
    return res.data;
  },

  async AddCarComment(token: string, comment: any, id: string): Promise<CarInfo> {
    const res = await http.put(
      `http://127.0.0.1:3000/car-comment/${id}`,
      { comment },
    );
    return res.data;
  },

  async DeleteCar(token: string, id: string): Promise<CarInfo> {
    const res = await http.delete(
      `http://127.0.0.1:3000/car-delete/${id}`,
    );
    return res.data;
  },

  async CreateCarCheck(token: string, payload: any) {
    const res = await http.post(
      'http://127.0.0.1:3000/car-checks',
      payload,
    );
    return res.data;
  },

  async getCarChecks(params: any) {
    const res = await http.get('http://127.0.0.1:3000/car-checks');
    return res.data;
  },

  async getOwnCarChecks(id: string) {
    const res = await http.get(`http://127.0.0.1:3000/car-checks-expert/${id}`);
    return res.data;
  },

  async deleteCarCheck(id: string) {
    const res = await http.delete(`http://127.0.0.1:3000/car-check-delete/${id}`);
    return res.data;
  },

  async signCarCheck(id: string, checker: any, token: string) {
    const res = await http.put(
      `http://127.0.0.1:3000/car-check-sign/${id}`,
      checker,
    );
    return res.data;
  },
};

export default CommonApi;
