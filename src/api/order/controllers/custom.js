const { createCoreController } = require("@strapi/strapi").factories;
const https = require('https');
const PaytmChecksum = require('paytmchecksum');
const { env } = require("process");

module.exports = createCoreController(
  "api::order.order",
  ({ strapi }) => ({

    async exampleAction(ctx) {
      /*
      * import checksum generation utility
      * You can get this utility from https://developer.paytm.com/docs/checksum/
      */

      var paytmParams = {};

      paytmParams.body = {
        "requestType": "Payment",
        "mid": process.env.MID,
        "websiteName": "YOUR_WEBSITE_NAME",
        "orderId": "ORDERID_98765",
        "callbackUrl": "https://localhost:1337/api/orders/posttransaction",
        "txnAmount": {
          "value": "1.00",
          "currency": "INR",
        },
        "userInfo": {
          "custId": "CUST_001",
        },
      };


      /*
      * Generate checksum by parameters we have in body
      * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
      */
      const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.M_KEY);

      paytmParams.head = {
        "signature": checksum
      };
      const getToken = async () => {
        return new Promise((resolve, reject) => {

          var post_data = JSON.stringify(paytmParams);

          var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${env('MID')}&orderId=ORDERID_98765`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
            }
          };

          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
              response += chunk;
            });

            post_res.on('end', function () {
              console.log('Response: ', response);
              resolve(response);
            });
          });

          post_req.write(post_data);
          post_req.end();
        });
      };

      let myResponse = await getToken();
      ctx.body = myResponse;
    },
  })
);
