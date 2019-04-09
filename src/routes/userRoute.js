const {signUp, logIn,updateProfile} = require("../controllers/userController");

const routes = (app)=>{
    app.route('/signup')
    .post(signUp)

    app.route('/login')
    .post(logIn);

    app.route('/updateProfile/:userId')
    .put(updateProfile);
};
module.exports= routes;