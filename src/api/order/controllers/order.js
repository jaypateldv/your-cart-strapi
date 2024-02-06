'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', {
  async find(ctx) {
    try {
      await this.validateQuery(ctx);
      let sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const authUserId = ctx.state.user.id;
      sanitizedQueryParams = { ...sanitizedQueryParams };
      const { results, pagination } = await strapi.service('api::order.order').find(sanitizedQueryParams, authUserId);
      return this.transformResponse(results, { pagination });
    } catch (error) {
      ctx.response.body = { ...error.details, error: error.message };
      ctx.response.status = error.name == 'ValidationError' ? 400 : 501;
      ctx.response.message = error.name;
      return ctx;
    }
  },
});
