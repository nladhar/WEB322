/********************************************************************************

* WEB322 – Assignment 03

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: _Nehmat Ladhar___________________ Student ID: __137500229____________ Date: __19-03-2024____________

*

* Published URL: ____https://confused-bikini-boa.cyclic.app/_______________________________________________________

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
