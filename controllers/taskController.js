const Task = require('../models/task');

class TaskController {
    static getAllTasks(req, res) {
        Task.getAll((tasks) => {
            res.render('index', { title: 'Tasks', tasks });
        });
    }

    static toggleTaskCompleted(req, res) {
        const id = req.params.id;

        Task.getById(id, (task) => {
            if (!task) {
                res.status(404).send('Task not found');
                return;
            }

            const newCompletedValue = !task.completed;

            Task.updateComplete(id, newCompletedValue, (result) => {
                res.redirect('/');
            });
        });
    }

    static showAddTaskForm(req, res) {
        res.render('add');
    }

    static addTask(req, res) {
        const task = req.body;
        if (task) {
            Task.add(task, (result) => {
                res.redirect('/');
            });
        } else {
            req.flash('error', 'User not add!');
            res.redirect('/');
        }
    }

    static showEditTaskForm(req, res) {
        const id = req.params.id;
        Task.getById(id, (task) => {
            if (!task) {
                res.status(404).send('Task not found');
                return;
            }

            res.render('edit', { task, title: 'Edit' });
        });
    }

    static editTask(req, res) {
        const id = req.params.id;
        const task = req.body;

        Task.update(id, task.title, (result) => {
            res.redirect('/');
        });
    }

    static deleteTask(req, res) {
        const id = req.body.id;
        Task.delete(id, (task) => {
            res.redirect('/');
        });
    }
}

module.exports = TaskController;