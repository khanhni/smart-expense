const {signUp, logIn,updateProfile,createExpense, getExpenseByDate,updateExpense,overExpenseChecking} = require("../controllers/userController");

const routes = (app)=>{
    app.route('/signup')
    .post(signUp)

    app.route('/login')
    .post(logIn);

    app.route('/updateProfile/:userId')
    .put(updateProfile);

    app.route('/addExpense')
    .post(createExpense);

    app.route('/getExpenseByDate/:date')
    .post(getExpenseByDate);

    app.route('/updateExpense/:expenseId')
    .put(updateExpense);

    app.route('/expenseChecking')
    .post(overExpenseChecking);

};
module.exports= routes;