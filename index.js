const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
require('dotenv').config();


const PORT = 3006;
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306
})

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send(`WORKING API... ${process.env.PORT || PORT}`)
})
app.get("/blog/get", (req, res) => {

    const sqlSelectAllBlogs = "SELECT * FROM blog ";
    db.query(sqlSelectAllBlogs, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
        
    })
})

app.get("/tournament/get", (req, res) => {

    const sqlSelectAllTournaments = "SELECT * FROM tournament";
    db.query(sqlSelectAllTournaments, (err, result) => {
        res.send(result);
    })
})

app.get("/findplayer/get", (req, res) => {
    const sqlSelectAllFindPlayerForms = "SELECT * FROM findplayer";
    db.query(sqlSelectAllFindPlayerForms, (err, result) => {
        res.send(result);
    })
})

app.delete("/blog/delete/:blogID", (req, res) =>{
    
    const blogID = req.params.blogID;
    const sqlDeleteBlog = "DELETE FROM blog WHERE id = ?"

    db.query(sqlDeleteBlog, blogID, (err,result)=>{
        if(err){
            console.log(err);
        } else {
            console.log("DELETE IS SUCCESSFUL");
            res.send("Successful deletion");
        }
    });
})

app.delete("/tournament/delete/:tournamentID", (req, res) =>{
    
    const tournamentID = req.params.tournamentID;
    const sqlDeleteTournament = "DELETE FROM tournament WHERE id = ?"

    db.query(sqlDeleteTournament, tournamentID, (err,result)=>{
        if(err){
            console.log(err);
        } else {
            console.log("DELETE IS SUCCESSFUL");
            res.send("Successful deletion");
        }
    });
})

app.delete("/findplayer/delete/:findPlayerID", (req, res) =>{

    const findPlayerID = req.params.findPlayerID;
    const sqlDeleteFindPlayer = "DELETE FROM findplayer WHERE id = ?"
    db.query(sqlDeleteFindPlayer, findPlayerID, (err,result)=>{
        if(err){
            console.log(err);
        } else {
            console.log("DELETE IS SUCCESSFUL");
            res.send("Successful deletion");
        }
    });
})

app.post("/blog/insert", (req, res) => {
    
    const blogTitle = req.body.blogTitle;
    const blogText = req.body.blogText;
    const user_id = req.body.user_id;
    const sqlInsert = "INSERT INTO `blog` (`blog_title`, `blog_text`, `user_id`) VALUES (?,?,?)";
    db.query(sqlInsert, [blogTitle, blogText, user_id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("INSERT is SUCCESSFUL");
            res.send("INSERT is SUCCESSFUL")
        }
    }) 
})

app.post("/tournament/insert", (req, res) =>{

    const tournamentTitle = req.body.tournamentTitle;
    const tournamentText = req.body.tournamentText;
    const user_id = req.body.user_id;

    const sqlInsert = "INSERT INTO `tournament` (`tournament_title`, `tournament_text`, `user_id`) VALUES (?,?,?)";
    db.query(sqlInsert, [tournamentTitle, tournamentText, user_id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("INSERT is SUCCESSFUL");
            res.send("INSERT is SUCCESSFUL")
        }
    })
})

app.post("/findplayer/insert", (req, res) =>{

    const playerName = req.body.playerName;
    const playerAge = req.body.playerAge;
    const playerGender = req.body.playerGender;
    const playerNTRP = req.body.playerNTRP;
    const playerCity = req.body.playerCity;
    const playerTime = req.body.playerTime;
    const playerDescription = req.body.playerDescription;
    const playerContactInfo = req.body.playerContactInfo;
    const playerUser_id = req.body.playerUser_id;

    const sqlInsert = "INSERT INTO `findplayer` (`name`, `age`, `gender`, `NTRP`, `city`, `time`, `description`, `contact_info`, `user_id`) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [playerName, playerAge, playerGender, playerNTRP, playerCity, playerTime, playerDescription, playerContactInfo, playerUser_id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("INSERT is SUCCESSFUL");
            res.send("INSERT is SUCCESSFUL")
        }
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Running on port ${process.env.PORT || PORT}`);
})