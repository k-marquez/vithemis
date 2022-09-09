const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

let corsOptions =
{
    origin: "http://localhost:8080",
};

dotenv.config({path: '.env-local'});

const port = process.env.PORT;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/',(req, res) => {
  res.status(200).send("It's okey!");
})

//Rute tasks
const taskRouter = require("./app/routes/tasks");

app.use('/tasks',taskRouter);
