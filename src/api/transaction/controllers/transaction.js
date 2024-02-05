

// @ts-ignore
const stripe = require('stripe')('sk_test_51KqWtBSEbbTKKbiiFK6Im4CdKvD6WTMjBGp0fwMifbNqakVlPBuN6BMTRkVBlfmbnoJQ62HliwOBy8QERn68uoyZ00t9bshuCW');
module.exports = {
  orderTransaction: async (ctx, next) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: ctx.request.body,
        mode: 'payment',
        success_url: `${process.env.REDIRECTION_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.REDIRECTION_URL}/payment/cancel`,
      });
      ctx.body = {
        redirect: session.url
      };
    } catch (err) {
      ctx.body = err;
    }
  }
};

