// instances
import http from '@/instances/http';
import CarAction from '@/store/models/car-action';

// models
const CarActionsApi = {
  async getCarActions(vin: string): Promise<CarAction[]> {
    const res = await http.get(`/car-actions/${vin}`);
    return res.data;
  },

};

export default CarActionsApi;
