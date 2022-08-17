const express = require('express')
const dotenv = require('dotenv');

dotenv.config({path: '.env-local'});

const port = process.env.PORT || 3001
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/',(req, res) => {
  res.status(200).send("It's okey!");
})

//Rute tasks
const taskRouter = require("./routes/tasks");

app.use('/tasks',taskRouter)

