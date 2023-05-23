const mongoose = require('mongoose');

// models
const {
  generateTokenSchema,
  validateTokenSchema,
  refreshTokenSchema,
} = require('./fastify-models/models');
const {
  getCarSchema,
  getAllCarsSchema,
  createCarSchema,
  updateCarSchema,
} = require('./fastify-models/car-model');

const CarModel = require('./models/car');

const connectionString = 'mongodb://127.0.0.1:27017/vroomvroom';

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    // You can start performing database operations here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const start = async () => {
  const fastify = require('fastify')();

  fastify.register(require('@fastify/jwt'), {
    secret: 'mysecret',
  });

  await fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    exposeHeadRoute: false,
    swagger: {
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  });

  fastify.register(require('@fastify/swagger-ui'), {});

  fastify.decorate('authenticate', async function (req, reply) {
    try {
      await req.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get(
    '/cars',
    {
      schema: getAllCarsSchema,
    },
    (req, reply) => {
      CarModel.find()
        .lean()
        .select(
          'ownerId carPicsPath brand model price volume transmission color year town odometr vincode plates description comments isAvtovukypSale datePublication'
        )
        .then((result) => {
          reply.send(result);
        })
        .catch((error) => {
          reply.send(error);
        });
    }
  );

  fastify.get(
    '/car/:id',
    {
      schema: getCarSchema,
    },
    (req, reply) => {
      const id = req.params.id;

      CarModel.findOne({ _id: id })
        .lean()
        .select(
          'ownerId carPicsPath brand model price volume transmission color year town odometr vincode plates description comments isAvtovukypSale datePublication'
        )
        .then((result) => {
          reply.send(result);
        })
        .catch((err) => {
          return err;
        });
    }
  );

  fastify.post(
    '/car',
    {
      schema: createCarSchema,
    },
    (req, reply) => {
      const {
        ownerId,
        carPicsPath,
        brand,
        model,
        price,
        volume,
        transmission,
        color,
        year,
        town,
        odometr,
        vincode,
        plates,
        description,
        comments,
        isAvtovukypSale,
        datePublication,
      } = req.body;

      const car = new CarModel({
        ownerId,
        carPicsPath,
        brand,
        model,
        price,
        volume,
        transmission,
        color,
        year,
        town,
        odometr,
        vincode,
        plates,
        description,
        comments,
        isAvtovukypSale,
        datePublication,
      });

      car
        .save()
        .then(() => {
          console.log(car.plates + ' save to collection');
        })
        .catch((error) => {
          return console.error(error);
        });
      reply.code(201).send(car);
    }
  );

  fastify.put(
    '/car-update/:id',
    { schema: updateCarSchema },
    async (req, reply) => {
      const id = req.params.id;
      const {
        carPicsPath,
        brand,
        model,
        price,
        volume,
        transmission,
        color,
        year,
        odometr,
        vincode,
        plates,
        description,
      } = req.body;

      try {
        const car = await CarModel.findOneAndUpdate(
          { _id: id },
          {
            carPicsPath: carPicsPath,
            brand: brand,
            model: model,
            price: price,
            volume,
            transmission,
            color,
            year,
            odometr,
            vincode,
            plates,
            description,
          },
          { new: true }
        );

        console.log(car);

        if (!car) {
          return reply.status(404).send({ message: 'Car not found' });
        }

        return reply.send(car);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );

  fastify.get(
    '/generateToken/:id',
    {
      schema: generateTokenSchema,
    },
    (req, reply) => {
      const data = {
        name: req.params.id,
      };

      const token = fastify.jwt.sign(data);
      const refreshToken = fastify.jwt.sign(data, { expiresIn: '7d' });
      reply.send({ token, refreshToken });
    }
  );

  fastify.get(
    '/validateToken',
    {
      onRequest: [fastify.authenticate],
      schema: validateTokenSchema,
    },
    async function (req, reply) {
      return req.user;
    }
  );

  fastify.post(
    '/refresh-token',
    {
      schema: refreshTokenSchema,
    },
    async (req, reply) => {
      const { refreshToken } = req.body;

      try {
        // Проверяем валидность refreshToken
        const decoded = await fastify.jwt.verify(refreshToken);

        // Генерируем новый токен доступа
        const token = fastify.jwt.sign({ username: decoded.username });
        const newRefreshToken = fastify.jwt.sign(
          { username: decoded.username },
          { expiresIn: '7d' }
        );

        reply.send({ token, newRefreshToken });
      } catch (err) {
        reply
          .status(401)
          .send({ message: 'Неверный или истекший токен обновления' });
      }
    }
  );

  fastify.get(
    '/home',
    {
      onRequest: [fastify.authenticate],
    },
    async function (req, reply) {
      return reply.send('in home');
    }
  );

  fastify.listen({ port: 3000 }, (error) => {
    if (error) {
      throw error;
    } else {
      console.log('Server is running on port 3000');
    }
  });
};

start();
