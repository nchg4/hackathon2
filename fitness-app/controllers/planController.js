// controllers/planController.js
const db = require('../models/db.js');
const axios = require('axios');

const getHome = (req, res) => {
    res.render('index');
};

const postPlan = async (req, res) => {
    try {
        const { username, age, email, height, weight } = req.body;
        


        const [user] = await db('fitbuddyapp').insert({ username, age, email, height, weight }).returning('*');

        const workoutPlan = await axios.get('https://api.api-ninjas.com/v1/exercises', {
            headers: { 'X-Api-Key': '664J0MtC3mGQtoQaLtyrow==lNPdS1mGdGeOpOy4' }
        });

        const mealPlan = await axios.get('https://api.spoonacular.com/recipes/findByNutrients', {
            params: {
                apiKey: '0810b91538c94653abb64d29c22b2a75',
                minProtein: 10,
                maxProtein: 50,
                minCalories: 200,
                maxCalories: 300
            }
        });

        await db('plans').insert({
            user_id: user.id,
            workout_plan: JSON.stringify(workoutPlan.data),
            meal_plan: JSON.stringify(mealPlan.data)
        });

        res.render('plan', { workoutPlan: workoutPlan.data, mealPlan: mealPlan.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the plan' });
    }
};

module.exports = {
    getHome,
    postPlan,
};