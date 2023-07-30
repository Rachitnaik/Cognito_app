const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
// create mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb",
});

// connect to mysql
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql database");
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// POST /user
app.post("/user", (req, res) => {
  const { email, givenName, familyName } = req.body;

  // insert user into mysql database
  const sql = `INSERT INTO user (Email_id, Given_name, Family_name) VALUES (?, ?, ?)`;
  connection.query(sql, [email, givenName, familyName], (err, result) => {
    if (err) throw err;
    console.log("User inserted into mysql database");

    // send success response
    res.status(200).json({ message: "User created successfully" });
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const mysql = require("mysql2");
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "mydb",
//   port: 3306,
// });

// connection.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("A");
// });

// app.post("/user", (req, res) => {
//   const { Email_id, Given_name, Family_name } = req.body;
//   console.log(req.body);

//   const sql =
//     "INSERT INTO user (Email_id, Given_name, Family_name) VALUES (?, ?, ?)";
//   const values = [Email_id, Given_name, Family_name];

//   connection.query(sql, values, (error, result) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     } else {
//       const user = {
//         id: result.insertId,
//         email_id: Email_id,
//         given_name: Given_name,
//         family_name: Family_name,
//       };
//       res.status(201).json({ message: "User created successfully", user });
//     }
//   });
// });

// connection.connect((error) => {
//   if (error) {
//     console.error(error);
//     throw error;
//   } else {
//     console.log("Connected to MySQL database");
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log("CAP");
// });
