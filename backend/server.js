import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Connection } from "./DbConnect.js";
import authRoutes from "./Routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';
import messageRoutes from "./Routes/messageRoutes.js";
//import { app, server } from "./socket/socket.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, ()=>{
    Connection();
    console.log(`Server Listening to Port ${PORT}`);
})