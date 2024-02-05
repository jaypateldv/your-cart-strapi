module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/transaction/pre-payment',
      handler: 'transaction.orderTransaction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/transaction/success',
      handler: 'transaction.successTransaction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
