const express = require('express');
const pool = require('../helpers/db');
const router = express.Router();

// GET 
router.get('/', async function(req, res) {
    try {
        const rows = await pool.query("SELECT * FROM tasks");
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// GET 
router.get('/:id', async function(req, res) {
    try {
        const rows = await pool.query("SELECT * FROM tasks WHERE id=?", req.params.id);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// POST
router.post('/register', async (req, res) => {
    const {description,completed} = req.body;
    try {
        const result = await pool.query("INSERT INTO tasks (description,completed) VALUES (?,?)", [description,completed]);
        console.log(result);
        res.status(200).json({"task_id": result.insertId});
    } catch (err) {
        res.status(400).send(err.message);
    }
});
 /*
router.put('/', async (req, res) => {
    let task = req.body;
    try {
        const result = await pool.query("update tasks set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err.message);
    } 
});
 
router.delete('/', async (req, res) => {
    let id = req.query.id;
    try {
        const result = await pool.query("delete from tasks where id = ?", [id]);
        res.send(result);
    } catch (err) {
        res.status(400).send(err.message);
    } 
});
*/
module.exports = router;
