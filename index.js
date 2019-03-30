const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const routes = require("./src/routes/userRoute");
const routes = require("./src/routes/userRoute");
// import routes from "./src/routes/userRoute"
const PORT =  process.env.PORT || 3000;
const app = express();


// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/SEdb',{
//      useNewUrlParser: true 
// });

app.use((req, res, next) => {
  console.log("use for mongoose callback");
  if (mongoose.connection.readyState) {
    console.log("if (mongoose.connection.readyState)");
    next();
  } else {
    console.log("else (mongoose.connection.readyState)");
    require("./mongo")().then(() => next());
    console.log("else (mongoose.connection.readyState)");
  }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


routes(app);

app.get('/',(req,res)=>
    res.send(`Node and express server is running on port ${PORT}`)
);
app.listen(PORT,()=>
    console.log(`Your server is running on port ${PORT}`)

);