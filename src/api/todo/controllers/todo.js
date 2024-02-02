'use strict';

/**
 * todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', {

  async create(ctx) {
    try {
      await this.validateQuery(ctx);
      const userId = ctx.state.user.id;
      const data = { ...ctx.request.body['data'], user: userId };
      const results = await strapi.service('api::todo.todo').create({ data });
      return this.transformResponse(results);
    } catch (err) {
      ctx.response.body = err.details;
      ctx.response.status = err.name == 'ValidationError' ? 400 : 501;
      ctx.response.message = err.name;
      return ctx;
    }
  },
  async find(ctx) {
    try {
      await this.validateQuery(ctx);
      let sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const authUserId = ctx.state.user.id;
      sanitizedQueryParams = { ...sanitizedQueryParams };
      const { results, pagination } = await strapi.service('api::todo.todo').find(sanitizedQueryParams, authUserId);
      return this.transformResponse(results, { pagination });
    } catch (error) {
      ctx.response.body = { ...error.details, error: error.message };
      ctx.response.status = error.name == 'ValidationError' ? 400 : 501;
      ctx.response.message = error.name;
      return ctx;
    }
  },

  async update(ctx) {
    await this.validateQuery(ctx);
    let sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const userId = ctx.state.user.id;
    const todo = await strapi.service('api::todo.todo').findOne(ctx.params.id, { populate: { user: true } });
    if (!todo || todo.user.id !== userId)
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
