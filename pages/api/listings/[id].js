import storage from '../../../helpers/storage';
import API from '../../../helpers/api';

export default async (req, res) => {
  let id = req.query.id;

  try {
    let listingRaw = storage
      .get('listings')
      .find({id: id})
      .value();

    let listing = {...listingRaw};

    const fee = Math.ceil(listing.price.amount * 0.04);

    let lineItems = [
      {item: 'Invoice price', amount: listing.price.amount},
      {
        item: 'Platform fees (4%)',
        amount: fee,
      },
    ];

    let totalAmount = lineItems
      .map((a) => a.amount)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    listing.lineItems = lineItems;
    listing.totalAmount = totalAmount;
    listing.fee = fee

    if (listing.authorId) {
      try {
        let author = await API.makeRequest(
          'get',
          `/api/users/userInfo?id=${listing.authorId}`,
        );
        listing.author = author;
      } catch {}
    }

    return res.status(200).json(listing);
  } catch (err) {
    return res.status(400).json(err);
  }
};
