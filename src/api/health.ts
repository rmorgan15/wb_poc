import { FastifyInstance } from 'fastify';

export async function healthRoutes(server: FastifyInstance) {
  server.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });
}

