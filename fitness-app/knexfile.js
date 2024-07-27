require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.query('SET ssl=true;', err => {
          done(err, conn);
        });
      }
    },
    migrations: {
      directory: './migrations',
    },
  },
};