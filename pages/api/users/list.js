import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  try {
    let users = storage
      .get('users')
      .find()
      .pick('userId', 'avatar', 'firstName', 'lastName', 'email')
      .value();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json(err);
  }
});
