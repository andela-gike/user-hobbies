import * as Joi from '@hapi/joi';
import { UserController } from '../controllers/userController';

const user = new UserController();
const userRoutes = [
  {
    method: 'GET',
    options: {
      // Swagger tags
      handler: user.getUsers,
      tags: ['api', 'users', 'get'],
      validate: {
        query: Joi.object({
          lim: Joi.number()
            .optional()
            .default(30)
            .description('The count/limit to query params'),
          off: Joi.number()
            .optional()
            .default(0)
            .description('The offset to query params'),
        }),
      },
    },
    path: '/api/v1/users',
  },
  {
    method: 'POST',
    options: {
      // Swagger tags
      handler: user.addNewUser,
      tags: ['api', 'users', 'create'],
      validate: {
        payload: Joi.object({
          name: Joi.string().required().min(2)
            .description('The name of each user'),
        }),
      },
    },
    path: '/api/v1/users',
  },
  {
    method: ['PUT', 'PATCH'],
    options: {
      // Swagger tags
      handler: user.updateUser,
      tags: ['api', 'users', 'update', 'modify'],
      validate: {
        params: Joi.object({
          userId: Joi.string()
            .required()
            .description('The id of each user'),
        }),
        payload: Joi.object({
          name: Joi.string()
            .optional()
            .description('The name of each user'),
        }),
      },
    },
    path: '/api/v1/users/{userId}',
  },
  {
    method: 'DELETE',
    options: {
      // Swagger tags
      handler: user.deleteUser,
      tags: ['api', 'users', 'delete'],
      validate: {
        params: Joi.object({
          userId: Joi.string()
            .required()
            .description('The id of each user'),
        }),
      },
    },
    path: '/api/v1/users/{userId}',
  },
  {
    method: ['GET', 'OPTIONS'],
    options: {
      // Swagger tags
      handler: user.getUserHobbies,
      tags: ['api', 'users', 'list', 'hobbies'],
      validate: {
        params: Joi.object({
          userId: Joi.string()
            .required()
            .description('The id of each user'),
        }),
      },
    },
    path: '/api/v1/users/{userId}/hobbies',
  },
  {
    method: ['GET', 'OPTIONS'],
    options: {
      // Swagger tags
      handler: user.getUserWithID,
      tags: ['api', 'users', 'list', 'hobbies'],
      validate: {
        params: Joi.object({
          userId: Joi.string()
            .required()
            .description('The id of each user'),
        }),
      },
    },
    path: '/api/v1/users/{userId}',
  },
];

export default userRoutes;
