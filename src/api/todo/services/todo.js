'use strict';

/**
 * todo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo.todo', {
  // async find(...args) {
  //   console.log({ ...args });
  //   // Calling the default core controller
  //   const { results, pagination } = await super.find({
  //     filters: { ...args[0], 'user.id': 6 },
  //     populate: { user: true }
  //   });

  //   // some custom logic
  //   results.forEach(result => {
  //     result.counter = 1;
  //   });

  //   return { results, pagination };
  // },
});

