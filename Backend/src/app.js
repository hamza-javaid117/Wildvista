import express from "express"


const app = express()

app.get("/", (req,res) => {
    res.send("Hello World")
})

import { errorHandler } from "./middleware/Error.middleware"


export default app