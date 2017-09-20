import config from '../../config';

const allowCrossDomain = (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', config.domain);
  res.header('Access-Control-Allow-Origin', config.domain);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Cache-Control', 'no-cache');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

module.exports = allowCrossDomain;

