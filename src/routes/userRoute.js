const {signUp, 
    logIn,
    updateProfile,
    createExpense, 
    getExpenseByDate,
    updateExpense,
    overExpenseChecking,
    expStatisticByMonth,
    monthlyStatistic,
    savingStatisticByMonth} = require("../controllers/userController");

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

    app.route('/monthlyStatistic')
    .post(monthlyStatistic);

    app.route('/statisticByMonth')
    .post(expStatisticByMonth)

    app.route('/savingStatistic')
    .post(savingStatisticByMonth)
    
};
module.exports= routes;