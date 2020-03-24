const express = require("express");
const app = express();
const port = 3000;
var session = require("express-session");
const cors = require("cors");

//Cors setup
var whitelist = ["http://localhost:3001", "http://localhost:3001/"];
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "tomer",
    cookie: {
      path: "/",
      secure: false,
      httpOnly: false,
      maxAge: null,
      expires: null
    }
  })
);

// Access the session as req.session
app.get("/", function(req, res, next) {
  console.log(req.session);
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    // res.write('<p>views: ' + req.session.views + '</p>')
    // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.send(req.session);
  } else {
    req.session.views = 1;
    req.session.save();
    res.send("welcome to the session demo. refresh!");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
