
module.exports = ({ env }) => ({
  'users-permissions': {
    // ...
    jwt: {
      // ...
      expiresIn: '7d', // Updated to 7 days
    },
  },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  },
});
