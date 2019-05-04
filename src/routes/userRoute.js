const {signUp, 
    logIn,
    updatePassword,
    createExpense, 
    getExpenseByDate,
    updateExpense,
    overExpenseChecking,
    expStatisticByMonth,
    monthlyStatistic,
    savingStatisticByMonth,
    checkExpenseExist,
    updateOthers} = require("../controllers/userController");

const routes = (app)=>{
    app.route('/signup')
    .post(signUp)

    app.route('/login')
    .post(logIn);

    app.route('/updatePassword/:userId')
    .put(updatePassword);

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

    app.route('/checkExpenseExist')
    .post(checkExpenseExist )

    app.route('/updateOthers/:userId')
    .put(updateOthers)
    
};
module.exports= routes;