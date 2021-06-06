const mysql = require('mysql2');
const express = require('express');
const { result } = require('lodash');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password123',
        database: 'election'
    },
    console.log(`Now connected to the Employee database!`)
);

// select all from employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

// Select roles data
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, rows) => {
        if (err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.statusMessage(400).json({ error: res.message });
            return;
        }else if(!result.affectedRows){
            res.json({
                message: 'Employee not found!'
            });
        }else{
            res.json({
                message: 'Deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
        
    });
});

// Create employee, must use array since placeholders must match values of params
// uses req.body for data
app.post('/api/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employee (first_name, last_name, job_role, manager_id)
    VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.job_role, body.manager_id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Employee Created!',
            data: body
        });
    });
});
// Create Job Role
app.post('/api/roles', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO job_role (title, salary, department_id)
    VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Role Created!',
            data: body
        });
    });
});
// Create department
app.post('/api/departments', ({ body }, res) => {
    const errors = inputCheck(body, 'department_name');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Department Created!',
            data: body
        });
    });
});

// Default error 404 response for undefined route
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Now connected to The Matrix via ${PORT}`);
});