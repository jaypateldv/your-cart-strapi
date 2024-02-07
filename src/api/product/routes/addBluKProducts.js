module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/addBulkProduct',
     handler: 'product.addBulkProducts',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
