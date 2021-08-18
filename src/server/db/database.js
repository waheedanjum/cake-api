var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE cakes (
            id INTEGER PRIMARY KEY,
            name text not null check(length(name) <= 30), 
            comment text not null check(length(name) <= 200), 
            url text not null,
            yumfactor integer not null  
            )`,
        (err) => {
            if (err) {
               console.log("Found Table Cakes")
            }
        });  
    }
});


module.exports = db