import stripe from "./stripe";

export default function generateAccountLink(accountID, origin) {
    return stripe.accountLinks.create({
      type: "account_onboarding",
      account: accountID,
      refresh_url: `${origin}/onboard-user/refresh`,
    //   TODO change success url
    //   return_url: `${origin}/success.html`,
      return_url: `${origin}/stripe/callback`,
    }).then((link) => link.url);
  }