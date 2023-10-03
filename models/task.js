const db = require('../db');


class Task {
    static getAll(callback) {
      let sql = 'SELECT * FROM tasks';
      db.query(sql, function (error, tasks, fields) {
        if (error) throw error;
        callback(tasks);
      });
    }
  
    static getById(id, callback) {
      let sql = 'SELECT * FROM tasks WHERE id = ?';
      db.query(sql, [id], function (error, tasks, fields) {
        if (error) throw error;
        callback(tasks[0]);
      });
    }
  
    static add(task, callback) {
      let sql = 'INSERT INTO tasks SET ?';
      db.query(sql, task, function (error, result) {
        if (error) throw error;
        callback(result);
      });
    }
  
    static update(id, title, callback) {
      let sql = 'UPDATE tasks SET title = ? WHERE id = ?';
      db.query(sql, [title, id], function (error, result) {
        if (error) throw error;
        callback(result);
      });
    }

    static updateComplete(id, completed, callback) {
        let sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
        db.query(sql, [completed, id], function (error, result) {
          if (error) throw error;
          callback(result);
        });
      }
  
    static delete(id, callback) {
      let selectSql = 'SELECT * FROM tasks WHERE id = ?';
      db.query(selectSql, [id], function (error, tasks, fields) {
        if (error) throw error;
  
        let deleteSql = 'DELETE FROM tasks WHERE id = ?';
        db.query(deleteSql, [id], function (error, result) {
          if (error) throw error;
          callback(tasks[0]);
        });
      });
    }
  }
  
  module.exports = Task;