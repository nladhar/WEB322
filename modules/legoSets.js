/*********************************************************************************
*  WEB322 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nehmat Ladhar  Student ID: 137500229 Date: 12-04-24
*
********************************************************************************/

const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nladhar:o4l1rl4DPpnjCYR6@cluster0.1dgppz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const themeSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const setSchema = new mongoose.Schema({
  set_num: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  year: String,
  num_parts: String,
  theme_id: String,
  img_url: String,
});

const Theme = mongoose.model("Theme", themeSchema);
const Set = mongoose.model("Set", setSchema);

module.exports = {
  Theme,
  Set,
};

async function initialize() {
  try {
    // Check if there are any themes in the database
    const themesCount = await Theme.countDocuments();
    if (themesCount === 0) {
      // Populate themes from themeData if database is empty
      await Theme.insertMany(themeData);
      console.log("Themes initialized in database.");
    }

    // Check if there are any sets in the database
    const setsCount = await Set.countDocuments();
    if (setsCount === 0) {
      // Populate sets from setData if database is empty
      await Set.insertMany(setData);
      console.log("Sets initialized in database.");
    }

    console.log("Database initialization complete.");
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
}

async function getAllSets() {
  try {
    const sets = await Set.find().populate("theme_id");
    return sets;
  } catch (err) {
    console.error("Error getting all sets:", err);
    throw err;
  }
}

async function getAllThemes() {
  try {
    const themes = await Theme.find();
    return themes;
  } catch (err) {
    console.error("Error getting all themes:", err);
    throw err;
  }
}

async function getSetByNum(setNum) {
  try {
    const foundSet = await Set.findOne({ set_num: setNum }).populate(
      "theme_id"
    );
    if (!foundSet) {
      throw new Error("Set not found");
    }
    return foundSet;
  } catch (err) {
    console.error("Error getting set by set number:", err);
    throw err;
  }
}

async function getSetsByTheme(theme) {
  try {
    // Find theme based on the theme name
    const foundTheme = await Theme.findOne({
      name: {
        $regex: new RegExp(theme, "i"),
      },
    });

    if (!foundTheme) {
      return [];
    }
    // Find sets based on the found theme id and populate the theme details
    const foundSets = await Set.find({ theme_id: foundTheme.id }).populate(
      "theme_id"
    );
    return foundSets;
  } catch (err) {
    console.error("Error getting sets by theme:", err);
    throw err;
  }
}

async function addSet(setData) {
  try {
    const newSet = await Set.create(setData);
    return newSet;
  } catch (err) {
    console.error("Error adding set:", err);
    throw err;
  }
}

async function editSet(setNum, setData) {
  try {
    const updatedSet = await Set.findOneAndUpdate(
      { set_num: setNum },
      setData,
      { new: true }
    );
    if (!updatedSet) {
      throw new Error("Set not found");
    }
    return updatedSet;
  } catch (err) {
    console.error("Error editing set:", err);
    throw err;
  }
}

async function deleteSet(setNum) {
  try {
    const deletedSet = await Set.findOneAndDelete({ set_num: setNum });
    if (!deletedSet) {
      throw new Error("Set not found");
    }
    return deletedSet;
  } catch (err) {
    console.error("Error deleting set:", err);
    throw err;
  }
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
  getAllThemes,
  addSet,
  editSet,
  deleteSet,
};