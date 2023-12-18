const express = require("express");
const { rateLimit } = require("express-rate-limit")
const { connection, Tastmodel } = require("./db")
const { taskRoutes } = require('./routes/task.routes')

const app = express();

const apiLimit = rateLimit({
     windowMs: 30 * 60 * 1000,
     limit: 15,
     standardHeaders: 'draft-7',
     legacyHeaders: false
})

const customValidation = (req, res, next) => {
     const { title,
          description,
          status } = req.body;

     if (req.method === "POST" && ((!title || !description || !status))) {
          res.send({ error: "All feild required!" })
     } else {
          next();
     }

}

app.use(apiLimit)
app.use(express.json())
app.use(customValidation)


app.use("/task", taskRoutes)



app.listen(8000, async () => {
     try {
          await connection;
          console.log("Successfully connected MongoDB")
     } catch (error) {
          console.log("Error connecting MongoDB");
          console.log(error)
     }
     console.log("Server is runing on PORT 8000")
})