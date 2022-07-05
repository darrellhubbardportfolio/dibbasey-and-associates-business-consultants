require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const cookie = require("cookie-parser");
const passport = require("passport");

// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*
app.set("view engine", "ejs");
*/

app.use(cookie());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

// express static files
app.use('/views', express.static(path.join(__dirname, 'views')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/Passport Strategy', express.static(path.join(__dirname, 'Passport Strategy')))

// passport 
app.use(passport.initialize());
app.use(passport.session());

// signup page
app.get("/signup", function (req, res) {
  var page = "SignupPage.ejs"
  res.render("Index",  {
    title: "Signup Page", 
    page: page
  });
});

// login page
app.get("/login", function (req, res) {
  var page = "LoginPage.ejs"
  res.render("Index", {
    title: "Login Page", 
    page: page
  });
});

// home page
app.get("/", function (req, res) {
  var page = "HomePage.ejs"
  res.render("Index", {
    title: "Home Page", 
    page: page
  });
});

// team page
app.get("/meet-our-team", function (req, res) {
  var page = "MeetOurTeamPage.ejs";
  res.render("Index", {
    title: "Our Team Page", 
    page: page
  });
});

// team member page
app.get("/team-member/profile", function (req, res) {
  var page = "TeamMemberProfilePage.ejs";
  res.render("Index", {
    title: "Team Member Profile",
    page: page
  });
});

// book appointments page
app.get("/bookings", function (req, res) {
  var page = "BookingsPage.ejs"
  res.render("Index", {
    title: "Bookings Page", 
    page: page
  });
});

// admin homepage
app.get("/admin", function(req, res) {
  var page = "./AdminHomePage.html"
  res.render("Admin/AdminPage", {
    page: page,
    title: "Admin Page"
  });
});

// admin profile page
app.get("/admin/profile", function (req, res) {
  var page = "./AdminProfilePage.ejs";
  res.render("Admin/AdminPage", {
    title: "Profile Page",
    page: page
  })
})

// admin messages
app.get("/admin/messages", function(req, res) {
  var page = "./AdminMessagePage.ejs";
  res.render("Admin/AdminPage", {
    title: "Message Page",
    page: page
  })
});

// admin chats
app.get("/admin/chats", function(req, res) {
  // change to post req later
});

// admin chatroom
app.get("/admin/chatroom/:chatroomId", function(req, res) {
  var id = req.params.chatroomId;
  // change to post req later
});



// book appointments page
app.get("/admin/bookings", function (req, res) {
  // send information to database and alert
});

// notifications page
app.get("/admin/notifications", function (req, res) {
  res.render("NotificationsPage");
});

// schedules making page
app.get("/admin/scheduler", function (req, res) {
  var page = "./AppointmentSchedulerPage.ejs"
	res.render("Admin/AdminPage", {
    title: "Scheduler Page", 
    page: page
  });
});


// error page
app.get("/*", function (req, res) {
  res.render("Error404Page");
});

// logout page
app.get("/logout", function (req, res) {
	// destroy current session with user id
});


// Facebook Auth
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

const Server = require("http").createServer(app);
const io = require("socket.io")(Server);

io.on("connection", function (socket) {

  //  when a client connects
  console.log("A client has connected");
  
  // when client disconnects
  socket.on("disconnect", function () {
    console.log("A client has left");
  });

});

const port = process.env.PORT;
Server.listen(port, function () {
  console.log("Server is listening to port " + port);
});