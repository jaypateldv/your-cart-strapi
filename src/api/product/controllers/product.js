'use strict';

/**
 * product controller
 */
const path = require('path');
const fs = require('fs');
const { parseMultipartData } = require('@strapi/utils');
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::product.product', {
  async addBulkProducts(ctx) {
    try {
      let entity;
      debugger;
      const filePath = path.resolve(__dirname, '../../../../data.json'); // Adjust the path based on your project structure
      const unparse = fs.readFileSync(filePath, 'utf8');
      const p = JSON.parse(unparse);
      let i = 0;
      for (const product of p) {
        const results = await strapi.service('api::product.product').create({ data: product });
        i++;
        console.log("res", i);
      }
      ctx.body = 'ok';
    } catch (error) {
      ctx.response.body = error.details;
      ctx.response.status = error.name == 'ValidationError' ? 400 : 501;
      ctx.response.message = error.name;
      return ctx;
    }
  }
});
