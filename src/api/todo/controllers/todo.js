'use strict';

/**
 * todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', {

  async create(ctx) {
    await this.validateQuery(ctx);
    console.log(ctx.request.body);
    let sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const userId = ctx.state.user.id;
    const data = { ...ctx.request.body['data'], user: userId };
    const results = await strapi.service('api::todo.todo').create({ data });
    return this.transformResponse(results);
  },
  async find(ctx) {
    await this.validateQuery(ctx);
    let sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const userId = ctx.state.user.id;
    sanitizedQueryParams = { ...sanitizedQueryParams, user: { id: userId } };
    const { results, pagination } = await strapi.service('api::todo.todo').find(sanitizedQueryParams);
    return this.transformResponse(results, { pagination });
  },

  async update(ctx) {
    await this.validateQuery(ctx);
    let sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const userId = ctx.state.user.id;
    const todo = await strapi.service('api::todo.todo').findOne(ctx.params.id, { populate: { user: true } });
    if (todo.user.id !== userId)
      return ctx.badRequest('Todo not found to update');
    sanitizedQueryParams = { ...sanitizedQueryParams, user: { id: userId } };
    const results = await strapi.service('api::todo.todo').update(ctx.params.id, ctx.request.body);
    return this.transformResponse(results);
  },

  async delete(ctx) {
    await this.validateQuery(ctx);
    let sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const userId = ctx.state.user.id;
    const todo = await strapi.service('api::todo.todo').findOne(ctx.params.id, { populate: { user: true } });
    if (todo.user.id !== userId)
      return ctx.badRequest('Todo not found to update');
    sanitizedQueryParams = { ...sanitizedQueryParams, user: { id: userId } };
    const results = await strapi.service('api::todo.todo').delete(ctx.params.id);
    return this.transformResponse(results);
  }


});
