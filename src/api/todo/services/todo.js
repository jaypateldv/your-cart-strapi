'use strict';

/**
 * todo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo.todo', {
  async find(args, authUserId) {
    delete args.user;
    args.filters = {
      ...args.filters,
      user: { id: authUserId }
    };
    const { results, pagination } = await super.find(args);
    results.forEach(result => {
      result.counter = 1;
    });
    return { results, pagination };
  },

});

