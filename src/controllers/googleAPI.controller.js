const {
  getAuthUrl,
  getTokenByCode,
  postEventByToken,
  getRefreshedToken,
} = require('../models/googleAPI.model');

exports.authUser = (req, res) => {
  const authUrl = getAuthUrl();
  res.send({ authUrl });
};

exports.addEvent = async (req, res) => {
  const { token, event } = req.body;

  try {
    const eventLink = await postEventByToken(token, event);
    res.send({ eventLink });
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).send({ err: 'Failed to add event' });
  }
};

exports.exchangeCodeForToken = async (req, res) => {
  const { code } = req.body;

  try {
    const tokens = await getTokenByCode(code);
    res.send({ tokens });
  } catch (err) {
    console.error('Error fetching tokens:', err);
    res.status(500).send({ err: 'Failed to fetch tokens' });
  }
};
