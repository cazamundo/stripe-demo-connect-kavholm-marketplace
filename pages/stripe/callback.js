import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import {redirect} from '../../utils/redirect';
import API from '../../helpers/api';
import logger from '../../helpers/logger';

import Layout from '../../components/layout';

export default function AuthStripeCallback({isAuthenticated, userProfile}) {

  const [user, setUser] = useState();
  useEffect(() => {
    async function retrieveUser() {
      const req = await API.makeRequest('post', `/api/payouts/retrieve-user`);
      if (req && req.details_submitted) {
        return redirect('/dashboard/host');
      }
      setUser(req)
    }
    retrieveUser();
    
    // if ok do this:
  }, [])
  return <Layout
  isAuthenticated={isAuthenticated}
  userProfile={userProfile}
  title="Dashboard"
>
  <div className="sr-payment-summary payment-view">
    {!user && <h1 className="order-amount">Nice, je bent geregistreerd!</h1>}
    {user && <h1 className="order-amount">Er ging iets verkeerd tijdens je registratie</h1>}
    {/* <p className="order-amount">Vanaf nu kan je gemakkelijk betalingen ontvangen binnen het platform.</p>
    <p className="order-amount">Je kan alle betalingen opvolgen in het Stripe Dashboard, waar je ook je instellingen rond uitbetaling kan aanpassen.</p>
    <p>{`UserInfo: ${JSON.stringify(user)}`}</p>
    <button onClick={async () => {
        let req = await API.makeRequest('post', `/api/payouts/link`)
        window.open(req.url)
    }}>Check je laatste betalingen binnen Stripe</button> */}
  </div>        
  {/* <div className="">
    <img src="/static/loader.svg" className="loader" />
  </div> */}

  <style jsx>{`
    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -19px;
      margin-top: -19px;
    }
  `}</style>
</Layout>
};
