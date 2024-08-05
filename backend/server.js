const express = require("express");
const mysql = require("mysql2");

var cors = require("cors");
const { SuiteContext } = require("node:test");

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

//I need to connect my server to my sql database on my local machine
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "celezene",
});

//Write a init function to connect to the database using my configuration above
connection.connect((err) => {
  if (err) {
    console.error("Error in connecting to database".err.message);
    return;
  } else {
    console.log("Connection established to the database successfully");
  }
});

//Write an API to get all the employees in my employees table

app.get("/api/employees", (req, res) => {
  connection.query("SELECT * FROM employees;", (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log("server running " + port);
});
