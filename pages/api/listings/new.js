import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';
import API from '../../../helpers/api';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    const {title, location, price, currency, description} = req.body;

    const randomImage = await API.makeExternalRequest('get', 'https://api.unsplash.com/photos/random?client_id=aLDZsCgbAcUL9ig3bFoxD6Z5L0ZvaEYBvqOa4GFlUxw&query=artist,music,festival')

    logger.log(randomImage)
    const listingObject = {
      id: shortid.generate(),
      authorId: authenticatedUserId,
      description: description,
      title: title,
      location: location,
      image: randomImage.urls.small || 'https://source.unsplash.com/1600x900/?music,artist,festival',
      price: {
        amount: parseInt(price),
        currency: currency,
      },
    };

    await storage
      .get('listings')
      .push(listingObject)
      .write();

    let response = {
      status: 'ok',
      listing: listingObject,
    };

    return res.status(200).json(response);
  } catch (err) {
    logger.log('err', err);
    return res.status(400).json({
      error: err,
    });
  }
});
