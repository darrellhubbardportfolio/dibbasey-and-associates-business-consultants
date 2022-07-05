var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database(":memory", function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Successfully opened and connected to database!");
});

module.exports = {
    db: db
}