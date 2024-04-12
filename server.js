/********************************************************************************

* WEB322 – Assignment 05

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: _Nehmat Ladhar___________________ Student ID: __137500229____________ Date: __31-03-2024____________


*
* Published URL: ____https://confused-bikini-boa.cyclic.app/_______________________________________________________

*

********************************************************************************/
const express = require('express');
const path = require('path');
const legoData = require("./modules/legoSets"); 
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/about', (req, res) => {
    res.render("about");
});
  
  app.get('/lego/addSet', async (req, res) => {
    let themes = await legoData.getAllThemes();
    res.render('addSet', { themes: themes });
  });

  app.post('/lego/addSet', async (req, res) => {
    try {
      await legoData.addSet(req.body);
      res.redirect("/lego/sets");
    } catch (err) {
      const errorMessage = err.message || 'An unknown error occurred.';
      res.render('500', { message: `I'm sorry, but we have encountered the following error: ${errorMessage}` });
    }
  });

  app.get('/lego/editSet/:num', async (req, res) => {
  
    try {
      let set = await legoData.getSetByNum(req.params.num);
      let themes = await legoData.getAllThemes();
  
      res.render("editSet", { set, themes });
    } catch (err) {
      res.status(404).render("404", { message: err });
    }
  });

  app.post("/lego/editSet", async (req, res) => {
  
    try {
      await legoData.editSet(req.body.set_num, req.body);
      res.redirect("/lego/sets");
    } catch (err) {
      res.render("500", { message: `I'am sorry, but we have encountered the following error ${err}` });
    }
  });

  app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
  
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then((data) => {
                res.render('sets', { sets: data });
            })
            .catch((err) => {
                res.status(404).send(`404 - Sets Not Found: ${err}`); 
            });
    } else {
        legoData.getAllSets()
            .then((data) => {
                res.render('sets', { sets: data });
            })
            .catch((err) => {
                res.status(404).send(`404 - Sets Not Found: ${err}`);
            });
    }
  });
    
    
  app.get('/lego/sets/:id', (req, res) => {
    const setNum = req.params.id;
  
    legoData.getSetByNum(setNum)
        .then((data) => {
            res.render('set', { set: data });
        })
        .catch((err) => {
            res.status(404).send(`404 - Set Not Found: ${err}`); 
        });
  });

  app.use((req, res) => {
    res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
  });

  legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
  }).catch((err) => {
    console.log(err);
  });