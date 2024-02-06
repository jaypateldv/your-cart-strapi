'use strict';

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order.order', {
  async find(args, authUserId) {
    console.log("order",args);
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
