const createCarSchema = {
  description: 'Create a new car',
  tags: ['Cars'],
  body: {
    type: 'object',
    properties: {
      ownerId: { type: 'string' },
      carPicsPath: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      brand: { type: 'string' },
      model: { type: 'string' },
      price: { type: 'number' },
      volume: { type: 'number' },
      transmission: { type: 'string' },
      color: { type: 'string' },
      year: { type: 'number' },
      town: { type: 'string' },
      odometr: { type: 'number' },
      vincode: { type: 'string' },
      plates: { type: 'string' },
      description: { type: 'string' },
      comments: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      isAvtovukypSale: { type: 'boolean' },
      datePublication: { type: 'string', format: 'date-time' },
    },
    required: [
      'ownerId',
      'carPicsPath',
      'brand',
      'model',
      'price',
      'volume',
      'transmission',
      'color',
      'year',
      'town',
      'odometr',
      'vincode',
      'plates',
      'description',
      'comments',
      'isAvtovukypSale',
      'datePublication',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        ownerId: { type: 'string' },
        carPicsPath: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        brand: { type: 'string' },
        model: { type: 'string' },
        price: { type: 'number' },
        volume: { type: 'number' },
        transmission: { type: 'string' },
        color: { type: 'string' },
        year: { type: 'number' },
        town: { type: 'string' },
        odometr: { type: 'number' },
        vincode: { type: 'string' },
        plates: { type: 'string' },
        description: { type: 'string' },
        comments: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        isAvtovukypSale: { type: 'boolean' },
        datePublication: { type: 'string', format: 'date-time' },
      },
    },
  },
};

const getAllCarsSchema = {
  description: 'Get all cars',
  tags: ['Cars'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          ownerId: { type: 'string' },
          carPicsPath: {
            type: 'array',
            items: { type: 'string' },
          },
          brand: { type: 'string' },
          model: { type: 'string' },
          price: { type: 'number' },
          volume: { type: 'number' },
          transmission: { type: 'string' },
          color: { type: 'string' },
          year: { type: 'number' },
          town: { type: 'string' },
          odometr: { type: 'number' },
          vincode: { type: 'string' },
          plates: { type: 'string' },
          description: { type: 'string' },
          comments: {
            type: 'array',
            items: { type: 'string' },
          },
          isAvtovukypSale: { type: 'boolean' },
          datePublication: { type: 'string', format: 'date-time' },
        },
        required: [
          'id',
          'ownerId',
          'carPicsPath',
          'brand',
          'model',
          'price',
          'volume',
          'transmission',
          'color',
          'year',
          'town',
          'odometr',
          'vincode',
          'plates',
          'description',
          'comments',
          'isAvtovukypSale',
          'datePublication',
        ],
      },
    },
  },
};

const generateTokenSchema = {
  description: 'Generate token',
  tags: ['Authentication'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'User ID' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'Access token' },
        refreshToken: { type: 'string', description: 'Refresh token' },
      },
    },
  },
};

const validateTokenSchema = {
  description: 'Validate token',
  tags: ['Authentication'],
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'User name' },
        iat: { type: 'number', description: 'Issued At timestamp' },
      },
    },
  },
};

const refreshTokenSchema = {
  description: 'Refresh token',
  tags: ['Authentication'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string', description: 'Refresh token' },
    },
    required: ['refreshToken'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'Access token' },
        newRefreshToken: { type: 'string', description: 'New refresh token' },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Error message' },
      },
    },
  },
};

module.exports = {
  createCarSchema,
  getAllCarsSchema,
  generateTokenSchema,
  validateTokenSchema,
  refreshTokenSchema,
};
