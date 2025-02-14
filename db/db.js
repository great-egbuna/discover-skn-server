require("dotenv").config();

const knex = require("knex");

const knexFile = require("../knexfile.js");

const env = process.env.NODE_ENV || "development";

module.exports = knex(knexFile["production"]);
