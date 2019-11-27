import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;
  let listingId = req.query.listingId;

  // TODO: Does the authenticated user have permissions to read transactions for listing?

  try {
    let transactions = storage
      .get('transactions')
      .filter({listingId: listingId})
      .value();

    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(400).json(err);
  }
});
