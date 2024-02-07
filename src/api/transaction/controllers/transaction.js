

// @ts-ignore
const stripe = require('stripe')('sk_test_51KqWtBSEbbTKKbiiFK6Im4CdKvD6WTMjBGp0fwMifbNqakVlPBuN6BMTRkVBlfmbnoJQ62HliwOBy8QERn68uoyZ00t9bshuCW');
module.exports = {
  orderTransaction: async (ctx, next) => {
    try {
      let payload = ctx.request.body;
      const userId = ctx.state.user.id;
      const cart = await strapi.service('api::cart.cart').findOne(payload.cart, {
        populate: {
          user: true,
          cartItems: {
            populate: {
              product: {
                populate: {
                  image: true
                }
              }
            }
          }
        }
      });
      if (!cart || cart.user.id !== userId)
        return ctx.badRequest('cart not found');
      const line_items = payload['line_items'];
      payload = {
        ...payload, product: cart.cartItems,
        orderDateTime: new Date(),
        status: "PaymentPending",
        user: userId
      };
      delete payload.cart;
      delete payload['line_items'];
      const order = await strapi.service('api::order.order').create({
        data: payload
      });
      ctx.body = order;
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${process.env.REDIRECTION_URL}/payment/success?cart_id=${cart.id}&&order_id=${order.id}&&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.REDIRECTION_URL}/payment/cancel`,
      });
      ctx.body = {
        redirect: session.url, order, cart
      };
    } catch (err) {
      ctx.body = err;
    }
  },
  successTransaction: async (ctx, next) => {
    try {
      const userId = ctx.state.user.id;
      const orderId = ctx.request.query.order_id;
      const session_id = ctx.request.query.session_id;
      const cart_id = ctx.request.query.cart_id;
      const order = await strapi.service('api::order.order').findOne(orderId, { populate: { user: true } });
      const transaction = await stripe.checkout.sessions.retrieve(session_id);
      if (!order)
        return ctx.badRequest('order not found');
      const data = {
        ...order, transaction, status: "PaymentSuccess", estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      };
      const results = await strapi.service('api::order.order').update(orderId, { data });
      await strapi.service('api::cart.cart').delete(cart_id);
      ctx.body = results;
    } catch (error) {
      console.error(error);
    }
  }
};

