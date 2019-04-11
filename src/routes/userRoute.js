const {signUp, logIn,updateProfile,createExpense} = require("../controllers/userController");

const routes = (app)=>{
    app.route('/signup')
    .post(signUp)

    app.route('/login')
    .post(logIn);

    app.route('/updateProfile/:userId')
    .put(updateProfile);

    app.route('/addExpense')
    .post(createExpense);
};
module.exports= routes;