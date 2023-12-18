const { Router } = require("express")
const { Tastmodel } = require("../db")
const crypto = require("crypto");

const taskRoutes = Router();

const TASK_PER_PAGE = 5;

taskRoutes.get("/", async (req, res) => {
     const { page_no } = req.query
     
     // pagination
     const page = (Number(page_no) - 1) * TASK_PER_PAGE;


     try {
          const task = await Tastmodel.find().skip(page).limit(TASK_PER_PAGE);
          res.send({ tasks: task })
     } catch (error) {
          res.send({ error: "something went wrong. plz try again leter" });
     }
})
taskRoutes.post("/add", async (req, res) => {
     const task = req.body;

     try {
          await Tastmodel.create({ ...task, uuid: crypto.randomUUID() });
          res.send({ success: "Task added successfully" });
     } catch (error) {
          res.send({ error: "something went wrong. plz try again leter" });
     }
})
taskRoutes.put("/:ID", async (req, res) => {
     const taskId = req.params.ID;
     const task = req.body;

     try {
          await Tastmodel.findByIdAndUpdate(taskId, task);
          res.send({ success: "Task updated successfully" });
     } catch (error) {
          res.send({ error: "something went wrong. plz try again leter" });
     }
})
taskRoutes.delete("/:ID", async (req, res) => {
     const taskId = req.params.ID;
     try {
          await Tastmodel.findByIdAndDelete(taskId);
          res.send({ success: "Task deleted successfully" });
     } catch (error) {
          res.send({ error: "something went wrong. plz try again leter" });
     }
})

module.exports = { taskRoutes }
