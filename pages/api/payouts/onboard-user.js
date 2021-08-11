// import getHost from '../../../utils/get-host';
import storage from '../../../helpers/storage';
// const querystring = require('querystring');
// const env = require('dotenv').config({path: './.env'});
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import generateAccountLink from '../../../helpers/generateAccountLink';
// import getConfig from 'next/config';
import stripe from '../../../helpers/stripe';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;
  
  try {
    let userAccount = storage
      .get('users')
      .find({userId: authenticatedUserId})
      .value();

      if (!userAccount) {
        throw new Error(`User with id ${authenticatedUserId} does not exist in users db`)  
      }

    // let clientId = process.env.STRIPE_CLIENT_ID;

    // Pass UserAccount info along to Stripe
    // JDI: seems not possible in new API?
    // let userEmail = userAccount.email;
    // let userFirstName = userAccount.firstName;
    // let userLastName = userAccount.lastName;

    // const redirect_uri = getHost(req) + '/stripe/callback';

    // let stripeConnectParams = {
    //   response_type: 'code',
    //   redirect_uri: redirect_uri,
    //   client_id: clientId,
    //   scope: 'read_write',
    //   'stripe_user[email]': userEmail,
    //   'stripe_user[first_name]': userFirstName,
    //   'stripe_user[last_name]': userLastName,
    //   'stripe_user[business_type]': 'individual',
    //   'stripe_user[country]': 'US',
    // };

    // let reqQuery = querystring.stringify(stripeConnectParams);

    // const location = `https://connect.stripe.com/express/oauth/authorize?${reqQuery}`;

    // new
    try {
        const account = await stripe.accounts.create({type: "express"});
        // req.session.accountID = account.id;
    
        // assign accountId to the user
        storage
        .get('users')
        .find({userId: authenticatedUserId})
        .assign({
          stripeAccountID: account.id,
        })
        .write();

        const origin = `${req.headers.origin}`;
        const accountLinkURL = await generateAccountLink(account.id, origin);
        res.send({location: accountLinkURL});
      } catch (err) {
        console.error(err)
        res.status(500).send({
          error: err.message
        });
      }

    // old
    // return res.status(200).json({
    //   location: location,
    // });
  } catch (err) {
    return res.status(400).json(err);
  }
});