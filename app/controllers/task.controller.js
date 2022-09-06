const pool = require('../config/db');

function formatedRes(unformatedRes)
{
  return {"affectedRows": unformatedRes.affectedRows,
          "insertId": parseInt(unformatedRes.insertId),
          "warningStatus": unformatedRes.warningStatus};
}

exports.get_task = async function(req, res) 
{
  try
  {
    const responseBD = await pool.query("SELECT * FROM tasks");
    res.status(200).json(responseBD);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.get_by_id = async function(req, res)
{
  const id = req.params.id;
  try
  {
    const responseBD = await pool.query("SELECT * FROM tasks WHERE id=?", id);
    res.status(200).json(responseBD);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.insert_task = async function(req, res)
{
  const {des,comp} = req.body;
  try
  {
    const responseBD = await pool.query("INSERT INTO tasks (description,completed) VALUES (?,?)", [des,comp]);                         
    res.status(201).json(formatedRes(responseBD));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.update_task = async function(req, res)
{
  const {des,comp} = req.body, id = req.params.id;
  try
  {
    const responseBD = await pool.query("UPDATE tasks SET description = ?, completed = ? WHERE id = ?",[des, comp, id]);
    res.status(200).send(formatedRes(responseBD));
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.delete_task = async function(req, res)
{
  const id = req.params.id;
  try
  {
    const responseBD = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.status(200).json(formatedRes(responseBD));
  } catch (err) {
    res.status(404).send(err.message);
  } 
};

exports.get_completed_tasks = async function(req, res)
{
  try
  {
    const responseBD = await pool.query("SELECT id, description FROM tasks WHERE completed = true");
    res.status(200).json(responseBD);
  } catch (err) {
    res.status(404).send(err.message);
  } 
};
