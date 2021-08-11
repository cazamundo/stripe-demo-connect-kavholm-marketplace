import generateAccountLink from "../../../../helpers/generateAccountLink";

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

        try {
            // const {accountID} = req.session;
            const origin = `${req.secure ? "https://" : "https://"}${req.headers.host}`;
            
            const accountLinkURL = await generateAccountLink(userAccount.stripeAccountID, origin)
            res.redirect(accountLinkURL);
          } catch (err) {
            res.status(500).send({
              error: err.message
            });
          }

    } catch (err) {
        console.error(err);
        return res.redirect("/")
        // return res.status(400).json(err);
      }
    });