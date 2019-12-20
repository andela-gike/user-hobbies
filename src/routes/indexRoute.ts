import hobby from './hobbyRoute';
import user from './userRoute';

export const indexRoute = [
  {
    handler: (req, reply) => reply.redirect('/docs'),
    method: 'GET',
    path: '/',
  },
  {
    handler: (req, reply) => reply.redirect('/docs'),
    method: 'GET',
    path: '/api/v1',
  }
];

export const userRoute  = user;
export const hobbyRoute = hobby;
export default {
  hobbyRoute,
  indexRoute,
  userRoute
}