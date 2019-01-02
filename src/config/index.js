module.exports = {
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/idk-crm',
  CLIENT_URLS: ['http://localhost:3000', 'https://pms-aaa-client.herokuapp.com'],
  JWT_SECRET: process.env.JWT_SECRET || '0000000000000000'
};
