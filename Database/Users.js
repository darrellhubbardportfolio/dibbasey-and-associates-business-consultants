
require("./sqlite3");

// build an array as a model for users so that passport js can read all of them.
var Users = [];

module.exports = {
    Users: Users
}

// create schemas
var create_new_user = `
    INSERT INTO Users (username, password, join_date, last_login_activity) VALUES (?, ?, ?, ?);
`;

var find_user = ``;

var view_all_users = ``;

var update_user = ``;

var delete_user = ``;

// create a user
function create_user () {

}

// read a user
function view_user () {

}

// read all users 
function view_users () {

}

// drop a user
function drop_user () {

}

// update a user
function update_user () {

}