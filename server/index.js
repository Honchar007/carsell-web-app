const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// models
const {
  generateTokenSchema,
  validateTokenSchema,
  refreshTokenSchema,
  UserLoginSchema,
  UserSignupSchema,
  UserSchema,
  getUserSchema,
} = require('./fastify-models/models');

const {
  getCarSchema,
  getAllCarsSchema,
  createCarSchema,
  updateCarSchema,
  deleteCarSchema,
} = require('./fastify-models/car-model');

const {
  CarCheckSchema,
  getAllCarCheckSchema,
  getCarCheckSchema,
  updateCarCheckSchema,
  createCarCheckSchema,
  deleteCarCheckSchema,
} = require('./fastify-models/car-check-model');

const CarModel = require('./models/car');
const CarCheckModel = require('./models/car-check');
const UserModel = require('./models/user');

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

  fastify.register(require('@fastify/cors'), {
    origin: ['http://172.20.10.2:8080', 'http://192.168.1.3:8080'],
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
          'id ownerId carPicsPath brand model price volume transmission color year town odometr vincode plates description comments isAvtovukypSale datePublication'
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

  fastify.delete(
    '/car-delete/:id',
    {
      schema: deleteCarSchema,
    },
    async (req, reply) => {
      const id = req.params.id;

      try {
        const car = await CarModel.findByIdAndDelete(id);

        if (!car) {
          return reply.status(404).send({ message: 'Car not found' });
        }

        return reply.send({ message: 'Car deleted successfully' });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );

  fastify.get(
    '/car-checks',
    {
      schema: getAllCarCheckSchema,
    },
    (req, reply) => {
      CarCheckModel.find({ 'checker.checkerId': '' })
        .lean()
        .select(
          'brand model town link wantToCheckId firstName phone email checker'
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
    '/car-checks-expert/:id',
    {
      schema: getAllCarCheckSchema,
    },
    (req, reply) => {
      const id = req.params.id;

      CarCheckModel.find({ 'checker.checkerId': id })
        .lean()
        .select(
          'brand model town link wantToCheckId firstName phone email checker'
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
    '/car-checks-own/:id',
    {
      schema: getAllCarCheckSchema,
    },
    (req, reply) => {
      const id = req.params.id;
      CarCheckModel.find({ wantToCheckId: id })
        .lean()
        .select(
          'brand model town link wantToCheckId firstName phone email checker'
        )
        .then((result) => {
          reply.send(result);
        })
        .catch((error) => {
          reply.send(error);
        });
    }
  );

  fastify.post(
    '/car-checks',
    {
      schema: createCarCheckSchema,
    },
    async (req, reply) => {
      const {
        brand,
        model,
        town,
        link,
        wantToCheckId,
        firstName,
        phone,
        email,
        checker,
      } = req.body;

      try {
        const carCheck = new CarCheckModel({
          brand,
          model,
          town,
          link,
          wantToCheckId,
          firstName,
          phone,
          email,
          checker,
        });

        await carCheck.save();
        console.log(`${brand} ${model} car check saved to collection`);

        reply.code(201).send(carCheck);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );

  fastify.put(
    '/car-check-sign/:id',
    { schema: updateCarCheckSchema },
    async (req, reply) => {
      const id = req.params.id;
      const { checker } = req.body;

      try {
        const carCheck = await CarCheckModel.findOneAndUpdate(
          { _id: id },
          {
            checker,
          },
          { new: true }
        );
        console.log(carCheck);
        if (!carCheck) {
          return reply.status(404).send({ message: 'Car check not found' });
        }

        return reply.send(carCheck);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );

  fastify.delete(
    '/car-check-delete/:id',
    {
      schema: deleteCarCheckSchema,
    },
    async (req, reply) => {
      const id = req.params.id;

      try {
        const carCheck = await CarCheckModel.findByIdAndDelete(id);

        if (!carCheck) {
          return reply.status(404).send({ message: 'Car check not found' });
        }

        return reply.send({ message: 'Car check deleted successfully' });
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
    '/user/:email',
    {
      schema: getUserSchema,
    },
    (req, reply) => {
      const email = req.params.email;

      UserModel.findOne({ email: email })
        .lean()
        .select('id avatarPath firstName secondName dateRegistration email phone isAvtovukyp isExpert password')
        .then((result) => {
          console.log(result);
          reply.send(result);
        })
        .catch((err) => {
          return err;
        });
    }
  );

  fastify.post(
    '/login',
    {
      schema: UserLoginSchema,
    },
    async (req, reply) => {
      const { email, password } = req.body;

      const data = {
        email,
      };

      const user = await UserModel.findOne({ email });

      if (!user) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password stored in the user object
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }

      const token = fastify.jwt.sign(data);
      const refreshToken = fastify.jwt.sign(data, { expiresIn: '7d' });
      reply.send({ token, refreshToken });
    }
  );

  fastify.post('/signup', { schema: UserSignupSchema }, async (req, reply) => {
    const {
      avatarPath,
      firstName,
      secondName,
      email,
      phone,
      isAvtovukyp,
      isExpert,
      password,
    } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return reply
        .status(409)
        .send({ message: 'User with the provided email already exists' });
    }

    // Create a new user
    const newUser = new UserModel({
      avatarPath,
      firstName,
      secondName,
      dateRegistration: new Date(),
      email,
      phone,
      isAvtovukyp,
      isExpert,
      password,
    });

    try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;

      // Save the user to the database
      await newUser.save();

      reply.code(201).send({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Internal Server Error' });
    }
  });

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
