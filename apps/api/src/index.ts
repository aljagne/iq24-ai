// apps/api/src/index.ts
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());

// Basic route
app.get('/', (c) => {
  return c.json({ message: 'IQ24 API is running!' });
});

// Health check route
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const port = parseInt(process.env.PORT || '3001', 10);
console.log(`🚀 API server listening on port ${port}`);

export default {
  port: port,
  fetch: app.fetch,
};
