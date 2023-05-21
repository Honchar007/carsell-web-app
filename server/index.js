const fastify = require('fastify')();
fastify.register(require('@fastify/jwt'), {
  secret: 'mysecret',
});

fastify.decorate('authenticate', async function(req, reply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

fastify.get('/generateToken/:id', (req, reply) => {
  const data = {
    name: req.params.id,
  };

  const token = fastify.jwt.sign(data);
  const refreshToken = fastify.jwt.sign(data, { expiresIn: '7d' });
  reply.send({token, refreshToken});
});

fastify.get('/validateToken', {
    onRequest: [fastify.authenticate],
  }, async function(req, reply) {
    return req.user;
});

fastify.get('/home', {
  onRequest: [fastify.authenticate],
},async function(req, reply) {
  return reply.send("in home");
});

fastify.post('/refresh-token', async (req, reply) => {
  const { refreshToken } = req.body;

  try {
    // Проверяем валидность refreshToken
    const decoded = await fastify.jwt.verify(refreshToken);

    // Генерируем новый токен доступа
    const token = fastify.jwt.sign({ username: decoded.username });
    const newRefreshToken = fastify.jwt.sign({ username: decoded.username }, { expiresIn: '7d' });

    reply.send({ token, newRefreshToken });
  } catch (err) {
    reply.status(401).send({ message: 'Неверный или истекший токен обновления' });
  }
});

fastify.listen({port: 3000}, error => {
  if(error) {
    throw error;
  } else {
    console.log('Server is running on port 3000');
  }
});
