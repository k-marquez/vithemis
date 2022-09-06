const express = require('express');
const taks_query = require("../controllers/task.controller.js");
const router = express.Router();

// GET 
router.get('/', taks_query.get_task);
// GET 
router.get('/completed', taks_query.get_completed_tasks);
// POST
router.post('/', taks_query.insert_task);
// GET 
router.get('/:id', taks_query.get_by_id);
// PUT
router.put('/:id', taks_query.update_task);
// DELETE
router.delete('/:id', taks_query.delete_task);

module.exports = router;
