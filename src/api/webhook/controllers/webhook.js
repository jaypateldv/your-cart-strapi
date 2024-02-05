'use strict';

// @ts-ignore
const stripe = require('stripe')('sk_test_51KqWtBSEbbTKKbiiFK6Im4CdKvD6WTMjBGp0fwMifbNqakVlPBuN6BMTRkVBlfmbnoJQ62HliwOBy8QERn68uoyZ00t9bshuCW');

/**
 * A set of functions called "actions" for `webhook`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      const endpointSecret = "whsec_bf0cd3c3bd6dd56a1d8abe514a0d21a5ae19f73e27e0b9aff9701e6de0ef4b7f";
      const sig = ctx.request.headers['stripe-signature'];
      const payload = ctx.request.body;
      let event;
      try {
        event = stripe.webhooks.constructEvent(ctx.request.body, sig, endpointSecret);
      } catch (err) {
        ctx.response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object;
          // Then define and call a function to handle the event checkout.session.async_payment_failed
          break;
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded = event.data.object;
          // Then define and call a function to handle the event checkout.session.async_payment_succeeded
          break;
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.completed
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};
