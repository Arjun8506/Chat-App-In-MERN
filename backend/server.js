import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authroutes from "./routes/auth.routes.js"
import connectToDatabase from "./db/connectToDb.js"
import messageroutes from "./routes/messages.route.js"
import userroutes from "./routes/user.routes.js"
import { app, server } from "./socket/socket.js"


dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);
app.use("/api/users", userroutes);


app.get("/", function(req, res){
    res.send("main page")
})

server.listen(PORT, () => {
    connectToDatabase()
    console.log(`server is running on port ${PORT}`)
})