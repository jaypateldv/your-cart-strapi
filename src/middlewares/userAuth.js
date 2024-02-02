'use strict';

/**
 * `userAuth` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
      if (ctx.request.url.startsWith('/api') && !ctx.request.url.startsWith('/api/auth/local')) {
        const authorizationHeader = ctx.request.headers.authorization.split(' ')[1];
        if (!authorizationHeader) {
          return ctx.unauthorized('User not authenticated');
        }
        const token = authorizationHeader.replace('Bearer ', '');
        const decodedToken = strapi.plugins['users-permissions'].services.jwt.verify(token);
        ctx.state.user = decodedToken;
        strapi.log.info('Authenticated user:', ctx.state.user.id);
      }

      // Continue with the next middleware or controller
      await next();
    } catch (error) {
      // Handle authentication error
      strapi.log.error('Authentication error:', error.message);
      return ctx.unauthorized('Invalid token');
    }
  };
};
