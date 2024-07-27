// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { createTables } = require('./models/planModel.js');
const postgres = require('postgres');

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

(async () => {
    try {
        await createTables();
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
})();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});