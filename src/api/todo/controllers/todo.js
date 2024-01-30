'use strict';

/**
 * todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', {

  // async find(ctx) {
  //   await this.validateQuery(ctx);
  //   let sanitizedQueryParams = await this.sanitizeQuery(ctx);
  //   const userId = ctx.state.user.id;
  //   sanitizedQueryParams = { ...sanitizedQueryParams, 'user.id': userId };
  //   const { results, pagination } = await strapi.service('api::todo.todo').find(sanitizedQueryParams);
  //   // console.log("res", results, pagination);
  //   return this.transformResponse(results, { pagination });
  // }

});
