/* eslint-disable no-undef */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CommonApi from '@/api/common.api';

describe('CommonApi', () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('should retrieve car checks', async () => {
    const expectedData = [];

    mockAxios.onGet('http://127.0.0.1:3000/car-checks').reply(200, expectedData);

    const carChecks = await CommonApi.getCarChecks();

    expect(carChecks).toEqual(expectedData);
  });

  it('should retrieve car models', async () => {
    const brand = 'Toyota';
    const expectedData = {
      _id: '64726aaa9cf75853200b1f04',
      models: [
        {
          text: 'Corolla',
          value: 'Corolla',
        },
        {
          text: 'Camry',
          value: 'Camry',
        },
        {
          text: 'Rav4',
          value: 'Rav4',
        },
        {
          text: 'Prius',
          value: 'Prius',
        },
        {
          text: 'Highlander',
          value: 'Highlander',
        },
        {
          text: 'Land Cruiser',
          value: 'Land Cruiser',
        },
        {
          text: 'Yaris',
          value: 'Yaris',
        },
        {
          text: 'C-HR',
          value: 'C-HR',
        },
        {
          text: 'Supra',
          value: 'Supra',
        },
        {
          text: 'Sienna',
          value: 'Sienna',
        },
        {
          text: 'Tacoma',
          value: 'Tacoma',
        },
        {
          text: 'Tundra',
          value: 'Tundra',
        },
      ],
    };

    mockAxios.onGet(`http://127.0.0.1:3000/models/${brand}`).reply(200, expectedData);

    const carModels = await CommonApi.getModels(brand);

    expect(carModels).toEqual(expectedData);
  });

  // Write more test cases for other functions in CommonApi
});
