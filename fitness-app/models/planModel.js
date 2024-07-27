// models/planModel.js
const db = require('./db.js');

const createTables = async () => {
    await db.schema.dropTableIfExists('fitbuddyapp');
    await db.schema.createTable('fitbuddyapp', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('age');
        table.string('email');
        table.integer('height');
        table.integer('weight');
    });

    await db.schema.dropTableIfExists('plans');
    await db.schema.createTable('plans', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('fitbuddyapp');
        table.json('workout_plan');
        table.json('meal_plan');
        table.timestamps(true, true);
    });
};

module.exports = {
    createTables,
};