import * as Hapi from '@hapi/hapi';
import { connectDb } from './src/services/mongoDBServices';

const port = 3001 || process.env.PORT;

const server = Hapi.server({
    host: 'localhost',
    port
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request: Request, h: Response) => {
      return 'Hello World!';
  }
});

const init = async () => {
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