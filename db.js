const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
});

db.connect(function(err){
    if(err){
        console.error('Error database connection: ' + err.stack)
        return;
    }
    console.log('Database connection completed success!');
});

module.exports = db;