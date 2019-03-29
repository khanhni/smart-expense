const {signUp, logIn} = require("../controllers/userController");

const routes = (app)=>{
    app.route('/signup')
    .post(signUp)

    app.route('/login')
    .post(logIn);
};
module.exports = routes;
// export default routes;