const Config = {
  url: process.env.DB_URL || 'mongodb://localhost/wetest',
  user: process.env.DB_USER || 'root',
  pass: process.env.DB_PASS || 'mdb1',
  timeout: 30000,
};

module.exports = Config;
