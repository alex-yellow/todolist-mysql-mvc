const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const cookieparser = require('cookie-parser');
const expsession = require('express-session');
const flash = require('connect-flash');
const TaskController = require('./controllers/taskController');

const app = express();
const PORT = 3000;
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const secret = 'qwerty';
app.use(cookieparser(secret));
app.use(expsession({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000
  }
}));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist'
});

app.use(flash());

app.get('/', TaskController.getAllTasks);
app.get('/tasks/:id', TaskController.toggleTaskCompleted);
app.get('/add', TaskController.showAddTaskForm);
app.post('/add', TaskController.addTask);
app.get('/edit/:id', TaskController.showEditTaskForm);
app.post('/edit/:id', TaskController.editTask);
app.post('/delete', TaskController.deleteTask);


app.listen(PORT, function () {
  console.log('server is running on port', PORT);
});