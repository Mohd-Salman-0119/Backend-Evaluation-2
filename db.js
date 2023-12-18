const mongoose = require("mongoose");

const {taskSchema} = require("./models/taskmodel.models")

require("dotenv").config()


const Tastmodel = mongoose.model("task", taskSchema)

const connection = mongoose.connect(`${process.env.MongoDB}/management`)


module.exports = { connection, Tastmodel }
