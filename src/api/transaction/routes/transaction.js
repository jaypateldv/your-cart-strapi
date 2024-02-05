module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/transaction',
     handler: 'transaction.orderTransaction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
