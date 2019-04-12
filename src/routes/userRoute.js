const {signUp, logIn,updateProfile,createExpense, getExpenseByDate} = require("../controllers/userController");

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
    .get(getExpenseByDate);
};
module.exports= routes;