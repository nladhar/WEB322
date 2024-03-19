/*********************************************************************************
*  WEB322 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nehmat Ladhar Student ID: 137500229 Date: 18-02-2024
*
********************************************************************************/
const legoData = require("./modules/legoSets");
legoData.initialize();
const express = require("express");
const app = express();
const HTTP_PORT =  8080;

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
  });

app.get('/about', (req, res) => {
    res.sendFile(__dirname +'/views/about.html');
  });

app.get("/lego/sets", async (req, res) => {
    let set = await legoData.getAllSets();
    res.send(set);
})

app.get("/lego/sets", async (req, res) => {
    try {
      if (req.query.theme) {
        let sets = await legoData.getSetsByTheme(req.query.theme);
        res.send(sets);
      } else {
        let sets = await legoData.getAllSets();
        res.send(sets);
      }
    } catch (err) {
      res.status(404).send(err);
    }
  });

app.get("/lego/sets/:num", async (req, res) => {
  try {
    let set = await legoData.getSetByNum(req.params.num);
    res.send(set);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Server is listening http://localhost:${HTTP_PORT}`);
  });
