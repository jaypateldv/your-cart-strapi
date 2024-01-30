'use strict';

/**
 * `userAuth` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
      console.log("CTX", ctx.request.url);
      // if (ctx.request.url.startsWith('/admin') || ctx.request.url.startsWith('/favicon')){
      //   // return await next();
      // }
      // Check if the request has an Authorization header
      if (ctx.request.url.startsWith('/api') && !ctx.request.url.startsWith('/api/auth/local')) {
        const authorizationHeader = ctx.request.headers.authorization.split(' ')[1];
        if (!authorizationHeader) {
          // If no Authorization header, user is not authenticated
          return ctx.unauthorized('User not authenticated');
        }
        console.log("######test");
        // Extract the token from the Authorization header
        const token = authorizationHeader.replace('Bearer ', '');

        // Verify the token (you may need to use a library like jsonwebtoken)
        const decodedToken = strapi.plugins['users-permissions'].services.jwt.verify(token);

        // Attach the user information to the context state
        ctx.state.user = decodedToken;

        // Log user information (optional)
        strapi.log.info('Authenticated user:', ctx.state.user);
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
