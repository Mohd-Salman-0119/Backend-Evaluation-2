const taskSchema = {
     uuid: { type: String },
     title: { type: String, required: true },
     description: { type: String, required: true },
     status: { type: String, required: true }
}

module.exports = { taskSchema }