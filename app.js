const express = require('express');
const mysql = require("mysql2")

const app = express()

const connection = mysql.createConnection({
    host: "mysql1",
    user: "root",
    password: "secret",
    database: "testdb"
})

connection.connect()

connection.query(`CREATE TABLE IF NOT EXISTS daten (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logEintrag VARCHAR(255)
)`)


app.get("/add", (req,res) => {
    connection.query(`INSERT INTO daten (logEintrag) VALUES ("Eintrag am ${new Date()}")` )
    res.send("Neuer Eintrag in die Datenbank erfolgreich gespeichert nach der app.js änderung!!!!")
})

app.get("/all",(req,res) => {
    connection.query("SELECT * FROM daten", (err,results) => {
    if (err){
        return res.status(500).send("Ich bin ein neuer Fehler")
    }
    res.json(results)
    })
})

app.listen(5012)