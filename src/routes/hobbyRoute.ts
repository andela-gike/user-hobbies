import * as Joi from '@hapi/joi';
import { HobbyController } from '../controllers/hobbyController';

const hobby = new HobbyController();

const hobbyRoutes = [
  {
    method: 'GET',
    options: {
      // Swagger tags
      handler: hobby.getHobby,
      tags: ['api', 'hobbies', 'get'],
      validate: {
        params: Joi.object({
          id: Joi.string()
          .required()
          .description('The id of each hobby ')
        })
      },
    },
    path: '/api/v1/hobbies/{id}',
  },
  {
    method: 'POST',
    options: {
      // Swagger tags
      handler: hobby.addNewHobby,
      tags: ['api', 'hobbies', 'create'],
      validate: {
        payload: Joi.object({
          name: Joi.string()
          .required()
          .description('The Name for the Hobby item'),
          passionLevel: Joi.string().valid('Low', 'Medium', 'High', 'Very-High')
          .required()
          .description('The Passion Level for the user hobby'),
          userId: Joi.string()
          .required()
          .description('The User for the Hobby item'),
          year: Joi.number()
          .required()
          .min(1900)
          .max(2020)
          .description('The Year started for the user hobby'),
        })
      }
    },
    path: '/api/v1/hobbies',
  },
  {
    method: ['PUT', 'PATCH'],
    options: {
      // Swagger tags
      handler: hobby.updateHobby,
      tags: ['api', 'hobbies', 'update', 'modify'],
      validate: {
        params: Joi.object({
          id: Joi.string()
          .required()
          .description('The id for the Hobby item'),
        }),
        payload: Joi.object({
          name: Joi.string()
          .optional()
          .description('The new Name for the Hobby item'),
          passionLevel: Joi.string()
          .optional().valid('Low', 'Medium', 'High', 'Very-High')
          .description('The new Passion Level for the Hobby item'),
          year: Joi.number()
          .optional()
          .min(1900)
          .max(2020)
          .default(2019)
          .description('The new Year Since for the Hobby item'),
        })
      },
    },
    path: '/api/v1/hobbies/{id}',
  },
  {
    method: 'DELETE',
    options: {
      // Swagger tags
      handler: hobby.deleteHobby,
      tags: ['api', 'hobbies', 'delete'],
      validate: {
        params: Joi.object({
          id: Joi.string()
          .required()
          .description('The id for the Hobby item'),
        })
      },
    },
    path: '/api/v1/hobbies/{id}',
  },
];

export default hobbyRoutes;