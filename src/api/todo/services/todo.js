'use strict';

/**
 * todo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo.todo', {
  async find(...args) {
    const { results, pagination } = await super.find({
      filters: args[0],
      populate: { user: true }
    });

    results.forEach(result => {
      result.counter = 1;
    });

    return { results, pagination };
  },

});

