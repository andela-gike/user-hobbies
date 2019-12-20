import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import { hobbyRoute, indexRoute, userRoute } from './src/routes/indexRoute';
import { connectDb } from './src/services/mongoDBServices';

const port = 3001 || process.env.PORT;

const server = new Hapi.Server({
    host: 'localhost',
    port
});

const swaggerOptions: HapiSwagger.RegisterOptions = {
  basePath: '/api/v1/',
  documentationPath: '/docs',
  info: {
      title: 'User Hobbies API Documentation',
      version: '1.0.0'
  },
  pathPrefixSize: 3,
  sortEndpoints: 'ordered',
};

const plugins = {
  options: swaggerOptions,
  plugin: HapiSwagger
  };

// connect all Routes
server.route(indexRoute);
server.route(userRoute);
server.route(hobbyRoute);

const init = async () => {

  // Register plugins & Swagger
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
     plugins,
  ]);

  await server.start();
  // console.log('Server running on %s', server.info.uri);
  await connectDb();
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();

export default server;