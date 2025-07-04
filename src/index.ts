import Fastify from 'fastify';
import dotenv from 'dotenv';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { healthRoutes } from './api/health';
import { prisma } from './lib/prisma';

// Load environment variables
dotenv.config();

const server = Fastify({
  logger: true,
});

const start = async () => {
  // Register Swagger
  await server.register(swagger, {
    swagger: {
      info: {
        title: 'My API',
        description: 'API documentation for my Fastify web server.',
        version: '0.1.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: '/documentation',
  });

  // Register routes
  server.register(healthRoutes, { prefix: '/api' });

  try {
    const port = Number(process.env.SERVER_PORT) || 3000;
    await server.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();

